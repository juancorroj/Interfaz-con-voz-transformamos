// ==============================================================================
// MÉTRICAS DEL LIENZO
// ==============================================================================
// Todas las constantes geométricas viven aquí, derivadas del ancho y la
// densidad. Ajustar el aire del diagrama es cambiar este archivo; el algoritmo
// de trazado no se toca.
//
// Reparto horizontal del lienzo:
//   [ eje de minutos ][ carril PERSONA ][ carril SISTEMA ][ retorno ]
// ==============================================================================

import type { OpcionesLayout } from '../dominio/contratos.js';
import type { DensidadDiagrama } from '../dominio/tipos.js';

const ANCHO_POR_DEFECTO = 540;
const PIXELES_POR_MINUTO = 11;

interface EscalaTipografica {
  readonly tamTitulo: number;
  readonly altoLineaTitulo: number;
  readonly tamDetalle: number;
  readonly altoLineaDetalle: number;
  readonly tamMeta: number;
  readonly altoMeta: number;
  readonly padX: number;
  readonly padY: number;
  readonly gapNodo: number;
  readonly gapFase: number;
}

const ESCALAS: Record<DensidadDiagrama, EscalaTipografica> = {
  compacta: {
    tamTitulo: 12.6,
    altoLineaTitulo: 15.6,
    tamDetalle: 10.6,
    altoLineaDetalle: 13.6,
    tamMeta: 8.6,
    altoMeta: 11.6,
    padX: 12,
    padY: 10,
    gapNodo: 7,
    gapFase: 16,
  },
  comoda: {
    tamTitulo: 14,
    altoLineaTitulo: 17.5,
    tamDetalle: 11.8,
    altoLineaDetalle: 15.4,
    tamMeta: 9.4,
    altoMeta: 13,
    padX: 15,
    padY: 12,
    gapNodo: 9,
    gapFase: 20,
  },
};

export class Metricas {
  readonly ancho: number;
  readonly densidad: DensidadDiagrama;
  readonly pixelesPorMinuto: number;

  // --- Reparto horizontal -----------------------------------------------
  /** Eje vertical de minutos. */
  readonly ejeX = 30;
  readonly personaX = 44;
  readonly anchoPersona: number;
  readonly sistemaX: number;
  readonly anchoSistema: number;
  /** Corredor exterior para la flecha de retorno. */
  readonly carrilRetorno: number;
  readonly margenDerecho = 16;
  readonly gapCarriles = 12;
  /** Proporción del espacio de carriles que ocupa el de la persona. */
  readonly proporcionPersona = 0.63;

  // --- Tarjeta -----------------------------------------------------------
  readonly radio = 9;
  readonly gapTituloDetalle = 4;
  readonly pesoTitulo = 650;
  readonly altoMinimoTarjeta = 34;
  readonly anchoInsignia = 20;

  // --- Encabezado de fase ------------------------------------------------
  readonly tamFase = 9.2;
  readonly altoEncabezadoFase = 12;
  readonly gapEncabezado = 10;

  // --- Eje ---------------------------------------------------------------
  readonly tamMarcaEje = 8.4;
  readonly anchoMarca = 5;

  // --- Varios ------------------------------------------------------------
  readonly tamEtiqueta = 8.2;
  readonly tamanoPunta = 3.6;
  readonly tamCarril = 8.4;
  readonly altoEncabezadoCarriles = 13;
  readonly margenSuperior = 2;
  readonly margenInferior = 6;
  /** Hueco entre los dos desenlaces de una bifurcación; ahí va la "o". */
  readonly gapRamas = 18;

  // --- Escala tipográfica -------------------------------------------------
  readonly tamTitulo: number;
  readonly altoLineaTitulo: number;
  readonly tamDetalle: number;
  readonly altoLineaDetalle: number;
  readonly tamMeta: number;
  readonly altoMeta: number;
  readonly padX: number;
  readonly padY: number;
  readonly gapNodo: number;
  readonly gapFase: number;

  constructor(opciones: OpcionesLayout = {}) {
    this.ancho = opciones.ancho ?? ANCHO_POR_DEFECTO;
    this.densidad = opciones.densidad ?? 'compacta';
    this.pixelesPorMinuto = opciones.pixelesPorMinuto ?? PIXELES_POR_MINUTO;

    const escala = ESCALAS[this.densidad];
    this.tamTitulo = escala.tamTitulo;
    this.altoLineaTitulo = escala.altoLineaTitulo;
    this.tamDetalle = escala.tamDetalle;
    this.altoLineaDetalle = escala.altoLineaDetalle;
    this.tamMeta = escala.tamMeta;
    this.altoMeta = escala.altoMeta;
    this.padX = escala.padX;
    this.padY = escala.padY;
    this.gapNodo = escala.gapNodo;
    this.gapFase = escala.gapFase;

    this.carrilRetorno = this.ancho - this.margenDerecho + 4;
    const disponible = this.ancho - this.personaX - this.margenDerecho - this.gapCarriles - 8;
    this.anchoPersona = Math.round(disponible * this.proporcionPersona);
    this.anchoSistema = disponible - this.anchoPersona;
    this.sistemaX = this.personaX + this.anchoPersona + this.gapCarriles;
  }

  /** Ancho de un nodo según su carril; el resultado ocupa los dos. */
  anchoDe(pista: 'persona' | 'sistema', esResultado = false): number {
    if (esResultado) return this.sistemaX + this.anchoSistema - this.personaX;
    return pista === 'persona' ? this.anchoPersona : this.anchoSistema;
  }

  xDe(pista: 'persona' | 'sistema'): number {
    return pista === 'persona' ? this.personaX : this.sistemaX;
  }
}
