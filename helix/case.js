'use strict';
const steps = {
  space: ['Investigate the selected space', 'Helix fixed the investigation to a 7,205-square-foot advertised space. Exterior evidence, recorded dimensions, and unresolved site questions followed that selection into screening.', 'investigation.png', 'South Broadway · building investigation'],
  uses: ['Screen 26 business uses', 'Auto repair, gym / fitness studio, and martial arts / boxing cleared the saved gates. Each shortlisted use carried conditions to check before committing capital.', 'screening.png', 'South Broadway · feasibility screening'],
  memo: ['Proceed to diligence on auto repair', 'The model estimated $530,432 to open. The decision still called for verifying usable clear height, permitted use, and the certificate of occupancy.', 'screening.png', 'South Broadway · the shortlist behind the decision'],
};
const pick = id => document.getElementById(id);
const local = ['127.0.0.1','localhost','[::1]'].includes(location.hostname);
function showStep(name) {
  const [heading, copy, image, caption] = steps[name];
  const title = document.createElement('h3');
  const paragraph = document.createElement('p');
  title.textContent = heading;
  paragraph.textContent = copy;
  pick('walk-text').replaceChildren(title, paragraph);
  for (const button of document.querySelectorAll('[data-step]')) {
    button.setAttribute('aria-pressed', String(button.dataset.step === name));
  }
  if (local) {
    const url = 'private-screenshots/' + image;
    const probe = new Image();
    probe.onload = () => {
      if (document.querySelector('[data-step][aria-pressed=true]').dataset.step !== name) return;
      pick('walk-link').href = url;
      pick('walk-image').src = url;
      pick('walk-image').alt = caption;
      pick('walk-caption').textContent = caption;
    };
    probe.src = url;
  }
}
for (const button of document.querySelectorAll('[data-step]')) {
  button.addEventListener('click', () => showStep(button.dataset.step));
}
if (local) {
  showStep('space');
  const hero = new Image();
  hero.onload = () => {
    pick('hero-image').removeAttribute('width');
    pick('hero-image').removeAttribute('height');
    pick('hero-image').src = hero.src;
    pick('hero-image').alt = 'Actual Helix screening interface showing the South Broadway investigation';
    pick('hero-link').href = hero.src;
    pick('hero-caption').textContent = 'Actual Helix application · South Broadway business screening';
  };
  hero.src = 'private-screenshots/screening.png';
  const finance = document.querySelector('[data-preview]');
  finance.onload = () => { pick('finance-shot').hidden = false; };
  finance.src = finance.dataset.preview;

  fetch('saved-cases/la-south-broadway/live-stage2-final.json')
    .then(response => response.ok ? response.json() : null)
    .then(record => {
      const views = record?.data?.handoff?.dossier?.source_status?.vexcel?.imagery?.views || [];
      const controls = pick('aerial-controls');
      function select(view, active) {
        const url = 'saved-cases/la-south-broadway/live-vexcel-assets/' + encodeURIComponent(view.asset_id);
        pick('aerial-image').src = url;
        pick('aerial-link').href = url;
        pick('aerial-caption').textContent = ['Vexcel', view.view, view.capture_date].filter(Boolean).join(' · ');
        for (const button of controls.children) button.setAttribute('aria-pressed', String(button === active));
      }
      for (const view of views) {
        if (!view.asset_id || !view.view) continue;
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = view.view.replaceAll('-', ' ');
        button.setAttribute('aria-pressed', 'false');
        button.onclick = () => select(view, button);
        controls.append(button);
        if (controls.children.length === 1) select(view, button);
      }
      controls.hidden = pick('aerial').hidden = !controls.children.length;
    }).catch(() => {});
}
