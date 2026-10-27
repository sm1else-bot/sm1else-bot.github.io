const grid = document.getElementById('project-grid');
const search = document.getElementById('search');
const dialog = document.getElementById('preview');
const frame = document.getElementById('preview-frame');
let filter = 'all';
let lastPreviewButton = null;
function visual(project) {
  if (project.visual === 'language') return '<span class="glyph" lang="ta">மொழி</span><span class="visual-caption">MOZHI<small>THINK IN TAMIL. BUILD IN CODE.</small></span>';
  if (project.visual === 'wave') return '<svg viewBox="0 0 500 150" aria-hidden="true"><g stroke="currentColor" opacity=".12"><path d="M0 75H500M0 25H500M0 125H500M50 0V150M150 0V150M250 0V150M350 0V150M450 0V150"/></g><path class="wave-lines" d="M0 75C20 75 20 10 42 10S65 140 87 140S110 10 132 10S155 140 177 140S200 10 222 10S245 140 267 140S290 10 312 10S335 140 357 140S380 10 402 10S425 140 447 140S470 10 492 10"/></svg><span class="visual-label">OSCILLATOR → ENVELOPE → INSTRUMENT</span>';
  if (project.visual === 'search') return '<div class="search-mock">⌕ &nbsp; Find what you came for.<small>Files, folders, and a faster way through.</small></div>';
  return '<svg viewBox="0 0 500 150" aria-hidden="true"><g class="wave-lines" opacity=".45"><path d="M0 25C130 25 140 0 250 10S380 25 500 25M0 45C130 45 140 12 250 25S380 45 500 45M0 65C130 65 145 30 250 40S380 65 500 65M0 85C130 85 145 120 250 110S380 85 500 85M0 105C130 105 145 140 250 130S380 105 500 105M0 125C130 125 145 150 250 145S380 125 500 125"/></g><path d="M170 78Q235 40 330 78Q250 83 170 78Z" fill="currentColor"/></svg><span class="visual-label">AEROWORKS / VIRTUAL WIND TUNNEL</span>';
}
function render() {
  const query = search.value.trim().toLowerCase();
  const projects = PROJECTS.filter(p => (filter === 'all' || p.type === filter) && [p.name,p.category,p.description,...p.tags].join(' ').toLowerCase().includes(query));
  grid.replaceChildren();
  for (const project of projects) {
    const card = document.createElement('article');card.className='project-card';card.dataset.project=project.id;
    card.innerHTML=`<div class="project-visual ${project.visual}">${visual(project)}</div><div class="project-body"><div class="card-top"><span>${project.number} / ${project.category}</span><span>${project.demo?'● LIVE DEMO':'SOURCE AVAILABLE'}</span></div><h3>${project.name}</h3><p class="project-description">${project.description}</p><div class="tags">${project.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="card-actions"></div></div>`;
    const actions=card.querySelector('.card-actions');
    if(project.demo){const open=document.createElement('a');open.href=project.demo;open.textContent='Open demo ↗';actions.append(open);
      const preview=document.createElement('button');preview.className='preview-button';preview.textContent='Quick preview';preview.onclick=()=>openPreview(project,preview);actions.append(preview);}
    if(project.source){const source=document.createElement('a');source.href=project.source;source.className='source-link';source.textContent='View source ↗';actions.append(source);}
    if(project.extra){const extra=document.createElement('a');extra.href=project.extra.url;extra.className='guide-link';extra.textContent=project.extra.label+' →';card.querySelector('.project-body').append(extra);}
    grid.append(card);
  }
  document.getElementById('empty').hidden=projects.length>0;
  document.getElementById('results').textContent=`${projects.length} of ${PROJECTS.length} projects`;
}
function openPreview(project,button){lastPreviewButton=button;document.getElementById('preview-title').textContent=project.name;document.getElementById('preview-open').href=project.demo;frame.title=project.name+' live preview';frame.src=project.demo;dialog.showModal();document.getElementById('preview-close').focus();}
document.getElementById('preview-close').onclick=()=>dialog.close();
dialog.addEventListener('close',()=>{frame.src='about:blank';lastPreviewButton?.focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('[data-filter]').forEach(button=>button.onclick=()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();});
search.addEventListener('input',render);
document.getElementById('all-count').textContent=PROJECTS.length;
render();
