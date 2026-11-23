(() => {
  if (document.getElementById('ssDrawer')) return;

  const style = document.createElement('style');
  style.textContent = `
    #ssMenuButton{position:fixed;top:16px;left:16px;z-index:5002;width:46px;height:46px;border:1px solid var(--line,rgba(148,163,184,.35));border-radius:14px;background:var(--panel-bg,var(--panel,rgba(20,30,50,.92)));color:var(--text,#eef3ff);font-size:25px;line-height:1;cursor:pointer;box-shadow:0 8px 24px #0002;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:grid;place-items:center;transition:transform .2s,background .2s}
    #ssMenuButton:hover{transform:scale(1.05)}
    #ssMenuOverlay{position:fixed;inset:0;background:rgba(2,6,23,.48);z-index:5000;opacity:0;visibility:hidden;transition:opacity .28s,visibility .28s}
    #ssDrawer{position:fixed;inset:0 auto 0 0;width:min(320px,86vw);z-index:5001;padding:20px 16px 20px;background:var(--panel-bg,var(--panel,rgba(15,23,42,.97)));color:var(--text,#eef3ff);border-right:1px solid var(--line,rgba(148,163,184,.25));box-shadow:16px 0 50px #0003;backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);transform:translateX(-105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);display:flex;flex-direction:column;gap:7px;overflow-y:auto;overscroll-behavior:contain}
    body.ss-menu-open{overflow:hidden}
    body.ss-menu-open #ssMenuOverlay{opacity:1;visibility:visible}
    body.ss-menu-open #ssDrawer{transform:translateX(0)}
    #ssDrawerHeader{display:flex;align-items:center;justify-content:space-between;padding:5px 8px 14px;font-size:20px;font-weight:800}
    #ssDrawerBrand{display:flex;align-items:center;gap:9px}
    #ssDrawerClose{border:0;background:transparent;color:inherit;font-size:25px;cursor:pointer;padding:4px 8px;border-radius:9px}
    #ssDrawerProfile{display:flex;align-items:center;gap:12px;margin:0 3px 10px;padding:12px;background:rgba(99,102,241,.10);border:1px solid var(--line,rgba(148,163,184,.2));border-radius:14px;color:inherit;text-decoration:none;min-width:0}
    #ssDrawerAvatar{width:42px;height:42px;border-radius:50%;object-fit:cover;background:rgba(148,163,184,.2);border:1px solid var(--line,rgba(148,163,184,.35));flex-shrink:0}
    #ssDrawerProfileText{min-width:0;display:flex;flex-direction:column;gap:3px}
    #ssDrawerProfileName{font-weight:750;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    #ssDrawerProfileHint{font-size:12px;opacity:.68}
    #ssDrawer a.ss-link{position:relative;display:flex;align-items:center;gap:12px;padding:12px 13px;border-radius:12px;color:inherit;text-decoration:none;font:600 15px system-ui;transition:background .18s,transform .18s;outline-offset:3px}
    #ssDrawer a.ss-link:hover{background:rgba(99,102,241,.12);transform:translateX(3px)}
    #ssDrawer a.ss-link[aria-current=page]{background:rgba(99,102,241,.18)}
    #ssDrawer a.ss-link[aria-current=page]::before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:4px;background:var(--accent,#818cf8)}
    #ssDrawer .ss-divider{height:1px;background:var(--line,rgba(148,163,184,.3));margin:8px 5px}
    #ssDrawer.ss-animating a.ss-link{animation:ssMenuItemIn .32s both;animation-delay:calc(var(--ss-index,0) * 35ms)}
    @keyframes ssMenuItemIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
    @media(max-width:520px){#ssMenuButton{top:12px;left:12px;width:44px;height:44px}#ssDrawer{width:min(340px,88vw);padding-top:16px}}
    @media(prefers-reduced-motion:reduce){#ssDrawer,#ssMenuOverlay,#ssMenuButton,#ssDrawer a.ss-link{transition:none;animation:none!important}}
  `;
  document.head.appendChild(style);

  const button=document.createElement('button');
  button.id='ssMenuButton';button.type='button';button.setAttribute('aria-label','Відкрити меню');button.setAttribute('aria-controls','ssDrawer');button.setAttribute('aria-expanded','false');button.textContent='☰';
  const overlay=document.createElement('div');overlay.id='ssMenuOverlay';overlay.setAttribute('aria-hidden','true');
  const drawer=document.createElement('nav');drawer.id='ssDrawer';drawer.setAttribute('aria-label','Головна навігація');
  drawer.innerHTML=`
    <div id="ssDrawerHeader"><span id="ssDrawerBrand">✨ SomeStickers</span><button id="ssDrawerClose" type="button" aria-label="Закрити меню">✕</button></div>
    <a id="ssDrawerProfile" href="account.html"><img id="ssDrawerAvatar" alt=""><span id="ssDrawerProfileText"><span id="ssDrawerProfileName">Мій профіль</span><span id="ssDrawerProfileHint">Особистий кабінет</span></span></a>
    <a class="ss-link" href="index.html">🏠 Головна</a><div class="ss-divider" role="separator"></div>
    <a class="ss-link" href="sticker-editor.html">🎨 Створити стікер</a>
    <a class="ss-link" href="sticker-sets.html">📦 Мої набори</a>
    <a class="ss-link" href="catalog.html">🛍️ Каталог</a>
    <a class="ss-link" href="telegram.html">✈️ Інтеграція з Telegram</a>
    <a class="ss-link" href="assistant.html">🤖 AI Assistant</a>
    <a class="ss-link" href="changelog.html">📋 Change Log</a>
    <div class="ss-divider" role="separator"></div>
    <a class="ss-link" href="settings.html">⚙️ Налаштування</a>
    <a class="ss-link" href="account.html">👤 Особистий кабінет</a>`;
  document.body.append(button,overlay,drawer);

  const profileLink=drawer.querySelector('#ssDrawerProfile');
  const profileName=drawer.querySelector('#ssDrawerProfileName');
  const avatar=drawer.querySelector('#ssDrawerAvatar');
  const fallbackAvatar='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="#273653"/><text x="50" y="65" font-size="48" text-anchor="middle">👤</text></svg>');
  try{
    const profile=JSON.parse(localStorage.getItem('SomeStickersProfile')||'{}')||{};
    profileName.textContent=profile.name||'Мій профіль';
    avatar.src=profile.avatar||fallbackAvatar;
    avatar.alt=profile.name?'Аватар '+profile.name:'Аватар профілю';
  }catch(_){avatar.src=fallbackAvatar;}

  const links=Array.from(drawer.querySelectorAll('a.ss-link'));
  const currentPath=location.pathname.split('/').pop()||'index.html';
  links.forEach((link,index)=>{
    link.style.setProperty('--ss-index',index);
    if(link.getAttribute('href')===currentPath)link.setAttribute('aria-current','page');
  });

  const close=()=>{
    document.body.classList.remove('ss-menu-open');
    button.setAttribute('aria-expanded','false');
    button.focus();
  };
  const open=()=>{
    document.body.classList.add('ss-menu-open');
    button.setAttribute('aria-expanded','true');
    drawer.classList.remove('ss-animating');
    void drawer.offsetWidth;
    drawer.classList.add('ss-animating');
    const saved=Number(sessionStorage.getItem('ssDrawerScrollTop')||0);
    drawer.scrollTop=Number.isFinite(saved)?saved:0;
    drawer.querySelector('#ssDrawerClose').focus();
  };
  button.addEventListener('click',()=>document.body.classList.contains('ss-menu-open')?close():open());
  overlay.addEventListener('click',close);
  drawer.querySelector('#ssDrawerClose').addEventListener('click',close);
  drawer.addEventListener('scroll',()=>sessionStorage.setItem('ssDrawerScrollTop',String(drawer.scrollTop)),{passive:true});
  links.forEach(link=>link.addEventListener('click',()=>sessionStorage.setItem('ssDrawerScrollTop','0')));
  document.addEventListener('keydown',event=>{
    if(!document.body.classList.contains('ss-menu-open'))return;
    if(event.key==='Escape'){event.preventDefault();close();return;}
    if(event.key==='ArrowDown'||event.key==='ArrowUp'||event.key==='Home'||event.key==='End'){
      const items=[drawer.querySelector('#ssDrawerClose'),profileLink,...links];
      const current=items.indexOf(document.activeElement);
      let next=current;
      if(event.key==='Home')next=0;
      else if(event.key==='End')next=items.length-1;
      else if(event.key==='ArrowDown')next=(current+1+items.length)%items.length;
      else next=(current-1+items.length)%items.length;
      event.preventDefault();items[next].focus();
    }
  });
})();