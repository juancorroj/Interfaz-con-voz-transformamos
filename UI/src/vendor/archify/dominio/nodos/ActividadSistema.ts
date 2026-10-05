import { NodoDiagrama } from '../NodoDiagrama.js';
import type { Pista, VarianteNodo } from '../tipos.js';

/**
 * Lo que ocurre en el sistema mientras —o después de que— la persona trabaja.
 * Vive en el carril derecho y nunca consume tiempo del profesional: esa es
 * exactamente la diferencia que el diagrama tiene que dejar ver.
 *
 * En el proceso actual este carril está casi vacío. No hace falta decirlo.
 */
export class ActividadSistema extends NodoDiagrama {
  readonly variante: VarianteNodo = 'sistema';
  readonly pista: Pista = 'sistema';
}
