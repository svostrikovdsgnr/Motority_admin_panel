const titles={dashboard:'Dashboard',landing:'Landing Page Editor',catalog:'Cars Catalog',media:'Media Library',style:'Brand Style',community:'Community',users:'Users & Roles',notifications:'Notifications',history:'Version History',settings:'Settings'};
const navOrder=['dashboard','landing','catalog','media','style','community','users','notifications','history','settings'];

let _prevView='catalog'; // for back navigation

function nav(id){
  navOrder.forEach((n,i)=>document.querySelectorAll('.sb-item')[i]?.classList.remove('active'));
  const idx=navOrder.indexOf(id);
  document.querySelectorAll('.sb-item')[idx]?.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('v-'+id)?.classList.add('active');
  // topbar — normal mode (no breadcrumb)
  document.getElementById('topbar-title').textContent=titles[id]||id;
  document.getElementById('topbar-back').style.display='none';
  document.getElementById('topbar-parent').style.display='none';
  document.getElementById('topbar-sep').style.display='none';
  document.getElementById('topbar-title').style.fontSize='15px';
  _prevView=id;
}

function openModelPage(modelName){
  // hide all views, show model editor
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('v-model-editor').classList.add('active');

  const isNew = modelName==='new';
  const label = isNew ? 'Add Model' : modelName;

  // topbar breadcrumb
  document.getElementById('topbar-back').style.display='flex';
  document.getElementById('topbar-parent').style.display='inline';
  document.getElementById('topbar-parent').textContent='Cars Catalog';
  document.getElementById('topbar-sep').style.display='inline';
  document.getElementById('topbar-title').textContent=label;
  document.getElementById('topbar-title').style.fontSize='14px';

  // highlight sidebar item
  navOrder.forEach((n,i)=>document.querySelectorAll('.sb-item')[i]?.classList.remove('active'));
  document.querySelectorAll('.sb-item')[2]?.classList.add('active'); // catalog index

  // populate fields
  const nameInput = document.getElementById('me-name');
  const yearsInput = document.getElementById('me-years');
  const descInput = document.getElementById('me-desc');
  const metaCard = document.getElementById('me-meta-card');

  if(isNew){
    nameInput.value='';
    yearsInput.value='';
    descInput.value='';
    if(metaCard) metaCard.style.display='none';
  } else {
    const data={
      'BMW M4':{years:'2014 – Present',desc:'The BMW M4 is a high-performance derivative of the 4 Series. Available in Coupe form across multiple generations, powered by the S58 turbocharged inline-six in its current G82 form.'},
      'BMW M3':{years:'1986 – Present',desc:'The BMW M3 is the performance version of the 3 Series, one of the most celebrated sports sedans in automotive history. Six generations spanning nearly four decades.'},
      'BMW X5':{years:'1999 – Present',desc:'The BMW X5 pioneered the Sports Activity Vehicle segment. Now in its fourth generation (G05), it blends luxury and off-road capability with BMW driving dynamics.'},
      'BMW 3 Series':{years:'1975 – Present',desc:'The backbone of the BMW lineup. Eight generations of the 3 Series have defined what a compact executive car should drive like.'},
      'BMW iX':{years:'2021 – Present',desc:'The BMW iX is a fully electric flagship SAV built on a dedicated EV platform, representing the future direction of the brand.'},
    };
    const d=data[modelName]||{years:'',desc:''};
    nameInput.value=modelName;
    yearsInput.value=d.years;
    descInput.value=d.desc;
    if(metaCard) metaCard.style.display='';
  }
}

function navBack(){
  nav('catalog');
}

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

function switchHero(type){
  // tabs
  ['image','video','carousel'].forEach(t=>{
    document.getElementById('htab-'+t)?.classList.toggle('active', t===type);
    const el = document.getElementById('hero-'+t+'-fields') ||
               document.getElementById('hero-carousel-fields');
    if(t==='carousel'){
      document.getElementById('hero-carousel-fields').style.display = type==='carousel'?'':'none';
    } else {
      document.getElementById('hero-'+t+'-fields').style.display = t===type?'':'none';
    }
  });
}

function toggleChip(el){
  el.classList.toggle('active');
}

function removeHeroMedia(id){
  document.getElementById(id).style.display='none';
  showToast('🗑️ Media removed');
}

let _selectedMedia=null;
function selectMedia(card,name,meta){
  document.querySelectorAll('.media-pick-card').forEach(c=>c.classList.remove('selected'));
  card.classList.add('selected');
  _selectedMedia={name,meta};
  document.getElementById('media-selected-label').textContent='Selected: '+name;
  const btn=document.getElementById('media-confirm-btn');
  btn.disabled=false; btn.style.opacity='1'; btn.style.cursor='pointer';
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
  btn.disabled=true; btn.style.opacity='.5'; btn.style.cursor='not-allowed';
}

function switchCatalogTab(tab){
  document.querySelectorAll('#catalog-tabs .tab').forEach((t,i)=>t.classList.toggle('active',(i===0&&tab==='models')||(i===1&&tab==='gen')));
  document.getElementById('catalog-models').style.display=tab==='models'?'':'none';
  document.getElementById('catalog-gen').style.display=tab==='gen'?'':'none';
}

function openModal(name){
  document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
  const m=document.getElementById('modal-'+name);
  if(m){
    m.style.display='';
    document.getElementById('modal-overlay').classList.add('open');
    if(name==='pick-media'){
      // reset selection
      _selectedMedia=null;
      document.querySelectorAll('.media-pick-card').forEach(c=>c.classList.remove('selected'));
      document.getElementById('media-selected-label').textContent='No file selected';
      const btn=document.getElementById('media-confirm-btn');
      btn.disabled=true; btn.style.opacity='.5'; btn.style.cursor='not-allowed';
    }
  }
}

function closeAllModals(){
  document.getElementById('modal-overlay').classList.remove('open');
  setTimeout(()=>document.querySelectorAll('.modal').forEach(m=>m.style.display='none'),200);
}

function closeModal(e){if(e.target===document.getElementById('modal-overlay'))closeAllModals()}

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

function toggleMaint(){
  const t=document.getElementById('maint-toggle');
  const w=document.getElementById('maint-warning');
  t.classList.toggle('on');
  w.style.display=t.classList.contains('on')?'':'none';
  showToast(t.classList.contains('on')?'⚠️ Maintenance mode enabled':'✅ Maintenance mode disabled');
}

let isLight=false;
function toggleTheme(){
  isLight=!isLight;
  document.documentElement.classList.toggle('light',isLight);
  document.body.classList.toggle('is-light',isLight);
  document.getElementById('theme-dark').classList.toggle('active-opt',!isLight);
  document.getElementById('theme-light').classList.toggle('active-opt',isLight);
  showToast(isLight?'☀️ Light theme enabled':'🌙 Dark theme enabled');
}
// init dark as active
document.getElementById('theme-dark').classList.add('active-opt');
