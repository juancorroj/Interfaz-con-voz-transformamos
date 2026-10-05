// ==============================================================================
// MODELO DE PROCESO — raíz del agregado
// ==============================================================================
// Es la única pieza que los diagramas concretos construyen. Añadir un proceso
// nuevo (profesores, graduados, aliados, administrativos) es escribir un archivo
// de datos más en `src/diagramas/`: no se toca layout, tema ni renderizadores.
// ==============================================================================

import type {
  IConexion,
  IFaseProceso,
  IModeloProceso,
  INodoDiagrama,
} from './contratos.js';

export interface PropsModeloProceso {
  readonly id: string;
  readonly titulo: string;
  readonly subtitulo?: string;
  readonly fases: readonly IFaseProceso[];
  readonly cierre?: INodoDiagrama;
  readonly conexiones?: readonly IConexion[];
}

export class ModeloProceso implements IModeloProceso {
  readonly id: string;
  readonly titulo: string;
  readonly subtitulo?: string;
  readonly fases: readonly IFaseProceso[];
  readonly cierre?: INodoDiagrama;
  readonly conexiones: readonly IConexion[];

  constructor(props: PropsModeloProceso) {
    this.id = props.id;
    this.titulo = props.titulo;
    this.subtitulo = props.subtitulo;
    this.fases = props.fases;
    this.cierre = props.cierre;
    this.conexiones = props.conexiones ?? [];
    this.validarReferencias();
  }

  nodosEnOrden(): INodoDiagrama[] {
    const nodos = this.fases.flatMap((fase) => [...fase.nodos]);
    if (this.cierre) nodos.push(this.cierre);
    return nodos;
  }

  /** Solo los nodos que declararon datos de simulación, en orden de aparición. */
  pasos(): INodoDiagrama[] {
    return this.nodosEnOrden().filter((nodo) => Boolean(nodo.simulacion));
  }

  /** Minutos de trabajo humano que cuesta el proceso completo. */
  minutosDePersona(): number {
    return this.nodosEnOrden()
      .filter((nodo) => nodo.pista === 'persona')
      .reduce((total, nodo) => total + (nodo.duracionMinutos ?? 0), 0);
  }

  descripcionAccesible(): string {
    const tramos = this.fases.map((fase) => {
      const pasos = fase.nodos
        .map((nodo) => `${nodo.titulo}${nodo.duracionMinutos ? ` (${nodo.duracionMinutos} min)` : ''}`)
        .join('; ');
      return `${fase.nombre}: ${pasos}`;
    });
    if (this.cierre) tramos.push(`Resultado: ${this.cierre.titulo}`);
    return `${this.titulo}. ${tramos.join('. ')}.`;
  }

  /** Falla temprano si un diagrama referencia un nodo inexistente. */
  private validarReferencias(): void {
    const ids = new Set(this.nodosEnOrden().map((nodo) => nodo.id));
    const referencias = [
      ...this.conexiones.flatMap((c) => [c.desde, c.hasta]),
      ...this.nodosEnOrden()
        .map((n) => n.alineadoCon)
        .filter((id): id is string => Boolean(id)),
    ];
    const huerfanas = [...new Set(referencias.filter((id) => !ids.has(id)))];
    if (huerfanas.length > 0) {
      throw new Error(
        `[Archify] El modelo "${this.id}" referencia nodos inexistentes: ${huerfanas.join(', ')}`,
      );
    }
  }
}
