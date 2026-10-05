// ==============================================================================
// VOCABULARIO DEL DOMINIO DE DIAGRAMAS DE PROCESO
// Ecosistema: ResonancIA — Universidad de La Sabana
// ==============================================================================

export type IdNodo = string;

/**
 * Carril al que pertenece un nodo. Es la decisión visual más importante del
 * diagrama: separar lo que hace una persona de lo que queda en el sistema hace
 * visible, sin una sola palabra, dónde está el vacío del proceso actual.
 */
export type Pista = 'persona' | 'sistema';

export type VarianteNodo =
  /** Un paso que ejecuta una persona. */
  | 'etapa'
  /** Un paso donde el proceso pierde conocimiento, tiempo o trazabilidad. */
  | 'fractura'
  /** Actividad que ocurre en el sistema, en paralelo a la conversación. */
  | 'sistema'
  /** Un punto donde el proceso se abre a dos desenlaces posibles. */
  | 'bifurcacion'
  /** El desenlace institucional del proceso completo. */
  | 'resultado';

export type EnfasisNodo = 'neutral' | 'critico' | 'positivo';

/** Única relación explícita: el conocimiento que vuelve al inicio del ciclo. */
export type TipoConexion = 'retorno';

export type DensidadDiagrama = 'compacta' | 'comoda';

/** Estado de un nodo durante la simulación. Lo consume el CSS por atributo. */
export type EstadoNodo = 'pendiente' | 'activo' | 'visto';

export interface Caja {
  readonly x: number;
  readonly y: number;
  readonly ancho: number;
  readonly alto: number;
}

export const centroVertical = (caja: Caja): number => caja.y + caja.alto / 2;
export const bordeDerecho = (caja: Caja): number => caja.x + caja.ancho;
export const bordeInferior = (caja: Caja): number => caja.y + caja.alto;
