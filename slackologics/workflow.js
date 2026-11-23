
(() => {
'use strict';
const $ = id => document.getElementById(id);
const node = (tag, className, text) => {const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;};
let scenes=[], selected=0;
const plain = text => text.replace(/<([^>|]+)\|([^>]+)>/g,'$2').replace(/<((?:https?:)[^>]+)>/g,'$1').replace(/<@[A-Z0-9]+>/g,'[teammate]').replace(/[*`]/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
function message(m){
 const article=node('article','message');
 article.append(node('div','avatar',m.sender.split(' ').map(s=>s[0]).slice(0,2).join('')));
 const content=node('div');const meta=node('div','message-meta');meta.append(node('strong','',m.sender),node('time','',m.date+' · '+m.time));
 content.append(meta,node('span','actor',m.actor),node('div','message-body',plain(m.text)));
 if(m.reactions?.length){const reactions=node('div','reactions');for(const [name,count] of m.reactions){const emojis={eyes:'👀',white_check_mark:'✅',thumbsup:'👍','+1':'👍'};reactions.append(node('span','reaction',(emojis[name]||':'+name+':')+' '+count));}content.append(reactions);}
 const source=node('a','message-source',(m.excerpt?'Excerpt':'Original message')+' · #'+m.channel+' ↗');source.href=m.link;source.target='_blank';source.rel='noopener noreferrer';content.append(source);article.append(content);return article;
}
function closeThread(focus=false){$('thread-pane').hidden=true;$('workspace').classList.remove('has-thread');$('thread-toggle').setAttribute('aria-expanded','false');if(focus)$('thread-toggle').focus();}
function select(index){selected=index;const s=scenes[index];closeThread();
 document.querySelectorAll('#scene-nav button').forEach((b,i)=>b.setAttribute('aria-current',String(i===index)));
 $('channel-name').textContent=s.channel;$('channel-topic').textContent=s.title;
 $('message-area').replaceChildren(...s.messages.map(message));
 $('reconstruction-note').textContent=s.note;
 $('thread-toggle').hidden=!s.thread.length;
 const sequence=['corrections','handoff'].includes(s.id);
 $('thread-toggle').textContent=sequence?'Follow the cross-channel sequence ↗':s.thread.length+' selected thread repl'+(s.thread.length===1?'y':'ies')+' →';
 $('thread-title').textContent=sequence?'Cross-channel sequence':'Thread · selected replies';
 $('thread-messages').replaceChildren(...s.thread.map(message));
 $('mechanism-title').textContent=s.title;$('mechanism-description').textContent=s.description;
 $('mechanism-rules').replaceChildren(...s.rules.map(t=>node('li','',t)));$('mechanism-takeaway').textContent=s.takeaway;
}
$('thread-toggle').addEventListener('click',()=>{if(!$('thread-pane').hidden){closeThread();return;}$('thread-pane').hidden=false;$('workspace').classList.add('has-thread');$('thread-toggle').setAttribute('aria-expanded','true');$('close-thread').focus({preventScroll:true});});
$('close-thread').addEventListener('click',()=>closeThread(true));
$('thread-pane').addEventListener('keydown',e=>{if(e.key==='Escape')closeThread(true);});
fetch('workflow-data.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Archive unavailable');return r.json();}).then(data=>{scenes=data;data.forEach((s,i)=>{const b=node('button');b.type='button';b.append(node('span','',String(i+1).padStart(2,'0')),node('strong','',s.label));b.addEventListener('click',()=>select(i));$('scene-nav').append(b);});select(0);}).catch(()=>{$('message-area').textContent='The message excerpts could not be loaded. Please refresh to try again.';$('thread-toggle').hidden=true;});
})();
