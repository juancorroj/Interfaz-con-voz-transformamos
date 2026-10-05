import { NodoDiagrama } from '../NodoDiagrama.js';
import type { EnfasisNodo, Pista, VarianteNodo } from '../tipos.js';

/**
 * Paso humano que, además de consumir tiempo, destruye conocimiento: la
 * digitación contra reloj, el registro que solo guarda el qué. Se dibuja en el
 * carril de la persona porque es trabajo que alguien hace, no una falla técnica.
 */
export class PuntoDeFractura extends NodoDiagrama {
  readonly variante: VarianteNodo = 'fractura';
  readonly pista: Pista = 'persona';

  protected override enfasisPorDefecto(): EnfasisNodo {
    return 'critico';
  }
}
