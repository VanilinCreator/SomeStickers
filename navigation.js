(() => {
  if (document.getElementById('ssDrawer')) return;
  const style = document.createElement('style');
  style.textContent = `
    #ssMenuButton{position:fixed;top:16px;left:16px;z-index:5002;width:46px;height:46px;border:1px solid var(--line,rgba(148,163,184,.35));border-radius:14px;background:var(--panel-bg,var(--panel,rgba(20,30,50,.92)));color:var(--text,#eef3ff);font-size:25px;line-height:1;cursor:pointer;box-shadow:0 8px 24px #0002;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:grid;place-items:center;transition:transform .2s,background .2s}
    #ssMenuButton:hover{transform:scale(1.05)}
    #ssMenuOverlay{position:fixed;inset:0;background:rgba(2,6,23,.48);z-index:5000;opacity:0;visibility:hidden;transition:opacity .28s,visibility .28s}
    #ssDrawer{position:fixed;inset:0 auto 0 0;width:min(320px,86vw);z-index:5001;padding:24px 16px 20px;background:var(--panel-bg,var(--panel,rgba(15,23,42,.97)));color:var(--text,#eef3ff);border-right:1px solid var(--line,rgba(148,163,184,.25));box-shadow:16px 0 50px #0003;backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);transform:translateX(-105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);display:flex;flex-direction:column;gap:7px;overflow-y:auto}
    body.ss-menu-open #ssMenuOverlay{opacity:1;visibility:visible}
    body.ss-menu-open #ssDrawer{transform:translateX(0)}
    #ssDrawerHeader{display:flex;align-items:center;justify-content:space-between;padding:8px 8px 18px;font-size:20px;font-weight:800}
    #ssDrawerClose{border:0;background:transparent;color:inherit;font-size:25px;cursor:pointer;padding:4px 8px;border-radius:9px}
    #ssDrawer a{display:flex;align-items:center;gap:12px;padding:12px 13px;border-radius:12px;color:inherit;text-decoration:none;font:600 15px system-ui;transition:background .18s,transform .18s}
    #ssDrawer a:hover,#ssDrawer a[aria-current=page]{background:rgba(99,102,241,.15);transform:translateX(3px)}
    #ssDrawer .ss-divider{height:1px;background:var(--line,rgba(148,163,184,.3));margin:8px 5px}
    @media(prefers-reduced-motion:reduce){#ssDrawer,#ssMenuOverlay,#ssMenuButton{transition:none}}
  `;
  document.head.appendChild(style);
  const button=document.createElement('button');
  button.id='ssMenuButton';button.type='button';button.setAttribute('aria-label','Відкрити меню');button.setAttribute('aria-controls','ssDrawer');button.setAttribute('aria-expanded','false');button.textContent='☰';
  const overlay=document.createElement('div');overlay.id='ssMenuOverlay';overlay.setAttribute('aria-hidden','true');
  const drawer=document.createElement('nav');drawer.id='ssDrawer';drawer.setAttribute('aria-label','Головна навігація');
  drawer.innerHTML=`
    <div id="ssDrawerHeader"><span>✨ SomeStickers</span><button id="ssDrawerClose" type="button" aria-label="Закрити меню">✕</button></div>
    <a href="index.html">🏠 Головна</a><div class="ss-divider" role="separator"></div>
    <a href="sticker-editor.html">🎨 Створити стікер</a><a href="sticker-sets.html">📦 Мої набори</a>
    <a href="catalog.html">🛍️ Каталог</a><a href="telegram.html">✈️ Інтеграція з Telegram</a>
    <a href="assistant.html">🤖 AI Assistant</a><a href="changelog.html">📋 Change Log</a>
    <div class="ss-divider" role="separator"></div><a href="settings.html">⚙️ Налаштування</a>
    <a href="account.html">👤 Особистий кабінет</a>`;
  document.body.append(button,overlay,drawer);
  const close=()=>{document.body.classList.remove('ss-menu-open');button.setAttribute('aria-expanded','false')};
  const open=()=>{document.body.classList.add('ss-menu-open');button.setAttribute('aria-expanded','true')};
  button.addEventListener('click',()=>document.body.classList.contains('ss-menu-open')?close():open());
  overlay.addEventListener('click',close);drawer.querySelector('#ssDrawerClose').addEventListener('click',close);
  drawer.querySelectorAll('a').forEach(a=>{if(a.pathname===location.pathname)a.setAttribute('aria-current','page');a.addEventListener('click',close)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();