// ==============================================================================
// NODO DE DIAGRAMA — clase base abstracta
// ==============================================================================
// SRP: un nodo solo conoce su propio contenido y su duración.
// LSP: cualquier subclase puede ocupar el lugar de otra en el layout; lo que
//      varía es su `variante` (color) y su `pista` (carril).
// ==============================================================================

import type { DatosSimulacion, INodoDiagrama } from './contratos.js';
import type { EnfasisNodo, IdNodo, Pista, VarianteNodo } from './tipos.js';

export interface PropsNodo {
  readonly id: IdNodo;
  readonly titulo: string;
  readonly meta?: string;
  readonly detalle?: string;
  readonly enfasis?: EnfasisNodo;
  readonly duracionMinutos?: number;
  readonly alineadoCon?: IdNodo;
  readonly simulacion?: DatosSimulacion;
}

export abstract class NodoDiagrama implements INodoDiagrama {
  readonly id: IdNodo;
  readonly titulo: string;
  readonly meta?: string;
  readonly detalle?: string;
  readonly enfasis: EnfasisNodo;
  readonly duracionMinutos?: number;
  readonly alineadoCon?: IdNodo;
  readonly simulacion?: DatosSimulacion;

  constructor(props: PropsNodo) {
    this.id = props.id;
    this.titulo = props.titulo;
    this.meta = props.meta;
    this.detalle = props.detalle;
    this.enfasis = props.enfasis ?? this.enfasisPorDefecto();
    this.duracionMinutos = props.duracionMinutos;
    this.alineadoCon = props.alineadoCon;
    this.simulacion = props.simulacion;
  }

  abstract readonly variante: VarianteNodo;
  abstract readonly pista: Pista;

  protected enfasisPorDefecto(): EnfasisNodo {
    return 'neutral';
  }

  describir(): string {
    const duracion = this.duracionMinutos ? `${this.duracionMinutos} minutos` : undefined;
    return [this.meta, this.titulo, duracion, this.detalle].filter(Boolean).join('. ');
  }
}
