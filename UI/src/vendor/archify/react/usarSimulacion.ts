// ==============================================================================
// HOOK DE SIMULACIÓN PARA REACT
// ==============================================================================
// Envuelve `ReproductorSimulacion` en estado de React. La mecánica no se
// duplica: el hook solo se suscribe y reexpone los controles.
// ==============================================================================

import { useEffect, useMemo, useState } from 'react';
import { servicioDiagramas, type ServicioDiagramas } from '../aplicacion/ServicioDiagramas.js';
import type { EstadoNodo } from '../dominio/tipos.js';
import {
  ReproductorSimulacion,
  type OpcionesReproductor,
} from '../simulacion/ReproductorSimulacion.js';
import type { EstadoSimulacion } from '../simulacion/SimulacionProceso.js';

export interface ControlesSimulacion {
  readonly estado: EstadoSimulacion;
  readonly reproduciendo: boolean;
  /** Estado de cada nodo, listo para pasarlo al componente del diagrama. */
  readonly estadoPorNodo: Readonly<Record<string, EstadoNodo>>;
  alternar(): void;
  reiniciar(): void;
  siguiente(): void;
  anterior(): void;
  irA(indice: number): void;
}

export function usarSimulacion(
  idDiagrama: string,
  opciones: OpcionesReproductor = {},
  servicio: ServicioDiagramas = servicioDiagramas,
): ControlesSimulacion {
  const { reproductor, idsDePasos } = useMemo(() => {
    const simulacion = servicio.simulacion(idDiagrama);
    return {
      reproductor: new ReproductorSimulacion(simulacion, opciones),
      idsDePasos: simulacion.idsDePasos(),
    };
    // Recrear el reproductor solo cuando cambia el diagrama: las opciones son
    // configuración de arranque, no estado reactivo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDiagrama, servicio]);

  const [instantanea, setInstantanea] = useState(() => ({
    estado: reproductor.estado,
    reproduciendo: false,
  }));

  useEffect(() => {
    const cancelar = reproductor.suscribir((estado, reproduciendo) =>
      setInstantanea({ estado, reproduciendo }),
    );
    return () => {
      cancelar();
      reproductor.destruir();
    };
  }, [reproductor]);

  const estadoPorNodo = useMemo(() => {
    const mapa: Record<string, EstadoNodo> = {};
    if (instantanea.estado.indice < 0) return mapa;
    // Todo paso aparece explícitamente: así el componente distingue un paso
    // pendiente de un nodo anclado, que sí debe heredar estado.
    for (const id of idsDePasos) mapa[id] = 'pendiente';
    for (const id of instantanea.estado.vistos) mapa[id] = 'visto';
    const activo = instantanea.estado.paso?.idNodo;
    if (activo) mapa[activo] = 'activo';
    return mapa;
  }, [instantanea, idsDePasos]);

  return {
    estado: instantanea.estado,
    reproduciendo: instantanea.reproduciendo,
    estadoPorNodo,
    alternar: () => reproductor.alternar(),
    reiniciar: () => reproductor.reiniciar(),
    siguiente: () => reproductor.siguiente(),
    anterior: () => reproductor.anterior(),
    irA: (indice: number) => reproductor.irA(indice),
  };
}
