import type { IFaseProceso, INodoDiagrama } from './contratos.js';
import type { Pista } from './tipos.js';

export interface PropsFase {
  readonly id: string;
  readonly nombre: string;
  readonly meta?: string;
  /** Altura proporcional a la duración + eje de minutos. */
  readonly escalaTemporal?: boolean;
  /** Carril que lleva el ritmo de la fase. Por defecto, la persona. */
  readonly carrilPrincipal?: Pista;
  readonly nodos: readonly INodoDiagrama[];
}

/**
 * Tramo del proceso. Solo la fase de la sesión va a escala temporal: es donde
 * el tiempo del profesional es el recurso en disputa y donde la comparación
 * entre los dos diagramas tiene que ser literal.
 */
export class FaseProceso implements IFaseProceso {
  readonly id: string;
  readonly nombre: string;
  readonly meta?: string;
  readonly escalaTemporal: boolean;
  readonly carrilPrincipal: Pista;
  readonly nodos: readonly INodoDiagrama[];

  constructor(props: PropsFase) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.meta = props.meta;
    this.escalaTemporal = props.escalaTemporal ?? false;
    this.carrilPrincipal = props.carrilPrincipal ?? 'persona';
    this.nodos = props.nodos;
  }

  /** Suma de la duración declarada de los nodos del carril de la persona. */
  minutosDePersona(): number {
    return this.nodos
      .filter((nodo) => nodo.pista === 'persona')
      .reduce((total, nodo) => total + (nodo.duracionMinutos ?? 0), 0);
  }
}
