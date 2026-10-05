// ==============================================================================
// REGISTRO DE DIAGRAMAS
// ==============================================================================
// Catálogo de diagramas disponibles por identificador. Añadir el proceso de
// profesores, graduados, aliados o administrativos es agregar una entrada aquí
// y su archivo de datos: ni el layout, ni el tema, ni los adaptadores cambian.
// ==============================================================================

import type { IModeloProceso, IProveedorTema } from '../dominio/contratos.js';
import { temaFractura, temaResonancia } from '../tema/temas.js';
import { procesoActual } from './procesoActual.js';
import { procesoResonancia } from './procesoResonancia.js';

export interface DefinicionDiagrama {
  readonly id: string;
  readonly etiqueta: string;
  readonly modelo: IModeloProceso;
  readonly tema: IProveedorTema;
}

export const REGISTRO_DIAGRAMAS: Readonly<Record<string, DefinicionDiagrama>> = {
  'proceso-actual': {
    id: 'proceso-actual',
    etiqueta: 'Proceso actual',
    modelo: procesoActual,
    tema: temaFractura,
  },
  'proceso-resonancia': {
    id: 'proceso-resonancia',
    etiqueta: 'Con ResonancIA',
    modelo: procesoResonancia,
    tema: temaResonancia,
  },
};

export function obtenerDiagrama(id: string): DefinicionDiagrama {
  const definicion = REGISTRO_DIAGRAMAS[id];
  if (!definicion) {
    throw new Error(
      `[Archify] No existe el diagrama "${id}". Disponibles: ${Object.keys(
        REGISTRO_DIAGRAMAS,
      ).join(', ')}`,
    );
  }
  return definicion;
}

export { procesoActual } from './procesoActual.js';
export { procesoResonancia } from './procesoResonancia.js';
