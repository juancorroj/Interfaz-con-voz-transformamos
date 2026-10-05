// ==============================================================================
// SIMULACIÓN DEL PROCESO — máquina de estados pura
// ==============================================================================
// Sin temporizadores, sin DOM, sin React. Dado un índice de paso devuelve el
// estado completo del recorrido. Eso la hace trivial de probar y permite que el
// mismo motor alimente el mockup, la UI operativa o un render por lotes.
//
// El reloj y la reproducción viven en `ReproductorSimulacion` (SRP).
// ==============================================================================

import type { IModeloProceso, INodoDiagrama } from '../dominio/contratos.js';
import type { Pista } from '../dominio/tipos.js';

export interface PasoSimulacion {
  readonly idNodo: string;
  readonly titulo: string;
  readonly nota: string;
  readonly pista: Pista;
  /** Minutos de tiempo del profesional que consume este paso. */
  readonly minutos: number;
  /** De esos minutos, cuántos son escucha real. */
  readonly escucha: number;
  /** Conocimiento que sobrevive (0-100) una vez terminado el paso. */
  readonly retencion: number;
  /** El paso puede no ocurrir: se marca como incierto, no como hecho. */
  readonly incierto: boolean;
}

export interface EstadoSimulacion {
  /** -1 significa "sin iniciar". */
  readonly indice: number;
  readonly paso?: PasoSimulacion;
  readonly minutos: number;
  readonly escucha: number;
  readonly retencion: number;
  readonly total: number;
  readonly terminada: boolean;
  /** Nodos ya recorridos, para marcarlos como vistos. */
  readonly vistos: readonly string[];
}

export class SimulacionProceso {
  private readonly pasos: readonly PasoSimulacion[];

  constructor(pasos: readonly PasoSimulacion[], private readonly retencionInicial = 0) {
    this.pasos = pasos;
  }

  /** Construye la simulación a partir de los nodos que declararon `simulacion`. */
  static desdeModelo(modelo: IModeloProceso): SimulacionProceso {
    const pasos = modelo.pasos().map(convertir);
    return new SimulacionProceso(pasos, 0);
  }

  get total(): number {
    return this.pasos.length;
  }

  pasoEn(indice: number): PasoSimulacion | undefined {
    return this.pasos[indice];
  }

  /** Ids de los nodos simulables, en orden. Permite saltar a un paso por clic. */
  idsDePasos(): string[] {
    return this.pasos.map((paso) => paso.idNodo);
  }

  /** Totales del recorrido completo, sin reproducirlo. */
  resumen(): EstadoSimulacion {
    return this.estadoEn(this.total - 1);
  }

  estadoEn(indice: number): EstadoSimulacion {
    const limite = Math.max(-1, Math.min(indice, this.total - 1));
    const recorridos = this.pasos.slice(0, limite + 1);

    const minutos = recorridos.reduce((t, p) => t + p.minutos, 0);
    const escucha = recorridos.reduce((t, p) => t + p.escucha, 0);
    const ultimoConRetencion = [...recorridos].reverse().find((p) => p.retencion >= 0);

    return {
      indice: limite,
      paso: this.pasos[limite],
      minutos,
      escucha,
      retencion: ultimoConRetencion?.retencion ?? this.retencionInicial,
      total: this.total,
      terminada: limite >= this.total - 1,
      vistos: recorridos.map((p) => p.idNodo),
    };
  }
}

function convertir(nodo: INodoDiagrama): PasoSimulacion {
  const datos = nodo.simulacion;
  return {
    idNodo: nodo.id,
    titulo: nodo.titulo,
    nota: datos?.nota ?? nodo.titulo,
    pista: nodo.pista,
    minutos: datos?.minutos ?? nodo.duracionMinutos ?? 0,
    escucha: datos?.escucha ?? 0,
    retencion: datos?.retencion ?? -1,
    incierto: datos?.incierto ?? false,
  };
}
