/* SomeStickers 1.2 — apply saved global PRO appearance preferences */
(()=> {
  try {
    const raw=localStorage.getItem('SomeStickersSettings');
    const prefs=raw?JSON.parse(raw):{};
    const accents=['violet','blue','green','orange','pink'];
    const density=['comfortable','compact'];
    document.documentElement.dataset.accent=accents.includes(prefs.accent)?prefs.accent:'violet';
    document.documentElement.dataset.density=density.includes(prefs.density)?prefs.density:'comfortable';
  } catch (error) {
    document.documentElement.dataset.accent='violet';
    document.documentElement.dataset.density='comfortable';
  }
})();
