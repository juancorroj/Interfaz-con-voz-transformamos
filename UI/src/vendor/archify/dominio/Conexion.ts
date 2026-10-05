import type { IConexion } from './contratos.js';
import type { IdNodo, TipoConexion } from './tipos.js';

export interface PropsConexion {
  readonly desde: IdNodo;
  readonly hasta: IdNodo;
  readonly tipo: TipoConexion;
  readonly etiqueta?: string;
}

/**
 * Relación explícita entre dos nodos.
 *
 * El flujo secuencial del proceso NO se modela aquí: lo expresa el riel vertical
 * que dibuja el layout a partir del orden de las fases. Las conexiones explícitas
 * son solo las que rompen esa secuencia — captura en paralelo y retorno al inicio.
 */
export class Conexion implements IConexion {
  readonly desde: IdNodo;
  readonly hasta: IdNodo;
  readonly tipo: TipoConexion;
  readonly etiqueta?: string;

  constructor(props: PropsConexion) {
    this.desde = props.desde;
    this.hasta = props.hasta;
    this.tipo = props.tipo;
    this.etiqueta = props.etiqueta;
  }
}
