// ==============================================================================
// REPRODUCTOR DE SIMULACIÓN
// ==============================================================================
// Añade el eje del tiempo a `SimulacionProceso`: reproducir, pausar, avanzar,
// retroceder y reiniciar. El reloj se inyecta (DIP) para poder correr la
// simulación en pruebas sin esperar un solo milisegundo.
//
// Cada paso dura en proporción a sus minutos: los 25 minutos de escucha se
// sienten largos y los 2 de validación pasan volando. La simulación tiene que
// transmitir eso, no solo contarlo.
// ==============================================================================

import { SimulacionProceso, type EstadoSimulacion } from './SimulacionProceso.js';

export interface RelojSimulacion {
  programar(accion: () => void, ms: number): number;
  cancelar(id: number): void;
}

export const relojDelNavegador: RelojSimulacion = {
  programar: (accion, ms) => globalThis.setTimeout(accion, ms) as unknown as number,
  cancelar: (id) => globalThis.clearTimeout(id),
};

export interface OpcionesReproductor {
  /** Milisegundos de base por paso, antes de sumar la duración. */
  readonly baseMs?: number;
  /** Milisegundos adicionales por minuto simulado. */
  readonly msPorMinuto?: number;
  readonly topeMs?: number;
  readonly reloj?: RelojSimulacion;
}

export type OyenteSimulacion = (estado: EstadoSimulacion, reproduciendo: boolean) => void;

export class ReproductorSimulacion {
  private indice = -1;
  private temporizador: number | null = null;
  private readonly oyentes = new Set<OyenteSimulacion>();
  private readonly baseMs: number;
  private readonly msPorMinuto: number;
  private readonly topeMs: number;
  private readonly reloj: RelojSimulacion;

  constructor(
    private readonly simulacion: SimulacionProceso,
    opciones: OpcionesReproductor = {},
  ) {
    this.baseMs = opciones.baseMs ?? 620;
    this.msPorMinuto = opciones.msPorMinuto ?? 42;
    this.topeMs = opciones.topeMs ?? 2200;
    this.reloj = opciones.reloj ?? relojDelNavegador;
  }

  get reproduciendo(): boolean {
    return this.temporizador !== null;
  }

  get estado(): EstadoSimulacion {
    return this.simulacion.estadoEn(this.indice);
  }

  suscribir(oyente: OyenteSimulacion): () => void {
    this.oyentes.add(oyente);
    oyente(this.estado, this.reproduciendo);
    return () => this.oyentes.delete(oyente);
  }

  alternar(): void {
    if (this.reproduciendo) this.pausar();
    else this.reproducir();
  }

  reproducir(): void {
    if (this.reproduciendo) return;
    if (this.estado.terminada) this.indice = -1;
    this.avanzar();
  }

  pausar(): void {
    this.detenerTemporizador();
    this.notificar();
  }

  reiniciar(): void {
    this.detenerTemporizador();
    this.indice = -1;
    this.notificar();
  }

  irA(indice: number): void {
    this.detenerTemporizador();
    this.indice = Math.max(-1, Math.min(indice, this.simulacion.total - 1));
    this.notificar();
  }

  siguiente(): void {
    this.irA(this.indice + 1);
  }

  anterior(): void {
    this.irA(this.indice - 1);
  }

  /** Libera el temporizador; obligatorio al desmontar el contenedor. */
  destruir(): void {
    this.detenerTemporizador();
    this.oyentes.clear();
  }

  private avanzar(): void {
    this.indice += 1;
    const estado = this.estado;

    if (estado.terminada) {
      this.detenerTemporizador();
      this.notificar();
      return;
    }

    const duracion = Math.min(
      this.baseMs + (estado.paso?.minutos ?? 0) * this.msPorMinuto,
      this.topeMs,
    );
    this.temporizador = this.reloj.programar(() => this.avanzar(), duracion);
    this.notificar();
  }

  private detenerTemporizador(): void {
    if (this.temporizador !== null) {
      this.reloj.cancelar(this.temporizador);
      this.temporizador = null;
    }
  }

  private notificar(): void {
    const estado = this.estado;
    for (const oyente of this.oyentes) oyente(estado, this.reproduciendo);
  }
}
