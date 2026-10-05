// ==============================================================================
// MEDIDOR DE TEXTO APROXIMADO
// ==============================================================================
// Estima el ancho de una cadena a partir de una tabla de anchos relativos por
// carácter, sin tocar el DOM ni un canvas.
//
// ¿Por qué aproximado y no `measureText`? Porque el layout debe poder calcularse
// antes del primer pintado, en Node y en pruebas. Es la implementación por
// defecto de `IMedidorTexto`; si algún día hace falta precisión tipográfica
// exacta, se inyecta otra implementación y nada más cambia (DIP).
// ==============================================================================

import type { IMedidorTexto } from '../dominio/contratos.js';

const ANCHO_ESTRECHO = 0.30;
const ANCHO_ANGOSTO = 0.42;
const ANCHO_ANCHO = 0.86;
const ANCHO_BASE = 0.535;

const CARACTERES_ESTRECHOS = new Set([...'iljtfrI.,:;!|\'’`()[]{}- ']);
const CARACTERES_ANGOSTOS = new Set([...'sczJ1']);
const CARACTERES_ANCHOS = new Set([...'mwMW@%']);

export class MedidorTextoAproximado implements IMedidorTexto {
  /** Corrección por peso: las negritas ocupan algo más que la regular. */
  private factorDePeso(peso: number): number {
    return peso >= 600 ? 1.045 : 1;
  }

  anchoDe(texto: string, tamano: number, peso: number): number {
    let unidades = 0;
    for (const caracter of texto) {
      if (CARACTERES_ESTRECHOS.has(caracter)) unidades += ANCHO_ESTRECHO;
      else if (CARACTERES_ANGOSTOS.has(caracter)) unidades += ANCHO_ANGOSTO;
      else if (CARACTERES_ANCHOS.has(caracter)) unidades += ANCHO_ANCHO;
      else if (caracter === caracter.toUpperCase() && caracter !== caracter.toLowerCase())
        unidades += ANCHO_BASE * 1.16;
      else unidades += ANCHO_BASE;
    }
    return unidades * tamano * this.factorDePeso(peso);
  }

  dividirEnLineas(
    texto: string,
    anchoMaximo: number,
    tamano: number,
    peso: number,
  ): string[] {
    const palabras = texto.split(/\s+/).filter(Boolean);
    if (palabras.length === 0) return [];

    const lineas: string[] = [];
    let actual = '';

    for (const palabra of palabras) {
      const tentativa = actual ? `${actual} ${palabra}` : palabra;
      if (this.anchoDe(tentativa, tamano, peso) <= anchoMaximo || !actual) {
        actual = tentativa;
      } else {
        lineas.push(actual);
        actual = palabra;
      }
    }
    if (actual) lineas.push(actual);
    return lineas;
  }
}
