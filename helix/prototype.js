
'use strict';
const aerial='assets/hardy-aerial.webp';
const records = {
 source:{src:aerial,original:'../helix_old/screenshots/source-evidence.jpg',
 type:'Vexcel / exterior image',caption:'15603 W Hardy Rd · Exterior imagery from the saved investigation. Crop rotated 90°; source credit retained.',
 alt:'Aerial view of the Hardy Road building and its paved loading areas, cropped from the saved Vexcel source-evidence screenshot.'},
 findings:{src:aerial,original:'../helix_old/screenshots/source-evidence.jpg',
 type:'Investigation / exterior evidence',caption:'Marked parking and paved loading areas are visible. Lease allocation, access dimensions and selected-suite boundaries remain unverified.',
 alt:'The same Hardy Road aerial view, annotated with visible parking, the paved service area and building-level image scope.',
 annotations:[
  {kind:'box',box:[50,20,1200,132],point:[640,88],label:[.04,.05],text:'Marked parking',detail:'Visible in the aerial'},
  {kind:'ellipse',box:[360,405,630,140],point:[680,480],label:[.53,.72],text:'Paved service area',detail:'Vehicle access visible'},
  {kind:'polygon',points:[[74,231],[525,195],[529,222],[727,208],[727,177],[1179,143],[1197,372],[86,455],[73,305],[69,306]],point:[930,270],label:[.59,.31],text:'Building footprint',detail:'Suite allocation unknown'}
 ]},
 interior:{src:'assets/hardy-interior.webp',original:'assets/spatial.jpg',
 type:'Investigation / Matterport interior',caption:'Saved Matterport view. Existing partitions, a corridor and outlets are visible. Clear height and structural function are unverified; scan-to-suite coverage is unresolved.',
 alt:'Cropped Hardy Road Matterport interior showing a corridor, existing partition walls, windows and electrical outlets, with source-linked annotations.',
 annotations:[
  {kind:'box',box:[280,20,650,520],point:[610,250],label:[.49,.09],text:'Existing partition',detail:'Structural status unknown'},
  {kind:'ellipse',box:[20,90,290,510],point:[170,360],label:[.04,.64],text:'Interior corridor',detail:'Clearance not measured'},
  {kind:'ellipse',box:[700,395,190,140],point:[790,460],label:[.61,.68],text:'Visible power outlets',detail:'Electrical capacity unknown'}
 ]},
 engine:{original:'https://projects.jessenth.com/Helix-Viz/',
 type:'Screening / deterministic engine',caption:'26 uses · building fit, affordability, compliance. Illustrative default inputs, actual engine rules. 8× loop; drag to orbit and scroll to zoom.',
 mark:'Illustrative fixture'},
 finance:{src:'assets/hardy-finance.webp',fit:'contain',original:'../helix_old/screenshots/finance.jpg',
 type:'Finance Lab / saved cost model',caption:'Hardy Road · Veterinary clinic. $406,940 to open + $50,000 reserve = $456,940 required, leaving $443,060 from a $900,000 budget. Build-out uses a typical-unit benchmark, not a suite-specific quote.',
 alt:'Cropped actual Finance Lab screenshot showing Hardy Road capital requirements and the sourced startup cost ledger.',
 annotations:[
  {kind:'box',box:[25,62,620,140],point:[180,152],label:[.025,.035],text:'Cash to open',detail:'$406,940 · base case'},
  {kind:'box',box:[1330,62,635,140],point:[1460,152],label:[.66,.035],text:'Including reserve',detail:'$456,940 required'},
  {kind:'box',box:[25,645,1945,107],point:[1200,700],label:[.39,.81],mobileLabel:[.025,.78],text:'Build-out benchmark',detail:'$152,250 base · not suite-scaled'}
 ]},
 decision:{original:'assets/memorandum.jpg',
 type:'Decision / saved memorandum',caption:'Hardy Road · Retypeset from the saved veterinary-clinic memorandum. $900,000 cash budget; base-case costs and reserve shown. Open the original for the full record.',
 mark:'Saved result'}
};
const tabs=[...document.querySelectorAll('[role=tab]')];
const image=document.querySelector('#artifact-image');
const imageLink=document.querySelector('#artifact-open');
const panel=document.querySelector('#artifact-panel');
const stage=document.querySelector('.artifact-window');
const layer=document.querySelector('#annotation-layer');
const svg=document.querySelector('#annotation-lines');
const labels=document.querySelector('#annotation-labels');
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const narrow=matchMedia('(max-width:650px)');
let generation=0, current='source';
const ns='http://www.w3.org/2000/svg';

function svgNode(tag,attributes) {
 const node=document.createElementNS(ns,tag);
 for(const [name,value] of Object.entries(attributes))node.setAttribute(name,String(value));
 return node;
}
function drawAnnotations(animate=false) {
 const findings=records[current].annotations;
 svg.replaceChildren();labels.replaceChildren();
 if(!findings || !image.naturalWidth)return;
 const w=stage.clientWidth,h=stage.clientHeight;
 svg.setAttribute('viewBox','0 0 '+w+' '+h);
 // Match the image fit exactly: cover for photographs, contain for the finance worksheet.
 const scale=(records[current].fit==='contain'?Math.min:Math.max)(w/image.naturalWidth,h/image.naturalHeight);
 const ox=(w-image.naturalWidth*scale)/2,oy=(h-image.naturalHeight*scale)/2;
 for(const [i,finding] of findings.entries()) {
  let shape;
  if(finding.kind==='polygon') {
   const points=finding.points.map(([x,y])=>(ox+x*scale)+','+(oy+y*scale)).join(' ');
   shape=svgNode('polygon',{points});
  } else {
   const [x,y,bw,bh]=finding.box;
   shape=finding.kind==='ellipse'
    ?svgNode('ellipse',{cx:ox+(x+bw/2)*scale,cy:oy+(y+bh/2)*scale,rx:bw*scale/2,ry:bh*scale/2})
    :svgNode('rect',{x:ox+x*scale,y:oy+y*scale,width:bw*scale,height:bh*scale,rx:3});
  }
  shape.setAttribute('pathLength','1');shape.setAttribute('class','annotation-shape');
  shape.style.animationDelay=(i*130)+'ms';
  const label=document.createElement('div');label.className='annotation-label';label.setAttribute('role','listitem');
  const heading=document.createElement('strong');heading.textContent=finding.text;
  const detail=document.createElement('small');detail.className='annotation-detail';detail.textContent=finding.detail;
  label.append(heading,detail);labels.append(label);
  // Label placements use screen space; source coordinates remain projected underneath.
  const placement=narrow.matches&&finding.mobileLabel?finding.mobileLabel:finding.label;
  const lx=Math.max(8,Math.min(w-label.offsetWidth-8,w*placement[0]));
  const ly=Math.max(8,Math.min(h-label.offsetHeight-8,h*placement[1]));
  label.style.left=lx+'px';label.style.top=ly+'px';label.style.animationDelay=(180+i*130)+'ms';
  const px=ox+finding.point[0]*scale,py=oy+finding.point[1]*scale;
  const endX=lx+label.offsetWidth/2,endY=ly+label.offsetHeight/2;
  const leader=svgNode('path',{d:'M '+px+' '+py+' L '+endX+' '+py+' L '+endX+' '+endY,pathLength:1,class:'annotation-leader'});
  leader.style.animationDelay=(100+i*130)+'ms';
  if(!animate || motion.matches){shape.style.animation='none';leader.style.animation='none';label.style.animation='none';}
  svg.append(shape,leader);
 }
}
async function select(tab) {
 const key=tab.dataset.artifact,record=records[key],turn=++generation;
 tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});
 panel.setAttribute('aria-labelledby',tab.id);
 let changed=false;
 if(record.src) {
  const preload=new Image();preload.src=record.src;
  try {await preload.decode();} catch {
   if(turn===generation)document.querySelector('#artifact-caption').textContent='Image unavailable. Open the original capture to inspect this record.';
   return;
  }
  if(turn!==generation)return;
  changed=!image.src.endsWith(record.src);
  image.src=record.src;image.alt=record.alt;
 }
 if(turn!==generation)return;
 current=key;stage.dataset.view=key;
 image.style.objectFit=record.fit||'cover';
 imageLink.hidden=!record.src;
 document.querySelector('#engine-slot').hidden=key!=='engine';
 const enginePlayer=document.querySelector('#engine-player');
 if(key==='engine'){
  if(!enginePlayer.hasAttribute('src'))enginePlayer.src=enginePlayer.dataset.src;
 }else enginePlayer.removeAttribute('src');
 document.querySelector('#decision-sheet').hidden=key!=='decision';
 layer.hidden=!record.annotations;
 imageLink.href=record.original;
 imageLink.setAttribute('aria-label','Open original '+key+' capture');
 document.querySelector('#original-capture').href=record.original;
 document.querySelector('#original-capture').textContent=key==='engine'?'Explore Helix-Viz ＋':'Open original capture ＋';
 document.querySelector('#artifact-type').textContent=record.type;
 document.querySelector('#artifact-caption').textContent=record.caption;
 document.querySelector('#capture-mark').textContent=record.mark||'Saved evidence';
 image.getAnimations().forEach(a=>a.cancel());
 // Source to exterior investigation keeps the image still; only the evidence marks enter.
 if(changed&&!motion.matches)image.animate([{opacity:.25},{opacity:1}],{duration:400,easing:'cubic-bezier(.2,.75,.2,1)'});
 drawAnnotations(true);
 const sheet=document.querySelector(key==='decision'?'#decision-sheet':'#engine-slot');
 if(!record.src&&!motion.matches)sheet.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.16,1,.3,1)'});
 if(narrow.matches)tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:motion.matches?'instant':'smooth'});
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
function orientation(){document.querySelector('[role=tablist]').setAttribute('aria-orientation',narrow.matches?'horizontal':'vertical');}
narrow.addEventListener('change',orientation);orientation();
new ResizeObserver(()=>drawAnnotations(false)).observe(stage);
motion.addEventListener('change',()=>{image.getAnimations().forEach(a=>a.cancel());drawAnnotations(false);});
if(!motion.matches) {
 document.querySelector('h1').animate([{clipPath:'inset(100% 0 0 0)',transform:'translateY(20px)'},{clipPath:'inset(0)',transform:'translateY(0)'}],{duration:800,easing:'cubic-bezier(.16,1,.3,1)'});
 document.querySelector('.artifact').animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay:100,fill:'backwards',easing:'cubic-bezier(.16,1,.3,1)'});
}
