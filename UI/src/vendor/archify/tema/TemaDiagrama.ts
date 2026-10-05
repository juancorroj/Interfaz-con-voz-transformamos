// ==============================================================================
// TEMA DEL DIAGRAMA
// ==============================================================================
// Única pieza que conoce colores. El layout pide "estilo de un nodo crítico" y
// recibe valores concretos; nunca escribe un hexadecimal.
//
// Los valores replican los tokens de marca de `Pitch/Mockup/css/style.css`.
// Se usan literales y no `var(--rz-*)` para que el diagrama se vea igual dentro
// del mockup, dentro de la UI React y en cualquier exportación futura.
// ==============================================================================

import type {
  EstiloConexion,
  EstiloEstructura,
  EstiloNodo,
  IProveedorTema,
} from '../dominio/contratos.js';
import type { EnfasisNodo, TipoConexion, VarianteNodo } from '../dominio/tipos.js';

export interface PaletaDiagrama {
  readonly superficie: string;
  readonly superficieSistema: string;
  readonly borde: string;
  readonly estructura: string;
  readonly tintaTitulo: string;
  readonly tintaDetalle: string;
  readonly tintaMeta: string;
  readonly acentoEtapa: string;
  readonly acentoCritico: string;
  readonly acentoPositivo: string;
  readonly acentoSistema: string;
}

/** Convierte `#RRGGBB` + opacidad en `rgba(...)`. */
export function conAlfa(hex: string, alfa: number): string {
  const limpio = hex.replace('#', '');
  const r = parseInt(limpio.slice(0, 2), 16);
  const g = parseInt(limpio.slice(2, 4), 16);
  const b = parseInt(limpio.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alfa})`;
}

/**
 * Tema configurable. Para una variante en fondo claro (impresión, Word) basta
 * instanciar esta misma clase con otra paleta: no se modifica ni una línea del
 * resto del motor (OCP).
 */
export class TemaDiagrama implements IProveedorTema {
  constructor(
    readonly nombre: string,
    private readonly paleta: PaletaDiagrama,
  ) {}

  estiloNodo(variante: VarianteNodo, enfasis: EnfasisNodo): EstiloNodo {
    const p = this.paleta;
    const base = {
      colorTitulo: p.tintaTitulo,
      colorDetalle: p.tintaDetalle,
      colorMeta: p.tintaMeta,
    };

    switch (variante) {
      case 'fractura':
        return {
          ...base,
          acento: p.acentoCritico,
          relleno: conAlfa(p.acentoCritico, 0.08),
          borde: conAlfa(p.acentoCritico, 0.36),
          grosorBorde: 1,
          colorMeta: conAlfa(p.acentoCritico, 0.95),
        };

      case 'bifurcacion':
        return {
          ...base,
          acento: p.acentoCritico,
          relleno: conAlfa(p.acentoCritico, 0.05),
          borde: conAlfa(p.acentoCritico, 0.3),
          grosorBorde: 1,
          guiones: '5 4',
          colorMeta: conAlfa(p.acentoCritico, 0.95),
        };

      case 'sistema':
        // Un nodo de sistema marcado como crítico representa un vacío: algo que
        // debería estar ocurriendo y no ocurre. Se dibuja hueco y punteado.
        return enfasis === 'critico'
          ? {
              ...base,
              acento: 'transparent',
              relleno: 'none',
              borde: conAlfa(p.acentoCritico, 0.26),
              grosorBorde: 1,
              guiones: '4 5',
              colorTitulo: conAlfa(p.acentoCritico, 0.75),
              colorDetalle: p.tintaMeta,
              colorMeta: conAlfa(p.acentoCritico, 0.8),
            }
          : {
              ...base,
              acento: p.acentoSistema,
              relleno: p.superficieSistema,
              borde: conAlfa(p.acentoSistema, 0.34),
              grosorBorde: 1,
              colorTitulo: p.tintaTitulo,
              colorMeta: conAlfa(p.acentoSistema, 0.95),
            };

      case 'resultado': {
        const acento = this.acentoDeEnfasis(enfasis);
        return {
          ...base,
          acento,
          relleno: conAlfa(acento, 0.14),
          borde: conAlfa(acento, 0.46),
          grosorBorde: 1.2,
          colorMeta: conAlfa(acento, 0.95),
        };
      }

      case 'etapa':
      default: {
        const acento = this.acentoDeEnfasis(enfasis);
        return {
          ...base,
          acento,
          relleno: p.superficie,
          borde: enfasis === 'neutral' ? p.borde : conAlfa(acento, 0.32),
          grosorBorde: 1,
        };
      }
    }
  }

  estiloConexion(_tipo: TipoConexion): EstiloConexion {
    return {
      color: conAlfa(this.paleta.acentoPositivo, 0.7),
      grosor: 1.3,
      guiones: '6 4',
    };
  }

  estiloEstructura(): EstiloEstructura {
    const p = this.paleta;
    return {
      eje: p.estructura,
      marcaEje: p.tintaMeta,
      bandaFase: 'rgba(148, 173, 209, 0.045)',
      colorFase: p.tintaDetalle,
      colorMetaFase: p.tintaMeta,
      colorCarril: p.tintaMeta,
      rellenoCarril: 'rgba(148, 173, 209, 0.05)',
    };
  }

  private acentoDeEnfasis(enfasis: EnfasisNodo): string {
    switch (enfasis) {
      case 'critico':
        return this.paleta.acentoCritico;
      case 'positivo':
        return this.paleta.acentoPositivo;
      case 'neutral':
      default:
        return this.paleta.acentoEtapa;
    }
  }
}
