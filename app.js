const titles={dashboard:'Dashboard',landing:'Landing Page Editor',catalog:'Cars Catalog',media:'Media Library',style:'Brand Style',community:'Community',users:'Users & Roles',notifications:'Notifications',history:'Version History',settings:'Settings'};
const navOrder=['dashboard','landing','catalog','media','style','community','users','notifications','history','settings'];

function nav(id){
  navOrder.forEach((n,i)=>document.querySelectorAll('.sb-item')[i]?.classList.remove('active'));
  const idx=navOrder.indexOf(id);
  document.querySelectorAll('.sb-item')[idx]?.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('v-'+id)?.classList.add('active');
  document.getElementById('topbar-title').textContent=titles[id]||id;
}

function switchHero(type){
  const isImg=type==='image';
  document.getElementById('hero-image-fields').style.display=isImg?'':'none';
  document.getElementById('hero-video-fields').style.display=isImg?'none':'';
  document.getElementById('hero-img-btn').classList.toggle('active',isImg);
  document.getElementById('hero-vid-btn').classList.toggle('active',!isImg);
}

function switchCatalogTab(tab){
  document.querySelectorAll('#catalog-tabs .tab').forEach((t,i)=>t.classList.toggle('active',(i===0&&tab==='models')||(i===1&&tab==='gen')));
  document.getElementById('catalog-models').style.display=tab==='models'?'':'none';
  document.getElementById('catalog-gen').style.display=tab==='gen'?'':'none';
}

function openModal(name){
  document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
  const m=document.getElementById('modal-'+name);
  if(m){m.style.display='';document.getElementById('modal-overlay').classList.add('open')}
}

function closeAllModals(){
  document.getElementById('modal-overlay').classList.remove('open');
  setTimeout(()=>document.querySelectorAll('.modal').forEach(m=>m.style.display='none'),200);
}

function closeModal(e){if(e.target===document.getElementById('modal-overlay'))closeAllModals()}

function openModelEditor(name){
  openModal('add-model');
  setTimeout(()=>{
    document.getElementById('model-modal-title').textContent='Edit Model — '+name;
    document.getElementById('model-name-input').value=name;
  },50);
}

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
