import { TextScramble } from './text-scramble.js';

const EXTRA_HOLD_MS = 400;

const init = () => {
  const el = document.querySelector('.text2');
  if (!el) return;
  el.classList.add('scramble');

  const phrases = ['Liquidity Provision','Treasury Management','Asset Management','Advisory'];
  const fx = new TextScramble(el);
  let i = 0;

  (function next(){
    fx.setText(phrases[i]).then(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const base = reduced ? 1600 : 800;
      setTimeout(next, base + EXTRA_HOLD_MS);
    });
    i = (i + 1) % phrases.length;
  })();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) fx.cancel();
    else fx.setText(phrases[i]);
  });
};

// Si tu charges le script en module avec `defer`, DOM est prêt.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
