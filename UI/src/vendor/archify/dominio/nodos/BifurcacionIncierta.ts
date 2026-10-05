import { NodoDiagrama, type PropsNodo } from '../NodoDiagrama.js';
import type { INodoBifurcacion, Rama } from '../contratos.js';
import type { EnfasisNodo, Pista } from '../tipos.js';

export interface PropsBifurcacion extends PropsNodo {
  readonly ramas: readonly Rama[];
}

/**
 * Punto donde el proceso deja de ser un proceso y pasa a depender de la suerte
 * o de la voluntad de alguien: la realimentación que o se olvida, o cuesta un
 * tiempo que nadie presupuestó.
 *
 * Se dibuja como una horquilla con sus dos desenlaces, no como una caja más:
 * la incertidumbre tiene que verse, no leerse.
 */
export class BifurcacionIncierta extends NodoDiagrama implements INodoBifurcacion {
  readonly variante = 'bifurcacion' as const;
  readonly pista: Pista = 'persona';
  readonly ramas: readonly Rama[];

  constructor(props: PropsBifurcacion) {
    super(props);
    this.ramas = props.ramas;
  }

  protected override enfasisPorDefecto(): EnfasisNodo {
    return 'critico';
  }
}
