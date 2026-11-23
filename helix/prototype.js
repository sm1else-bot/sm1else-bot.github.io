
'use strict';
const records = {
 source:{src:'assets/hardy-aerial.webp',original:'../helix_old/screenshots/source-evidence.jpg',
 type:'Vexcel / exterior image',caption:'15603 W Hardy Rd · Exterior imagery from the saved investigation. Crop rotated 90°; source credit retained.',
 alt:'Aerial view of the Hardy Road building and its paved loading areas, cropped from the saved Vexcel source-evidence screenshot.'},
 findings:{src:'assets/observations.jpg',original:'assets/observations.jpg',
 type:'Stage 2 / saved observations',caption:'Hardy Road · Actual investigation interface. Visual observations remain tied to source images; they do not establish suite suitability.',
 alt:'Saved Helix observations interface with image-linked findings about the interior, entrances, parking, and visible utilities.'},
 decision:{src:'assets/memorandum.jpg',original:'assets/memorandum.jpg',
 type:'Stage 4 / investment memorandum',caption:'Hardy Road · Saved veterinary-clinic scenario. Modeled financial results and due-diligence conditions, not verified business outcomes.',
 alt:'Helix investment memorandum for a veterinary clinic at 15603 W Hardy Road, showing the modeled capital and due-diligence verdict.'}
};
const tabs=[...document.querySelectorAll('[role=tab]')];
const image=document.querySelector('#artifact-image');
const panel=document.querySelector('#artifact-panel');
const motion=matchMedia('(prefers-reduced-motion: reduce)');
let generation=0;
async function select(tab) {
 const record=records[tab.dataset.artifact], turn=++generation;
 tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});
 panel.setAttribute('aria-labelledby',tab.id);
 const preload=new Image();preload.src=record.src;
 try {await preload.decode();} catch {if(turn===generation) window.location.href=record.original;return;}
 if(turn!==generation)return;
 image.src=record.src;image.alt=record.alt;
 document.querySelector('#artifact-open').href=record.original;
 document.querySelector('#artifact-open').setAttribute('aria-label','Open original '+tab.dataset.artifact+' capture');
 document.querySelector('#artifact-type').textContent=record.type;
 document.querySelector('#artifact-caption').textContent=record.caption;
 document.querySelector('.artifact-window').dataset.view=tab.dataset.artifact;
 image.getAnimations().forEach(a=>a.cancel());
 if(!motion.matches)image.animate([{opacity:.15,transform:'translateY(12px) scale(.985)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:440,easing:'cubic-bezier(.2,.75,.2,1)'});
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>select(tab));
 tab.addEventListener('keydown',event=>{
  let next;
  if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%tabs.length;
  if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
  if(event.key==='Home')next=0;
  if(event.key==='End')next=tabs.length-1;
  if(next===undefined)return;
  event.preventDefault();tabs[next].focus();select(tabs[next]);
 });
});
if(!motion.matches) {
 document.querySelector('h1').animate([{clipPath:'inset(100% 0 0 0)',transform:'translateY(20px)'},{clipPath:'inset(0)',transform:'translateY(0)'}],{duration:800,easing:'cubic-bezier(.16,1,.3,1)'});
 document.querySelector('.artifact').animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay:100,fill:'backwards',easing:'cubic-bezier(.16,1,.3,1)'});
}
