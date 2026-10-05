import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import './ui.css';

interface StatTileProps {
  value: string;
  label: string;
  detail?: string;
}

/** Cifra destacada. Si el valor es numérico, cuenta hasta él al entrar en pantalla. */
export function StatTile({ value, label, detail }: StatTileProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const reduced = useReducedMotion();
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const [shown, setShown] = useState(target === null || reduced ? value : '0');

  useEffect(() => {
    if (!inView || target === null || reduced) return;
    const controls = animate(0, target, { duration: 1.1, ease: [0.22, 1, 0.36, 1], onUpdate: v => setShown(String(Math.round(v))) });
    return () => controls.stop();
  }, [inView, target, reduced]);

  return <article className="ui-stat" ref={ref}>
    <strong aria-label={value}>{shown}</strong>
    <span>{label}</span>
    {detail && <small>{detail}</small>}
  </article>;
}
