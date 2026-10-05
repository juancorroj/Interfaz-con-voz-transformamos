import { motion, useReducedMotion } from 'motion/react';
import './charts.css';

interface RangeBarProps {
  min: number;
  max: number;
  /** Texto accesible; por defecto "Entre min % y max %". */
  label?: string;
}

/** Barra de 0 a 100 % con un rango resaltado que se dibuja al entrar en pantalla. */
export function RangeBar({ min, max, label }: RangeBarProps) {
  const reduced = useReducedMotion();
  const fill = { left: `${min}%`, width: `${max - min}%` };
  return <div className="rangebar" role="img" aria-label={label ?? `Entre ${min} % y ${max} %`}>
    {reduced
      ? <span className="rangebar-fill" style={fill} />
      : <motion.span className="rangebar-fill" style={{ ...fill, originX: 0 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />}
    <span className="rangebar-ticks"><i>0 %</i><i>50 %</i><i>100 %</i></span>
  </div>;
}
