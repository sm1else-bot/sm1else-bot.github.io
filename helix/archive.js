'use strict';

const folder = document.querySelector('#folder');
const status = document.querySelector('#status');
const control = document.querySelector('#case-control');
const selector = document.querySelector('#case-select');
const view = document.querySelector('#case-view');
const cases = new Map();
let generation = 0;
let media = [];

const stages = [
  ['Intake and discovery', /(?:intake|discovery|stage1|selected-record|verification)/],
  ['Building investigation and CoStar records', /(?:stage2|investigation|costar|matterport|vexcel)/],
  ['Business screening', /stage3/],
  ['Opportunity report', /(?:opportunity|report-generation)/],
  ['Business selection and Finance Lab', /(?:stage4|finance)/],
  ['Investment memorandum', /memorandum/],
];
const supported = /\.(json|jsonl|md|txt|png|jpe?g|webp)$/i;
const picture = /\.(png|jpe?g|webp)$/i;
const title = (name, label) => Object.assign(document.createElement(name), {textContent: label});
const dollars = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0});

function release() {
  for (const url of media) URL.revokeObjectURL(url);
  media = [];
  view.replaceChildren();
}
function section(parent, label) {
  const group = document.createElement('details');
  group.append(title('summary', label));
  parent.append(group);
  return group;
}
function record(group, path, file) {
  const details = section(group, path);
  details.addEventListener('toggle', async () => {
    if (!details.open || details.querySelector('pre')) return;
    const pre = title('pre', 'Reading local file…');
    details.append(pre);
    try {
      const raw = await file.text();
      try { pre.textContent = JSON.stringify(JSON.parse(raw), null, 2); }
      catch { pre.textContent = raw; }
    } catch { pre.textContent = 'This local file could not be read.'; }
  });
}
function addImage(gallery, path, label, file) {
  const figure = document.createElement('figure');
  const url = file.url || URL.createObjectURL(file);
  if (!file.url) media.push(url);
  const image = document.createElement('img');
  image.src = url;
  image.alt = label || path;
  image.loading = 'lazy';
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.append(image);
  figure.append(link, title('figcaption', label || path));
  gallery.append(figure);
}
async function read(files, name) {
  try {
    const data = JSON.parse(await files.get(name).text());
    return data.data ?? data;
  } catch { return null; }
}
function addSynopsis(container, manifest, screening, selection, finance, memo) {
  const parts = [];
  if (screening?.summary) {
    parts.push(`${screening.summary.businesses} uses evaluated · ${screening.summary.pass_all_hard_gates} passed all hard gates`);
    if (screening.summary.shortlist?.length) parts.push(screening.summary.shortlist.join(' · '));
  }
  if (selection?.label) parts.push('Selected use: ' + selection.label);
  if (finance?.capital) {
    parts.push('Saved base cash to open: ' + dollars.format(finance.capital.cash_to_open));
  }
  if (memo?.verdict?.headline) parts.push(memo.verdict.headline);
  for (const part of parts) container.append(title('p', part));
  if (!memo) container.append(title('p', 'This capture ends before the investment memorandum.'));
  const facts = document.createElement('dl');
  for (const [stage, state] of Object.entries(manifest.stages || {})) {
    facts.append(title('dt', stage.replaceAll('_', ' ')), title('dd', state));
  }
  if (facts.children.length) container.append(facts);
}
function memorandum(container, memo) {
  if (!memo?.verdict) return;
  const report = section(container, 'Read the saved memorandum');
  report.append(title('h4', memo.verdict.headline));
  for (const reason of memo.verdict.reasons || []) report.append(title('p', reason));
  for (const [heading, claims] of Object.entries(memo.analysis?.sections || {})) {
    if (!Array.isArray(claims) || !claims.length) continue;
    const subsection = section(report, heading.replaceAll('_', ' '));
    for (const claim of claims) {
      subsection.append(title('p', claim.text));
      const refs = (claim.evidence_ids || []).join(', ');
      subsection.append(title('small', [claim.kind?.replaceAll('_', ' '), refs].filter(Boolean).join(' · ')));
    }
  }
  if (memo.next_steps?.length) {
    const checks = section(report, 'Due diligence checks');
    for (const check of memo.next_steps) {
      checks.append(title('p', check.question), title('small', check.source));
    }
  }
}
async function showCase() {
  const current = ++generation;
  release();
  const entry = cases.get(selector.value);
  if (!entry) return;
  const {manifest, files} = entry;
  const [screening, selection, finance, memo, investigation] = await Promise.all([
    read(files,'live-stage3.json'), read(files,'live-stage4-selection.json'),
    read(files,'live-finance.json'), read(files,'live-memorandum.json'),
    read(files,'live-stage2-final.json'),
  ]);
  if (current !== generation) return;
  view.append(title('h3', manifest.address || selector.value), title('p', manifest.city || ''));
  addSynopsis(view, manifest, screening, selection, finance, memo);
  memorandum(view, memo);

  const imageFiles = [...files].filter(([path]) => picture.test(path));
  if (imageFiles.length) {
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
    const views = investigation?.handoff?.dossier?.source_status?.vexcel?.imagery?.views || [];
    const visual = section(view, 'Aerial and spatial evidence');
    visual.open = true;
    if (imageFiles.some(([path]) => path.includes('existing-matterport-sample/'))) {
      visual.append(title('p', 'Matterport faces show one saved camera position. Open an image to inspect it at full size.'));
    }
    for (const [path, file] of imageFiles) {
      const basename = path.split('/').at(-1);
      const match = views.find(item => item.asset_id === basename);
      const label = path.startsWith('live-vexcel-assets/') && match
        ? [match.view, match.collection, match.capture_date].filter(Boolean).join(' · ')
        : path.startsWith('existing-matterport-sample/') ? 'Matterport · ' + basename : path;
      addImage(gallery, path, label, file);
    }
    visual.append(gallery);
  }
  const groups = new Map();
  for (const [path, file] of [...files].sort(([a], [b]) => a.localeCompare(b))) {
    if (picture.test(path)) continue;
    const label = stages.find(([,pattern]) => pattern.test(path))?.[0] || 'Manifest and additional saved records';
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push([path,file]);
  }
  for (const label of [...stages.map(([name]) => name), 'Manifest and additional saved records']) {
    if (!groups.has(label)) continue;
    const group = section(view, label);
    for (const [path, file] of groups.get(label)) record(group, path, file);
  }
}
folder.addEventListener('change', async () => {
  const current = ++generation;
  release();
  cases.clear();
  control.hidden = true;
  selector.replaceChildren();
  const directories = new Map();
  for (const file of folder.files) {
    const parts = file.webkitRelativePath.split('/');
    const base = parts[0] === '.offline-archive' && parts[1] === 'scenarios' ? 2
      : parts[0] === 'scenarios' ? 1 : -1;
    if (base < 0 || parts.length < base + 2) continue;
    const path = parts.slice(base + 1).join('/');
    if (parts.slice(base + 1).some(part => part.startsWith('.')) || !supported.test(path)) continue;
    const id = parts[base];
    if (!directories.has(id)) directories.set(id, new Map());
    directories.get(id).set(path, file);
  }
  for (const [id, files] of directories) {
    const manifest = await read(files, 'manifest.json');
    if (current !== generation) return;
    if (manifest?.scenario !== id) continue;
    cases.set(id, {manifest, files});
  }
  const ids = [...cases.keys()].sort((a,b) => a === 'la-south-broadway' ? -1
    : b === 'la-south-broadway' ? 1 : a.localeCompare(b));
  for (const id of ids) selector.add(new Option(cases.get(id).manifest.address || id, id));
  status.textContent = ids.length ? `${ids.length} saved investigations loaded from this device.`
    : 'No case manifests found. Select the scenarios folder inside the private archive.';
  control.hidden = !ids.length;
  if (ids.length) await showCase();
});
selector.addEventListener('change', showCase);

if (['127.0.0.1', 'localhost', '[::1]'].includes(location.hostname)) {
  const screenshots = document.querySelector('#local-screenshots');
  const images = [...screenshots.querySelectorAll('img[data-src]')];
  Promise.all(images.map(image => new Promise(resolve => {
    image.onload = () => resolve(true);
    image.onerror = () => {
      image.closest('figure').hidden = true;
      resolve(false);
    };
    image.src = image.dataset.src;
  }))).then(results => {
    if (results.some(Boolean)) {
      screenshots.hidden = false;
      document.querySelector('#screenshot-note').hidden = true;
    }
  });
}

async function openBundledArchive() {
  if (!['127.0.0.1', 'localhost', '[::1]'].includes(location.hostname)) return;
  const initial = generation;
  try {
    const response = await fetch('../saved-cases/index.json');
    if (!response.ok) return;
    const entries = await response.json();
    if (initial !== generation || !entries.length) return;
    for (const {id, manifest, paths} of entries) {
      const files = new Map(paths.map(path => {
        const url = '../saved-cases/' + [id, ...path.split('/')].map(encodeURIComponent).join('/');
        return [path, {url, async text() {
          const response = await fetch(url);
          if (!response.ok) throw Error('Saved file unavailable');
          return response.text();
        }}];
      }));
      cases.set(id, {manifest, files});
      selector.add(new Option(manifest.address || id, id));
    }
    folder.hidden = true;
    document.querySelector('#folder-label').hidden = true;
    document.querySelector('#archive-instructions').textContent =
      'Explore the saved investigations, original imagery, and available reports. South Broadway has the complete saved chain through Finance Lab and the investment memorandum.';
    control.hidden = false;
    status.textContent = entries.length + ' saved investigations available.';
    await showCase();
  } catch {
    if (initial === generation) status.textContent = 'The bundled cases could not be opened. Select your archive folder to continue.';
  }
}
openBundledArchive();
