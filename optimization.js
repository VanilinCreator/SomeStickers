window.applySomeStickersOptimization=()=>{
  let prefs={};try{prefs=JSON.parse(localStorage.getItem('SomeStickersSettings')||'{}')||{}}catch(_){prefs={}}
  const level=Math.min(5,Math.max(1,Number(prefs.optimization)||3));
  document.documentElement.dataset.optimization=String(level);
  document.getElementById('someStickersOptimization')?.remove();
  const css={2:'*,*::before,*::after{animation-duration:.85s!important;transition-duration:.18s!important}',3:'*,*::before,*::after{animation-duration:.45s!important;transition-duration:.14s!important}*{scroll-behavior:auto!important}',4:'*,*::before,*::after{animation-duration:.12s!important;transition-duration:.08s!important;scroll-behavior:auto!important}*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important}',5:'*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important}.card:hover,.filter-btn:hover,.icon-btn:hover,.skin-btn:hover{transform:none!important}'};
  if(css[level]){const style=document.createElement('style');style.id='someStickersOptimization';style.textContent=css[level];document.head.appendChild(style)}
};window.applySomeStickersOptimization();