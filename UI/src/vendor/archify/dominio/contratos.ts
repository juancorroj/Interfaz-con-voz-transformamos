// ==============================================================================
// CONTRATOS DE DOMINIO (ISP — Interface Segregation Principle)
// ==============================================================================
// Cada consumidor depende de la interfaz mínima que necesita:
//   · el layout mide texto            -> IMedidorTexto
//   · el layout pide colores          -> IProveedorTema
//   · el adaptador pide geometría     -> IEstrategiaLayout
//   · el renderizador pide primitivas -> IRenderizador
//   · la simulación pide pasos        -> IModeloProceso.pasos()
// ==============================================================================

import type { EscenaDiagrama } from '../escena/primitivas.js';
import type {
  DensidadDiagrama,
  EnfasisNodo,
  IdNodo,
  Pista,
  TipoConexion,
  VarianteNodo,
} from './tipos.js';

// ------------------------------------------------------------------ Medición

export interface IMedidorTexto {
  anchoDe(texto: string, tamano: number, peso: number): number;
  dividirEnLineas(
    texto: string,
    anchoMaximo: number,
    tamano: number,
    peso: number,
  ): string[];
}

// ---------------------------------------------------------------------- Tema

export interface EstiloNodo {
  readonly relleno: string;
  readonly borde: string;
  readonly grosorBorde: number;
  readonly guiones?: string;
  readonly acento: string;
  readonly colorTitulo: string;
  readonly colorDetalle: string;
  readonly colorMeta: string;
}

export interface EstiloEstructura {
  readonly eje: string;
  readonly marcaEje: string;
  readonly bandaFase: string;
  readonly colorFase: string;
  readonly colorMetaFase: string;
  readonly colorCarril: string;
  readonly rellenoCarril: string;
}

export interface EstiloConexion {
  readonly color: string;
  readonly grosor: number;
  readonly guiones?: string;
}

export interface IProveedorTema {
  readonly nombre: string;
  estiloNodo(variante: VarianteNodo, enfasis: EnfasisNodo): EstiloNodo;
  estiloConexion(tipo: TipoConexion): EstiloConexion;
  estiloEstructura(): EstiloEstructura;
}

// -------------------------------------------------------------------- Modelo

/**
 * Metadatos que un nodo aporta a la simulación. Un nodo sin esto simplemente no
 * es un paso: se dibuja, pero el reproductor no se detiene en él.
 */
export interface DatosSimulacion {
  /** Frase que se muestra en el panel mientras el paso está activo. */
  readonly nota: string;
  /** Minutos que el paso consume del tiempo del profesional. */
  readonly minutos?: number;
  /** Minutos de ese tiempo que son escucha real. */
  readonly escucha?: number;
  /** Valor absoluto (0-100) del conocimiento que sobrevive al terminar el paso. */
  readonly retencion?: number;
  /** El paso puede no ocurrir: se señala como incierto en vez de como hecho. */
  readonly incierto?: boolean;
}

export interface INodoDiagrama {
  readonly id: IdNodo;
  readonly variante: VarianteNodo;
  readonly pista: Pista;
  readonly enfasis: EnfasisNodo;
  readonly titulo: string;
  /** Etiqueta breve en versalitas sobre el título. */
  readonly meta?: string;
  readonly detalle?: string;
  /** Duración del bloque. Si la fase está a escala, define su altura. */
  readonly duracionMinutos?: number;
  /** Ancla este nodo a la altura de otro en vez de apilarlo. */
  readonly alineadoCon?: IdNodo;
  readonly simulacion?: DatosSimulacion;
  describir(): string;
}

export interface Rama {
  readonly titulo: string;
  readonly detalle?: string;
}

export interface INodoBifurcacion extends INodoDiagrama {
  readonly variante: 'bifurcacion';
  readonly ramas: readonly Rama[];
}

export interface IConexion {
  readonly desde: IdNodo;
  readonly hasta: IdNodo;
  readonly tipo: TipoConexion;
  readonly etiqueta?: string;
}

export interface IFaseProceso {
  readonly id: string;
  readonly nombre: string;
  readonly meta?: string;
  /**
   * Si es cierto, la altura de los nodos es proporcional a su duración y se
   * dibuja el eje de minutos. Es lo que convierte la lista en una línea de
   * tiempo: 20 minutos ocupan el doble que 10.
   */
  readonly escalaTemporal: boolean;
  /**
   * Carril que marca el ritmo de la fase: sus nodos se apilan y los del otro
   * carril se anclan a ellos. Después de la sesión quien lleva el ritmo es el
   * sistema, y la persona vuelve a entrar solo al final.
   */
  readonly carrilPrincipal: Pista;
  readonly nodos: readonly INodoDiagrama[];
}

export interface IModeloProceso {
  readonly id: string;
  readonly titulo: string;
  readonly subtitulo?: string;
  readonly fases: readonly IFaseProceso[];
  readonly cierre?: INodoDiagrama;
  readonly conexiones: readonly IConexion[];
  nodosEnOrden(): INodoDiagrama[];
  /** Nodos que participan de la simulación, en orden de reproducción. */
  pasos(): INodoDiagrama[];
  descripcionAccesible(): string;
}

// -------------------------------------------------------------------- Layout

export interface OpcionesLayout {
  readonly ancho?: number;
  readonly densidad?: DensidadDiagrama;
  /** Píxeles de lienzo por minuto en las fases a escala. */
  readonly pixelesPorMinuto?: number;
}

export interface IEstrategiaLayout {
  readonly nombre: string;
  calcular(modelo: IModeloProceso): EscenaDiagrama;
}

// --------------------------------------------------------------- Renderizado

export interface IRenderizador<TSalida> {
  renderizar(escena: EscenaDiagrama): TSalida;
}
