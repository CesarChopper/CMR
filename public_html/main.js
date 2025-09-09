(() => {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let w, h;

  function resize() {
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Configuración de orbs
  const ORB_COUNT = Math.min(48, Math.floor((window.innerWidth * window.innerHeight) / 30000));
  const orbs = [];
  const colors = [
    'rgba(121,201,255,', // azul pastel
    'rgba(145,255,217,', // teal suave
    'rgba(178,139,255,'  // malva
  ];

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createOrb() {
    const radius = rand(80, 200);
    const speed = rand(0.05, 0.18); // muy suave
    const angle = rand(0, Math.PI * 2);
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: rand(-200, w + 200),
      y: rand(-200, h + 200),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: radius,
      alpha: rand(0.05, 0.12),
      color
    };
  }

  function init() {
    orbs.length = 0;
    for (let i = 0; i < ORB_COUNT; i++) orbs.push(createOrb());
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    for (const o of orbs) {
      o.x += o.vx;
      o.y += o.vy;

      // Rebote suave en los bordes con margen
      const margin = 240;
      if (o.x < -margin || o.x > w + margin) o.vx *= -1;
      if (o.y < -margin || o.y > h + margin) o.vy *= -1;

      // Dibujar orb (radial blur)
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, `${o.color}${o.alpha})`);
      g.addColorStop(1, `${o.color}0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(step);
  }

  // Respeto a reduce-motion (también desde CSS ocultamos el canvas)
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function maybeRun() {
    if (mq.matches) return; // no animar
    resize();
    init();
    step();
  }

  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  resize();
  maybeRun();
})();
