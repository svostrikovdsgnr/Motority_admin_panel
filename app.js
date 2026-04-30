const titles={dashboard:'Dashboard',landing:'Landing Page Editor',catalog:'Cars Catalog',media:'Media Library',style:'Brand Style',community:'Community',users:'Users & Roles',notifications:'Notifications',history:'Version History',settings:'Settings'};
const navOrder=['dashboard','landing','catalog','media','style','community','users','notifications','history','settings'];

let _prevView='catalog';

function nav(id){
  navOrder.forEach((n,i)=>document.querySelectorAll('.sb-item')[i]?.classList.remove('active'));
  const idx=navOrder.indexOf(id);
  document.querySelectorAll('.sb-item')[idx]?.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('v-'+id)?.classList.add('active');
  document.getElementById('topbar-title').textContent=titles[id]||id;
  document.getElementById('topbar-title').style.fontSize='15px';
  document.getElementById('topbar-back').style.display='none';
  document.getElementById('topbar-parent').style.display='none';
  document.getElementById('topbar-sep').style.display='none';
  _prevView=id;
}

function navBack(){
  nav('catalog');
}

/* ── BREADCRUMB HELPERS ── */
function setSubPage(label){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  navOrder.forEach((n,i)=>document.querySelectorAll('.sb-item')[i]?.classList.remove('active'));
  document.querySelectorAll('.sb-item')[2]?.classList.add('active');
  document.getElementById('topbar-back').style.display='flex';
  document.getElementById('topbar-parent').style.display='inline';
  document.getElementById('topbar-parent').textContent='Cars Catalog';
  document.getElementById('topbar-sep').style.display='inline';
  document.getElementById('topbar-title').textContent=label;
  document.getElementById('topbar-title').style.fontSize='14px';
}

/* ── MODEL PAGE ── */
function openModelPage(modelName){
  const isNew=modelName==='new';
  setSubPage(isNew?'Add Model':modelName);
  document.getElementById('v-model-editor').classList.add('active');
  document.getElementById('content').scrollTop = 0;
  const metaCard=document.getElementById('me-meta-card');
  if(isNew){
    document.getElementById('me-name').value='';
    document.getElementById('me-years').value='';
    document.getElementById('me-desc').value='';
    if(metaCard) metaCard.style.display='none';
  } else {
    const data={
      'BMW M4':{years:'2014 – Present',desc:'The BMW M4 is a high-performance derivative of the 4 Series. Powered by the S58 turbocharged inline-six in its current G82 form.'},
      'BMW M3':{years:'1986 – Present',desc:'The BMW M3 is the performance version of the 3 Series — one of the most celebrated sports sedans in automotive history.'},
      'BMW X5':{years:'1999 – Present',desc:'The BMW X5 pioneered the Sports Activity Vehicle segment. Now in its fourth generation (G05).'},
      'BMW 3 Series':{years:'1975 – Present',desc:'The backbone of the BMW lineup. Eight generations have defined what a compact executive car should drive like.'},
      'BMW iX':{years:'2021 – Present',desc:'The BMW iX is a fully electric flagship SAV built on a dedicated EV platform.'},
    };
    const d=data[modelName]||{years:'',desc:''};
    document.getElementById('me-name').value=modelName;
    document.getElementById('me-years').value=d.years;
    document.getElementById('me-desc').value=d.desc;
    if(metaCard) metaCard.style.display='';
  }
}

/* ── GENERATION PAGE ── */
function openGenPage(genName, parentModel){
  const isNew=genName==='new';
  setSubPage(isNew?'Add Generation':genName);
  document.getElementById('v-gen-editor').classList.add('active');
  document.getElementById('content').scrollTop = 0;
  document.getElementById('ge-name').value=isNew?'':genName;
  document.getElementById('ge-years').value=isNew?'':
    genName==='BMW M4 G82'?'2020 – Present':
    genName==='BMW M4 F82'?'2014 – 2020':'2022 – Present';
  document.getElementById('ge-desc').value=isNew?'':
    `${genName} — key generation details with performance updates and engineering refinements.`;
  const modelSel=document.getElementById('ge-model');
  if(parentModel && modelSel){
    for(let i=0;i<modelSel.options.length;i++){
      if(modelSel.options[i].text===parentModel){modelSel.selectedIndex=i;break;}
    }
  }
}

/* ── HERO SWITCHER ── */
function switchHero(type){
  ['image','video','carousel'].forEach(t=>{
    document.getElementById('htab-'+t)?.classList.toggle('active',t===type);
    const el=document.getElementById('hero-'+t+'-fields');
    if(el) el.style.display=t===type?'':'none';
  });
}

/* ── CATALOG TABS ── */
function switchCatalogTab(tab){
  document.querySelectorAll('#catalog-tabs .tab').forEach((t,i)=>
    t.classList.toggle('active',(i===0&&tab==='models')||(i===1&&tab==='gen')));
  document.getElementById('catalog-models').style.display=tab==='models'?'':'none';
  document.getElementById('catalog-gen').style.display=tab==='gen'?'':'none';
  // reset model selector when switching to generations tab
  if(tab==='gen'){
    const sel=document.getElementById('gen-model-filter');
    if(sel && !sel.value) filterGenerations('');
  }
}

/* ── GENERATIONS MODEL FILTER ── */
const _genData={
  'BMW M4':[
    {name:'BMW M4 G82',years:'2020 – Present',logbooks:147,badge:'badge-green'},
    {name:'BMW M4 F82',years:'2014 – 2020',logbooks:98,badge:'badge-green'},
    {name:'BMW M4 CS (G82)',years:'2022 – Present',logbooks:39,badge:'badge-yellow'},
  ],
  'BMW M3':[
    {name:'BMW M3 G80',years:'2020 – Present',logbooks:203,badge:'badge-green'},
    {name:'BMW M3 F80',years:'2014 – 2020',logbooks:189,badge:'badge-green'},
    {name:'BMW M3 E92',years:'2007 – 2013',logbooks:97,badge:'badge-green'},
    {name:'BMW M3 E46',years:'2000 – 2006',logbooks:74,badge:'badge-yellow'},
    {name:'BMW M3 E36',years:'1992 – 1999',logbooks:38,badge:'badge-yellow'},
    {name:'BMW M3 E30',years:'1986 – 1991',logbooks:21,badge:'badge-gray'},
  ],
  'BMW X5':[
    {name:'BMW X5 G05',years:'2018 – Present',logbooks:312,badge:'badge-green'},
    {name:'BMW X5 F15',years:'2013 – 2018',logbooks:187,badge:'badge-green'},
    {name:'BMW X5 E70',years:'2006 – 2013',logbooks:96,badge:'badge-yellow'},
    {name:'BMW X5 E53',years:'1999 – 2006',logbooks:39,badge:'badge-yellow'},
  ],
  'BMW 3 Series':[
    {name:'BMW 3 Series G20',years:'2018 – Present',logbooks:487,badge:'badge-green'},
    {name:'BMW 3 Series G20 LCI',years:'2022 – Present',logbooks:214,badge:'badge-green'},
    {name:'BMW 3 Series F30',years:'2011 – 2018',logbooks:321,badge:'badge-green'},
    {name:'BMW 3 Series E90',years:'2005 – 2011',logbooks:156,badge:'badge-yellow'},
    {name:'BMW 3 Series E46',years:'1998 – 2006',logbooks:98,badge:'badge-yellow'},
    {name:'BMW 3 Series E36',years:'1990 – 1998',logbooks:47,badge:'badge-gray'},
    {name:'BMW 3 Series E30',years:'1982 – 1994',logbooks:28,badge:'badge-gray'},
    {name:'BMW 3 Series E21',years:'1975 – 1983',logbooks:12,badge:'badge-gray'},
  ],
  'BMW iX':[
    {name:'BMW iX i20',years:'2021 – Present',logbooks:47,badge:'badge-yellow'},
  ],
};

function filterGenerations(model){
  const empty=document.getElementById('gen-empty-state');
  const tableWrap=document.getElementById('gen-table-wrap');
  const tbody=document.getElementById('gen-table-body');
  const title=document.getElementById('gen-table-title');
  const countBadge=document.getElementById('gen-count-badge');
  const countText=document.getElementById('gen-count-text');

  if(!model){
    empty.style.display='';
    tableWrap.style.display='none';
    countBadge.style.display='none';
    return;
  }

  const gens=_genData[model]||[];
  empty.style.display='none';
  tableWrap.style.display='';
  title.textContent=model+' — Generations';
  countBadge.style.display='';
  countText.textContent=gens.length+' generation'+(gens.length!==1?'s':'');

  tbody.innerHTML=gens.map(g=>`
    <tr style="cursor:pointer" onclick="openGenPage('${g.name.replace(/'/g,"\\'")}','${model.replace(/'/g,"\\'")}')">
      <td><div class="cell-name">${g.name}</div></td>
      <td style="color:var(--text-3)">${g.years}</td>
      <td><span class="badge ${g.badge}">${g.logbooks}</span></td>
      <td><div class="actions">
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openGenPage('${g.name.replace(/'/g,"\\'")}','${model.replace(/'/g,"\\'")}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="event.stopPropagation();showToast('🗑️ ${g.name} deleted')">Delete</button>
      </div></td>
    </tr>`).join('');
}

/* ── CHIPS ── */
function toggleChip(el){el.classList.toggle('active');}

/* ── HERO MEDIA ── */
function removeHeroMedia(id){
  document.getElementById(id).style.display='none';
  showToast('🗑️ Media removed');
}

/* ── CUSTOM LINKS — MODEL PAGE ── */
let _customLinkCount=0;
function addCustomLink(){
  _customLinkCount++;
  const wrap=document.getElementById('me-custom-links');
  const div=document.createElement('div');
  div.className='ext-link-custom';
  div.id='custom-link-'+_customLinkCount;
  div.innerHTML=`
    <div class="ext-link-icon" style="background:var(--surface3);color:var(--text-3)">🔗</div>
    <div class="ext-link-fields">
      <label>Custom Link ${_customLinkCount}</label>
      <input type="url" placeholder="https://...">
    </div>
    <button class="ext-link-remove" onclick="document.getElementById('custom-link-${_customLinkCount}').remove();showToast('🗑️ Link removed')" title="Remove">
      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>`;
  wrap.appendChild(div);
}

/* ── CUSTOM LINKS — GEN PAGE ── */
let _genCustomLinkCount=0;
function addGenCustomLink(){
  _genCustomLinkCount++;
  const wrap=document.getElementById('ge-custom-links');
  const div=document.createElement('div');
  div.className='ext-link-custom';
  div.id='ge-custom-'+_genCustomLinkCount;
  div.innerHTML=`
    <div class="ext-link-icon" style="background:var(--surface3);color:var(--text-3)">🔗</div>
    <div class="ext-link-fields">
      <label>Custom Link ${_genCustomLinkCount}</label>
      <input type="url" placeholder="https://...">
    </div>
    <button class="ext-link-remove" onclick="document.getElementById('ge-custom-${_genCustomLinkCount}').remove();showToast('🗑️ Link removed')">
      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>`;
  wrap.appendChild(div);
}

/* ── TECH SPECS ── */
let _modCount=1;
function addModification(){
  _modCount++;
  const id='spec-mod-'+_modCount;
  const container=document.getElementById('ge-specs-container');
  const div=document.createElement('div');
  div.className='spec-modification';div.id=id;
  div.innerHTML=`
    <div class="spec-mod-header">
      <div class="spec-drag-handle" title="Drag to reorder"><svg width="12" height="12" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.5" fill="currentColor"/><circle cx="15" cy="5" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="19" r="1.5" fill="currentColor"/><circle cx="15" cy="19" r="1.5" fill="currentColor"/></svg></div>
      <div style="flex:1">
        <div style="font-size:10px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">Modification</div>
        <input type="text" placeholder="e.g. 3.0 AT 480 hp" style="font-size:14px;font-weight:700;background:transparent;border:none;border-bottom:1px solid var(--border2);border-radius:0;padding:2px 0;color:var(--text);width:100%" onfocus="this.style.borderBottomColor='var(--accent)'" onblur="this.style.borderBottomColor='var(--border2)'">
      </div>
      <div class="actions">
        <button class="btn btn-ghost btn-sm" onclick="addGroupToMod('${id}')">+ Group</button>
        <button class="btn btn-danger btn-sm" onclick="this.closest('.spec-modification').remove();showToast('🗑️ Modification removed')">Remove</button>
      </div>
    </div>
    <div class="spec-groups" id="groups-${id}"></div>`;
  container.appendChild(div);
  makeSortable(document.getElementById('groups-'+id),'.spec-group');
  makeSortable(container,'.spec-modification');
  showToast('✅ New modification added');
}

let _grpCount=10;
function addGroupToMod(modId){
  _grpCount++;
  const grpId='spec-grp-'+_grpCount;
  const container=document.getElementById('groups-'+modId);
  const div=document.createElement('div');
  div.className='spec-group';div.id=grpId;
  div.innerHTML=`
    <div class="spec-group-header">
      <div class="spec-drag-handle spec-drag-handle--sm"><svg width="10" height="10" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.5" fill="currentColor"/><circle cx="15" cy="5" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="19" r="1.5" fill="currentColor"/><circle cx="15" cy="19" r="1.5" fill="currentColor"/></svg></div>
      <input type="text" placeholder="Group name" class="spec-group-name-input" onfocus="this.style.borderBottomColor='var(--accent)'" onblur="this.style.borderBottomColor='var(--border2)'">
      <div class="actions" style="margin-left:auto">
        <button class="btn btn-ghost btn-sm" onclick="addSpecRow(this.closest('.spec-group'))">+ Add row</button>
        <button class="btn btn-danger btn-sm" onclick="this.closest('.spec-group').remove();showToast('🗑️ Group removed')">Remove</button>
      </div>
    </div>
    <div class="spec-rows"></div>`;
  container.appendChild(div);
  makeSortable(div.querySelector('.spec-rows'),'.spec-row');
  showToast('✅ New group added');
}

function addSpecRow(groupEl){
  const rows=groupEl.querySelector('.spec-rows');
  const div=document.createElement('div');
  div.className='spec-row';
  div.setAttribute('draggable','true');
  div.innerHTML=`
    <div class="spec-drag-handle spec-drag-handle--xs"><svg width="9" height="9" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="8" r="1.2" fill="currentColor"/><circle cx="15" cy="8" r="1.2" fill="currentColor"/><circle cx="9" cy="16" r="1.2" fill="currentColor"/><circle cx="15" cy="16" r="1.2" fill="currentColor"/></svg></div>
    <input type="text" placeholder="Characteristic name" class="spec-key">
    <input type="text" placeholder="Value" class="spec-val">
    <button class="spec-row-remove" onclick="this.closest('.spec-row').remove();showToast('🗑️ Row removed')"><svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`;
  rows.appendChild(div);
  div.querySelector('.spec-key').focus();
}

/* ── DRAG TO REORDER ── */
function makeSortable(container, sel){
  if(!container) return;
  let dragged=null;
  container.addEventListener('dragstart',e=>{
    const el=e.target.closest(sel);
    if(!el||!container.contains(el)) return;
    dragged=el; el.style.opacity='.4';
    e.dataTransfer.effectAllowed='move';
  });
  container.addEventListener('dragend',()=>{
    if(dragged){dragged.style.opacity='1';dragged=null;}
    container.querySelectorAll(sel).forEach(el=>el.classList.remove('drag-over'));
  });
  container.addEventListener('dragover',e=>{
    e.preventDefault();
    const target=e.target.closest(sel);
    if(!target||target===dragged||!container.contains(target)) return;
    container.querySelectorAll(sel).forEach(el=>el.classList.remove('drag-over'));
    target.classList.add('drag-over');
    const after=e.clientY>target.getBoundingClientRect().top+target.getBoundingClientRect().height/2;
    if(after) target.after(dragged); else target.before(dragged);
  });
  container.querySelectorAll(sel).forEach(el=>el.setAttribute('draggable','true'));
}

/* ── MEDIA PICKER ── */
let _selectedMedia=null;
function selectMedia(card,name,meta){
  document.querySelectorAll('.media-pick-card').forEach(c=>c.classList.remove('selected'));
  card.classList.add('selected');
  _selectedMedia={name,meta};
  document.getElementById('media-selected-label').textContent='Selected: '+name;
  const btn=document.getElementById('media-confirm-btn');
  btn.disabled=false;btn.style.opacity='1';btn.style.cursor='pointer';
}

function filterMedia(chip,type){
  document.querySelectorAll('.modal .chip').forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');
  showToast('🔍 Filtered: '+(type==='all'?'All files':type));
}

function confirmMedia(){
  if(!_selectedMedia) return;
  closeAllModals();
  showToast('✅ '+_selectedMedia.name+' inserted');
  _selectedMedia=null;
  document.getElementById('media-selected-label').textContent='No file selected';
  const btn=document.getElementById('media-confirm-btn');
  btn.disabled=true;btn.style.opacity='.5';btn.style.cursor='not-allowed';
}

/* ── MODALS ── */
function openModal(name){
  document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
  const m=document.getElementById('modal-'+name);
  if(!m) return;
  m.style.display='';
  document.getElementById('modal-overlay').classList.add('open');
  if(name==='pick-media'){
    _selectedMedia=null;
    document.querySelectorAll('.media-pick-card').forEach(c=>c.classList.remove('selected'));
    const lbl=document.getElementById('media-selected-label');
    if(lbl) lbl.textContent='No file selected';
    const btn=document.getElementById('media-confirm-btn');
    if(btn){btn.disabled=true;btn.style.opacity='.5';btn.style.cursor='not-allowed';}
  }
}

function closeAllModals(){
  document.getElementById('modal-overlay').classList.remove('open');
  setTimeout(()=>document.querySelectorAll('.modal').forEach(m=>m.style.display='none'),200);
}

function closeModal(e){
  if(e.target===document.getElementById('modal-overlay')) closeAllModals();
}

/* ── TOAST ── */
let toastTimer;
function showToast(msg){
  const m=msg.match(/^([^\s]+)\s(.+)$/);
  document.getElementById('toast-icon').textContent=m?m[1]:'ℹ️';
  document.getElementById('toast-text').textContent=m?m[2]:msg;
  const t=document.getElementById('toast');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

/* ── SETTINGS ── */
function toggleMaint(){
  const t=document.getElementById('maint-toggle');
  const w=document.getElementById('maint-warning');
  t.classList.toggle('on');
  w.style.display=t.classList.contains('on')?'':'none';
  showToast(t.classList.contains('on')?'⚠️ Maintenance mode enabled':'✅ Maintenance mode disabled');
}

/* ── THEME ── */
let isLight=false;
function toggleTheme(){
  isLight=!isLight;
  document.documentElement.classList.toggle('light',isLight);
  document.body.classList.toggle('is-light',isLight);
  document.getElementById('theme-dark').classList.toggle('active-opt',!isLight);
  document.getElementById('theme-light').classList.toggle('active-opt',isLight);
  showToast(isLight?'☀️ Light theme enabled':'🌙 Dark theme enabled');
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('theme-dark')?.classList.add('active-opt');
  const specsContainer=document.getElementById('ge-specs-container');
  if(specsContainer){
    makeSortable(specsContainer,'.spec-modification');
    specsContainer.querySelectorAll('.spec-groups').forEach(g=>makeSortable(g,'.spec-group'));
    specsContainer.querySelectorAll('.spec-rows').forEach(r=>makeSortable(r,'.spec-row'));
  }
});
