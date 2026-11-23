'use strict';
const steps = {
  discovery: ['Helix discovery result for the Hardy Road flex space', 'Compare asking rent, suite area, and listing verification before investigating the space.'],
  spatial: ['Interior scan and exterior aerial views', 'The building investigation brings interior and exterior views together.'],
  observations: ['Findings on access, layout, parking, and visible utilities', 'The interface distinguishes visible features from questions that need verification.'],
  'source-evidence': ['Aerial image behind the loading-area observation', 'Inspect the original evidence behind a loading-area finding.'],
  screening: ['Veterinary clinic screening card with cost scenarios', 'Compare opening costs and inspect the conditions that still govern feasibility.'],
  finance: ['Finance Lab capital model and cost ledger', 'Carry the selected use into a capital model and inspect its itemized costs.'],
  memorandum: ['Hardy Road veterinary clinic investment memorandum', 'Review the conditional decision, estimated opening costs, and remaining diligence checks.'],
};
const pick = id => document.getElementById(id);
const local = ['127.0.0.1','localhost','[::1]'].includes(location.hostname);
const buttons = document.querySelectorAll('[data-step]');
for (const button of buttons) {
  button.addEventListener('click', () => {
    const step = button.dataset.step;
    const [alt, caption] = steps[step];
    const url = 'screenshots/' + step + '.jpg';
    pick('walk-image').src = url;
    pick('walk-image').alt = alt;
    pick('walk-link').href = url;
    pick('walk-caption').textContent = caption;
    for (const option of buttons) option.setAttribute('aria-pressed', String(option === button));
  });
}
if (local) {
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
