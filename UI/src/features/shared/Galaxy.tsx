import { useEffect, useRef } from 'react';

export function Galaxy() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!; const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w = 0, h = 0, frame = 0, seed = 42;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const stars = Array.from({ length: 1500 }, (_, i) => ({ r: Math.pow(random(), .63), a: i % 3 * Math.PI * 2 / 3, jitter: (random() - .5) * .8, size: .35 + random() * 1.5, alpha: .2 + random() * .8, blue: random() > .6 }));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h); const radius = Math.min(w * .48, h * .48);
      const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, radius * .6);
      glow.addColorStop(0, '#bfffea40'); glow.addColorStop(.14, '#94dec522'); glow.addColorStop(1, '#76c9c000');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
      stars.forEach(s => {
        const a = s.a + s.r * 6.6 + s.jitter + time * .000015;
        const x = w / 2 + Math.cos(a) * s.r * radius; const y = h / 2 + Math.sin(a) * s.r * radius * .73;
        ctx.beginPath(); ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.blue ? `rgba(174,173,234,${s.alpha})` : `rgba(185,238,221,${s.alpha})`;
        ctx.shadowBlur = s.size > 1.5 ? 8 : 0; ctx.shadowColor = '#a1e9d3'; ctx.fill();
      }); ctx.shadowBlur = 0;
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(() => {
      const box = canvas.getBoundingClientRect(); w = box.width; h = box.height;
      const dpr = Math.min(devicePixelRatio, 2); canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    }); observer.observe(canvas); if (!reduced) frame = requestAnimationFrame(draw);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <canvas ref={ref} className="galaxy" aria-hidden="true" />;
}
