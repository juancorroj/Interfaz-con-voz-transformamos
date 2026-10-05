import { NodoDiagrama } from '../NodoDiagrama.js';
import type { Pista, VarianteNodo } from '../tipos.js';

/**
 * Un paso que ejecuta una persona. Vive en el carril izquierdo y es el único
 * tipo de nodo que consume tiempo del profesional.
 */
export class EtapaHumana extends NodoDiagrama {
  readonly variante: VarianteNodo = 'etapa';
  readonly pista: Pista = 'persona';
}
