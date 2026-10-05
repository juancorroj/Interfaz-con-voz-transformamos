// ==============================================================================
// SERVICIO DE DIAGRAMAS (fachada de aplicación)
// ==============================================================================
// Punto de entrada único: "dame la escena, el SVG o la simulación del diagrama
// X". Oculta el cableado entre modelo, tema, estrategia de layout y renderizador.
//
// La estrategia de layout se inyecta como fábrica: cambiar a un layout
// horizontal para diapositiva es construir el servicio con otra fábrica, sin
// modificar a ninguno de los consumidores (DIP).
// ==============================================================================

import type {
  IEstrategiaLayout,
  IProveedorTema,
  OpcionesLayout,
} from '../dominio/contratos.js';
import {
  obtenerDiagrama,
  REGISTRO_DIAGRAMAS,
  type DefinicionDiagrama,
} from '../diagramas/registro.js';
import type { EscenaDiagrama } from '../escena/primitivas.js';
import { LayoutLineaDeTiempo } from '../layout/LayoutLineaDeTiempo.js';
import { RenderizadorSvg } from '../render/RenderizadorSvg.js';
import { SimulacionProceso } from '../simulacion/SimulacionProceso.js';

export type FabricaLayout = (
  tema: IProveedorTema,
  opciones: OpcionesLayout,
) => IEstrategiaLayout;

const LAYOUT_POR_DEFECTO: FabricaLayout = (tema, opciones) =>
  new LayoutLineaDeTiempo(tema, opciones);

export class ServicioDiagramas {
  constructor(
    private readonly crearLayout: FabricaLayout = LAYOUT_POR_DEFECTO,
    private readonly renderizadorSvg = new RenderizadorSvg(),
  ) {}

  listar(): DefinicionDiagrama[] {
    return Object.values(REGISTRO_DIAGRAMAS);
  }

  definicion(idDiagrama: string): DefinicionDiagrama {
    return obtenerDiagrama(idDiagrama);
  }

  escena(idDiagrama: string, opciones: OpcionesLayout = {}): EscenaDiagrama {
    const { modelo, tema } = obtenerDiagrama(idDiagrama);
    return this.crearLayout(tema, opciones).calcular(modelo);
  }

  svg(idDiagrama: string, opciones: OpcionesLayout = {}): string {
    return this.renderizadorSvg.renderizar(this.escena(idDiagrama, opciones));
  }

  simulacion(idDiagrama: string): SimulacionProceso {
    return SimulacionProceso.desdeModelo(obtenerDiagrama(idDiagrama).modelo);
  }
}

/** Instancia lista para usar; basta para el 99% de los casos. */
export const servicioDiagramas = new ServicioDiagramas();
