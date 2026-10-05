// ==============================================================================
// ADAPTADOR REACT
// ==============================================================================
// Recorre las mismas primitivas que el renderizador SVG, pero emitiendo JSX.
// No recalcula nada: si el diagrama cambia, cambia en el modelo, no aquí.
//
// `estadoPorNodo` conecta la simulación: el componente solo escribe el atributo
// y el CSS se encarga del resto, igual que en el mockup.
// ==============================================================================

import { useMemo, type CSSProperties, type ReactElement } from 'react';
import { servicioDiagramas, type ServicioDiagramas } from '../aplicacion/ServicioDiagramas.js';
import type { DensidadDiagrama, EstadoNodo } from '../dominio/tipos.js';
import type {
  EscenaDiagrama,
  Primitiva,
  PrimitivaCirculo,
  PrimitivaGrupo,
  PrimitivaRect,
  PrimitivaRuta,
  PrimitivaTexto,
} from '../escena/primitivas.js';

const ANCLAJES = { inicio: 'start', medio: 'middle', fin: 'end' } as const;

export interface PropsDiagramaProceso {
  /** Identificador del registro: 'proceso-actual' | 'proceso-resonancia' | … */
  readonly idDiagrama: string;
  readonly ancho?: number;
  readonly densidad?: DensidadDiagrama;
  readonly pixelesPorMinuto?: number;
  /** Estado de simulación por nodo; normalmente viene de `usarSimulacion`. */
  readonly estadoPorNodo?: Readonly<Record<string, EstadoNodo>>;
  readonly onNodoClick?: (idNodo: string) => void;
  readonly className?: string;
  readonly style?: CSSProperties;
  /** Permite inyectar otro servicio (otro layout, otro tema) en pruebas. */
  readonly servicio?: ServicioDiagramas;
}

export function DiagramaProceso({
  idDiagrama,
  ancho,
  densidad,
  pixelesPorMinuto,
  estadoPorNodo,
  onNodoClick,
  className,
  style,
  servicio = servicioDiagramas,
}: PropsDiagramaProceso): ReactElement {
  const escena: EscenaDiagrama = useMemo(
    () => servicio.escena(idDiagrama, { ancho, densidad, pixelesPorMinuto }),
    [servicio, idDiagrama, ancho, densidad, pixelesPorMinuto],
  );

  const simulando = Boolean(estadoPorNodo && Object.keys(estadoPorNodo).length > 0);

  return (
    <svg
      viewBox={`0 0 ${escena.ancho} ${escena.alto}`}
      preserveAspectRatio="xMidYMin meet"
      role="img"
      aria-label={escena.descripcionAccesible}
      className={[className, simulando ? 'simulando' : null].filter(Boolean).join(' ')}
      style={{ display: 'block', width: '100%', height: 'auto', ...style }}
    >
      {escena.primitivas.map((p) => dibujar(p, estadoPorNodo, onNodoClick))}
    </svg>
  );
}

function dibujar(
  primitiva: Primitiva,
  estados?: Readonly<Record<string, EstadoNodo>>,
  onNodoClick?: (idNodo: string) => void,
): ReactElement | null {
  switch (primitiva.tipo) {
    case 'grupo':
      return dibujarGrupo(primitiva, estados, onNodoClick);
    case 'rect':
      return dibujarRect(primitiva);
    case 'circulo':
      return dibujarCirculo(primitiva);
    case 'ruta':
      return dibujarRuta(primitiva);
    case 'texto':
      return dibujarTexto(primitiva);
    default:
      return null;
  }
}

function dibujarGrupo(
  p: PrimitivaGrupo,
  estados?: Readonly<Record<string, EstadoNodo>>,
  onNodoClick?: (idNodo: string) => void,
): ReactElement {
  const datos = { ...(p.datos ?? {}) } as Record<string, string | number>;
  const idNodo = String(datos['data-nodo'] ?? '');
  const anclaA = String(datos['data-alineado'] ?? '');

  if (idNodo && estados) {
    // Un nodo anclado no es un paso: hereda el estado de la etapa que acompaña.
    datos['data-estado'] = estados[idNodo] ?? (anclaA ? estados[anclaA] : undefined) ?? 'pendiente';
  }

  return (
    <g
      key={p.clave}
      {...datos}
      onClick={idNodo && onNodoClick ? () => onNodoClick(idNodo) : undefined}
    >
      {p.hijos.map((hijo) => dibujar(hijo, estados, onNodoClick))}
    </g>
  );
}

function dibujarRect(p: PrimitivaRect): ReactElement {
  return (
    <rect
      key={p.clave}
      x={p.x}
      y={p.y}
      width={p.ancho}
      height={p.alto}
      rx={p.radio}
      fill={p.relleno ?? 'none'}
      stroke={p.borde}
      strokeWidth={p.grosorBorde}
      strokeDasharray={p.guiones}
      opacity={p.opacidad}
    />
  );
}

function dibujarCirculo(p: PrimitivaCirculo): ReactElement {
  return (
    <circle
      key={p.clave}
      cx={p.cx}
      cy={p.cy}
      r={p.radio}
      fill={p.relleno ?? 'none'}
      stroke={p.borde}
      strokeWidth={p.grosorBorde}
      opacity={p.opacidad}
    />
  );
}

function dibujarRuta(p: PrimitivaRuta): ReactElement {
  return (
    <path
      key={p.clave}
      d={p.d}
      fill={p.relleno ?? 'none'}
      stroke={p.color}
      strokeWidth={p.grosor}
      strokeDasharray={p.guiones}
      opacity={p.opacidad}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function dibujarTexto(p: PrimitivaTexto): ReactElement {
  return (
    <text
      key={p.clave}
      x={p.x}
      y={p.y}
      fontSize={p.tamano}
      fontWeight={p.peso}
      fill={p.color}
      textAnchor={ANCLAJES[p.anclaje]}
      letterSpacing={p.espaciadoLetras}
      opacity={p.opacidad}
      transform={p.rotacion ? `rotate(${p.rotacion} ${p.x} ${p.y})` : undefined}
    >
      {p.lineas.map((linea, indice) => (
        <tspan key={`${p.clave}-${indice}`} x={p.x} dy={indice === 0 ? 0 : p.alturaLinea}>
          {linea}
        </tspan>
      ))}
    </text>
  );
}
