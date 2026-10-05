import { NodoDiagrama } from '../NodoDiagrama.js';
import type { Pista, VarianteNodo } from '../tipos.js';

/**
 * Qué queda en la institución cuando la sesión termina. Cierra el diagrama
 * ocupando los dos carriles: el desenlace no es de la persona ni del sistema,
 * es de la Universidad.
 */
export class ResultadoInstitucional extends NodoDiagrama {
  readonly variante: VarianteNodo = 'resultado';
  readonly pista: Pista = 'persona';
}
