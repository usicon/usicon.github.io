/* ===== Edit these links when they are ready ===== */
const LINKS = {
  ojs: "https://conference.uin-suka.ac.id/index.php/USICON/index",
  template: "https://docs.google.com/document/d/12HYDjJiCMB20r26dUua6hKX2KqN9JDDj/edit?usp=sharing&ouid=113508623128149918038&rtpof=true&sd=true"
};
/* ================================================ */

(function(){
  const ojs=document.getElementById('ojsLink'), tpl=document.getElementById('tplLink'), note=document.getElementById('linkNote');
  [[ojs,LINKS.ojs],[tpl,LINKS.template]].forEach(([a,url])=>{ if(!a) return; if(url){a.href=url}else{a.setAttribute('aria-disabled','true');a.removeAttribute('href')} });
  if(note && LINKS.ojs && LINKS.template) note.hidden=true;

  const btn=document.getElementById('menuBtn'), nav=document.getElementById('nav');
  btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn.setAttribute('aria-expanded','false')}));

  const cb=document.getElementById('copyBtn'); if(cb) cb.addEventListener('click',e=>{
    const t='082283004228', b=e.currentTarget;
    const done=()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1600)};
    const fallback=()=>{const r=document.createRange();r.selectNodeContents(document.getElementById('phone'));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected'};
    try{navigator.clipboard.writeText(t).then(done,fallback)}catch(_){fallback()}
  });

  const deadline=new Date('2026-10-30T23:59:59+07:00'), conf=new Date('2026-11-10T08:00:00+07:00'), confEnd=new Date('2026-11-11T23:59:59+07:00');
  const lab=document.getElementById('cdLabel'), el=id=>document.getElementById(id);
  const pad=n=>String(n).padStart(2,'0');
  function tick(){
    const now=new Date(); let target=deadline;
    if(now>deadline && now<conf){target=conf;lab.innerHTML='Conference begins<small>November 10, 2026 · UIN Sunan Kalijaga</small>'}
    else if(now>=conf && now<=confEnd){lab.innerHTML='The conference is underway<small>November 10–11, 2026</small>';target=now}
    else if(now>confEnd){lab.innerHTML='Thank you for joining<small>9th USICON · November 10–11, 2026</small>';target=now}
    let d=Math.max(0,target-now);
    el('cdD').textContent=Math.floor(d/864e5); d%=864e5;
    el('cdH').textContent=pad(Math.floor(d/36e5)); d%=36e5;
    el('cdM').textContent=pad(Math.floor(d/6e4)); d%=6e4;
    el('cdS').textContent=pad(Math.floor(d/1e3));
  }
  if(lab){ tick(); setInterval(tick,1000); }

  const now=new Date();
  document.querySelectorAll('.step').forEach(s=>{
    const st=new Date(s.dataset.start), en=new Date(s.dataset.end), tag=s.querySelector('.status');
    if(now<st){tag.textContent='Upcoming'}
    else if(now<=en){tag.textContent='Open now';tag.classList.add('open');s.classList.add('now')}
    else{tag.textContent='Closed';tag.classList.add('closed')}
  });
})();
