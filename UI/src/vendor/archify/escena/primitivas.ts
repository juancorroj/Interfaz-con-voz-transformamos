// ==============================================================================
// PRIMITIVAS DE ESCENA (frontera entre layout y renderizado)
// ==============================================================================
// El layout no dibuja: produce primitivas ya resueltas geométricamente (texto
// dividido en líneas incluido). Los renderizadores no calculan: solo traducen.
// Esa frontera es lo que permite pintar el MISMO diagrama en React y en el
// mockup vanilla sin duplicar lógica (DIP).
// ==============================================================================

export type AnclajeTexto = 'inicio' | 'medio' | 'fin';

interface PrimitivaBase {
  readonly clave: string;
}

export interface PrimitivaRect extends PrimitivaBase {
  readonly tipo: 'rect';
  readonly x: number;
  readonly y: number;
  readonly ancho: number;
  readonly alto: number;
  readonly radio: number;
  readonly relleno?: string;
  readonly borde?: string;
  readonly grosorBorde?: number;
  readonly guiones?: string;
  readonly opacidad?: number;
}

export interface PrimitivaCirculo extends PrimitivaBase {
  readonly tipo: 'circulo';
  readonly cx: number;
  readonly cy: number;
  readonly radio: number;
  readonly relleno?: string;
  readonly borde?: string;
  readonly grosorBorde?: number;
  readonly opacidad?: number;
}

export interface PrimitivaRuta extends PrimitivaBase {
  readonly tipo: 'ruta';
  readonly d: string;
  readonly color?: string;
  readonly grosor?: number;
  readonly guiones?: string;
  readonly relleno?: string;
  readonly opacidad?: number;
}

export interface PrimitivaTexto extends PrimitivaBase {
  readonly tipo: 'texto';
  readonly x: number;
  /** Línea base de la PRIMERA línea. */
  readonly y: number;
  readonly lineas: readonly string[];
  readonly alturaLinea: number;
  readonly tamano: number;
  readonly peso: number;
  readonly color: string;
  readonly anclaje: AnclajeTexto;
  readonly espaciadoLetras?: number;
  readonly opacidad?: number;
  readonly rotacion?: number;
}

/**
 * Agrupa las primitivas de un nodo y les cuelga metadatos (`data-*`).
 *
 * Es lo que permite que la simulación exista sin volver a calcular el diagrama:
 * el reproductor solo cambia `data-estado` sobre estos grupos y el CSS anima.
 */
export interface PrimitivaGrupo extends PrimitivaBase {
  readonly tipo: 'grupo';
  readonly datos?: Readonly<Record<string, string | number>>;
  readonly hijos: readonly Primitiva[];
}

export type Primitiva =
  | PrimitivaRect
  | PrimitivaCirculo
  | PrimitivaRuta
  | PrimitivaTexto
  | PrimitivaGrupo;

export interface EscenaDiagrama {
  readonly ancho: number;
  readonly alto: number;
  readonly descripcionAccesible: string;
  readonly primitivas: readonly Primitiva[];
}
