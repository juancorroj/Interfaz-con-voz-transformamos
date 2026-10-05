import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  value: number;
  className?: string;
}

/** Número que cuenta hasta su valor al entrar en pantalla, con separador de miles en español de Colombia. */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);
  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, { duration: 1.3, ease: [0.22, 1, 0.36, 1], onUpdate: v => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value, reduced]);
  return <span ref={ref} className={className} aria-label={value.toLocaleString('es-CO')}>{shown.toLocaleString('es-CO')}</span>;
}
