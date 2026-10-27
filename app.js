const $ = id => document.getElementById(id);
const grid = $('project-grid'), search = $('search'), dialog = $('preview'), frame = $('preview-frame');
const state = {filter:'all',query:'',sort:'curated',view:'grid'};
let lastPreviewButton = null;
function element(tag, className, text) {
  const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;
}
function destination(project) {
  return project.demo || project.website || project.download || project.publication || project.video || project.source;
}
function readLocation() {
  const params=new URLSearchParams(location.search);
  state.filter=['all','demo','download','source'].includes(params.get('filter'))?params.get('filter'):'all';
  state.query=params.get('q')||'';state.sort=params.get('sort')==='name'?'name':'curated';
  try{state.view=params.get('view')||(localStorage.getItem('projects-view')||'grid');}catch{state.view=params.get('view')||'grid';}
  if(!['grid','list'].includes(state.view))state.view='grid';
  search.value=state.query;$('sort').value=state.sort;
}
function updateLocation(replace=false) {
  const url=new URL(location.href);for(const key of ['filter','q','sort','view'])url.searchParams.delete(key);
  if(state.filter!=='all')url.searchParams.set('filter',state.filter);
  if(state.query)url.searchParams.set('q',state.query);
  if(state.sort!=='curated')url.searchParams.set('sort',state.sort);
  if(state.view!=='grid')url.searchParams.set('view',state.view);
  if(url.href!==location.href)history[replace?'replaceState':'pushState']({},'',url);
}
function link(url,label,className='') {const a=element('a',className,label);a.href=url;return a;}
function buildCard(project) {
  const card=element('article','project-card entering'+(!project.image?' compact':''));card.dataset.project=project.id;
  if(project.image){
    const media=element(project.demo?'button':'a','project-media');
    if(project.demo){media.type='button';media.setAttribute('aria-label','Preview '+project.name);media.onclick=()=>openPreview(project,media);}else{media.href=destination(project);}
    const img=element('img');img.src=project.image;img.alt=project.imageAlt||project.name;img.width=1440;img.height=900;img.decoding='async';img.loading='lazy';media.append(img);
    media.append(element('span','media-action',project.demo?'↗  Preview':'Open ↗'));card.append(media);
  }else{const mark=element('a','source-mark');mark.href=destination(project);mark.setAttribute('aria-label','Open '+project.name);mark.append(element('strong','',project.mark||project.name.slice(0,2)),element('span','',project.download?'DESKTOP':'SOURCE'));card.append(mark);}
  const body=element('div','project-body');const heading=element('div','card-heading');const h2=element('h2');h2.append(link(destination(project),project.name));heading.append(h2,element('span','category',project.category));body.append(heading,element('p','project-description',project.description));
  const tags=element('div','tags');
  for(const tag of project.tags){const button=element('button','',tag);button.type='button';button.setAttribute('aria-label','Search '+tag);button.onclick=()=>{state.query=tag;search.value=tag;state.filter='all';updateLocation();render();};tags.append(button);}body.append(tags);
  const actions=element('div','card-actions');
  if(project.demo){actions.append(link(project.demo,'Launch ↗','primary-action'));}
  if(project.website)actions.append(link(project.website,'Visit website ↗','primary-action'));
  if(project.download)actions.append(link(project.download,project.downloadLabel||'Download','primary-action'));
  if(project.video)actions.append(link(project.video,'Watch demo ↗'));
  if(project.publication)actions.append(link(project.publication,'Publication ↗'));
  if(project.source)actions.append(link(project.source,'Source ↗',!project.demo&&!project.download?'primary-action':''));
  if(project.extra&&project.demo)actions.append(link(project.extra.url,project.extra.label));
  const details=element('div','details');details.id='details-'+project.id;details.hidden=true;
  if(project.note)details.append(element('p','',project.note));
  if(project.extra&&!project.demo)details.append(link(project.extra.url,project.extra.label+' ↗'));
  const toggle=element('button','details-toggle','Details +');toggle.type='button';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls',details.id);
  toggle.onclick=()=>{details.hidden=!details.hidden;toggle.setAttribute('aria-expanded',String(!details.hidden));toggle.textContent=details.hidden?'Details +':'Details −';};actions.append(toggle);
  body.append(actions,details);card.append(body);return card;
}
function render() {
  const query=state.query.trim().toLocaleLowerCase();
  const matches=PROJECTS.filter(p=>(state.filter==='all'||Boolean(p[state.filter]))&&[p.name,p.category,p.description,...p.tags].join(' ').toLocaleLowerCase().includes(query));
  if(state.sort==='name')matches.sort((a,b)=>a.name.localeCompare(b.name));
  grid.classList.toggle('list',state.view==='list');
  const fragment=document.createDocumentFragment();for(const p of matches)fragment.append(buildCard(p));grid.replaceChildren(fragment);
  $('empty').hidden=matches.length>0;$('results').textContent=matches.length===PROJECTS.length?`${PROJECTS.length} projects`:`${matches.length} of ${PROJECTS.length} projects`;
  $('reset').hidden=!state.query&&state.filter==='all';
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===state.filter)));
  for(const view of ['grid','list'])$(view+'-view').setAttribute('aria-pressed',String(view===state.view));
}
function openPreview(project,button) {
  lastPreviewButton=button;$('preview-title').textContent=project.name;$('preview-open').href=project.demo;
  $('preview-status').textContent='Loading…';frame.title=project.name+' live preview';frame.src=project.demo;dialog.showModal();$('preview-close').focus();
}
frame.addEventListener('load',()=>{if(dialog.open)$('preview-status').textContent='';});
$('preview-close').onclick=()=>dialog.close();
// Unloading the frame stops audio and workers. Native dialog restores keyboard focus.
 dialog.addEventListener('close',()=>{frame.src='about:blank';lastPreviewButton?.focus();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
function clearFilters(){state.query='';state.filter='all';search.value='';updateLocation();render();search.focus();}
$('reset').onclick=clearFilters;$('empty-reset').onclick=clearFilters;
search.addEventListener('input',()=>{state.query=search.value;updateLocation(true);render();});
$('sort').onchange=()=>{state.sort=$('sort').value;updateLocation();render();};
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;updateLocation();render();});
for(const view of ['grid','list'])$(view+'-view').onclick=()=>{state.view=view;try{localStorage.setItem('projects-view',view);}catch{}updateLocation();render();};
window.addEventListener('popstate',()=>{readLocation();render();});
document.addEventListener('keydown',e=>{if(dialog.open||e.target.closest('input,textarea,select,[contenteditable]'))return;if(e.key==='/'&&!e.ctrlKey&&!e.metaKey){e.preventDefault();search.focus();}});
search.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();clearFilters();search.blur();}});
$('total-count').textContent=PROJECTS.length;$('all-count').textContent=PROJECTS.length;
readLocation();render();
