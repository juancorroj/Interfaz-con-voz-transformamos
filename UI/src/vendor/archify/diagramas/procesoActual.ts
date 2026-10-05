// ==============================================================================
// DIAGRAMA 1 — PROCESO ACTUAL DE ASESORÍA PSICOPEDAGÓGICA
// ==============================================================================
// Fuente: "Proceso de Atención Regular de un Estudiante — Modelo desde la
// asesoría psicopedagógica" (Casos-de-uso/Asesoria-Psicopedagogica).
//
// La fase de la sesión va a escala temporal: 20 minutos de conversación y 10 de
// digitación. El bloque rojo mide literalmente la mitad del azul, y eso es todo
// lo que hay que explicar.
//
// Este archivo es SOLO datos: no calcula ni dibuja nada.
// ==============================================================================

import { FaseProceso } from '../dominio/FaseProceso.js';
import { ModeloProceso } from '../dominio/ModeloProceso.js';
import { ActividadSistema } from '../dominio/nodos/ActividadSistema.js';
import { BifurcacionIncierta } from '../dominio/nodos/BifurcacionIncierta.js';
import { EtapaHumana } from '../dominio/nodos/EtapaHumana.js';
import { PuntoDeFractura } from '../dominio/nodos/PuntoDeFractura.js';
import { ResultadoInstitucional } from '../dominio/nodos/ResultadoInstitucional.js';

export const procesoActual = new ModeloProceso({
  id: 'proceso-actual',
  titulo: 'Proceso actual de asesoría psicopedagógica',
  subtitulo: 'El caso de Mateo: la conversación no sobrevive a la sesión',

  fases: [
    new FaseProceso({
      id: 'antes',
      nombre: 'Antes',
      nodos: [
        new EtapaHumana({
          id: 'pa-preparacion',
          titulo: 'Preparación sin contexto',
          duracionMinutos: 3,
          detalle: 'Los antecedentes están repartidos en cuatro dependencias.',
          simulacion: {
            nota: 'La asesora abre el caso y solo ve lo administrativo.',
            minutos: 3,
            retencion: 8,
          },
        }),
        new ActividadSistema({
          id: 'pa-sin-memoria',
          titulo: 'Sin memoria del caso',
          detalle: 'Lo que Mateo ya contó en otra parte no llega aquí.',
          alineadoCon: 'pa-preparacion',
        }),
      ],
    }),

    new FaseProceso({
      id: 'sesion',
      nombre: 'La sesión',
      meta: '30 min',
      escalaTemporal: true,
      nodos: [
        new EtapaHumana({
          id: 'pa-escucha',
          titulo: 'Escucha y valoración',
          duracionMinutos: 20,
          detalle: 'Aparece la beca en riesgo, la presión en casa, la duda vocacional.',
          simulacion: {
            nota: '20 minutos de conversación. En la sala existe todo el contexto.',
            minutos: 20,
            escucha: 20,
            retencion: 100,
          },
        }),
        new ActividadSistema({
          id: 'pa-vacio',
          enfasis: 'critico',
          titulo: 'Nada queda registrado',
          detalle: 'Durante los 20 minutos, el carril del sistema está vacío.',
          alineadoCon: 'pa-escucha',
        }),
        new PuntoDeFractura({
          id: 'pa-digitacion',
          titulo: 'Digitación contra reloj',
          duracionMinutos: 10,
          detalle: 'Escribir lo máximo posible en SIGA y Excel, mientras se recuerda.',
          simulacion: {
            nota: '10 minutos para escribir lo máximo posible. Cabe el qué, no el porqué.',
            minutos: 10,
            retencion: 34,
          },
        }),
        new ActividadSistema({
          id: 'pa-registro',
          titulo: 'Estado binario',
          detalle: '"Perdió Mecánica". Nada más.',
          alineadoCon: 'pa-digitacion',
          simulacion: { nota: 'Lo que queda registrado es un dato, no un caso.', retencion: 22 },
        }),
      ],
    }),

    new FaseProceso({
      id: 'despues',
      nombre: 'Después',
      meta: 'Sin tiempo asignado',
      nodos: [
        new BifurcacionIncierta({
          id: 'pa-realimentacion',
          titulo: 'Realimentación y seguimiento',
          detalle: 'Nadie presupuestó este tramo del proceso.',
          ramas: [
            { titulo: 'Se posterga o se olvida' },
            { titulo: '+15 min de tiempo extra y fricción' },
          ],
          simulacion: {
            nota: 'O se posterga, o cuesta un tiempo que nadie presupuestó.',
            retencion: 18,
            incierto: true,
          },
        }),
        new ActividadSistema({
          id: 'pa-memoria',
          titulo: 'La memoria queda en la persona',
          detalle: 'Si la profesional cambia de rol, el contexto puede perderse.',
          simulacion: {
            nota: 'El conocimiento del caso vive en quien escuchó, no en la institución.',
            retencion: 6,
          },
        }),
      ],
    }),
  ],

  cierre: new ResultadoInstitucional({
    id: 'pa-resultado',
    enfasis: 'critico',
    meta: 'Resultado institucional',
    titulo: 'La Universidad sabe que Mateo perdió una materia. No sabe por qué.',
    simulacion: {
      nota: 'Fin del recorrido: el dato sobrevivió a la sesión, el conocimiento no.',
      retencion: 5,
    },
  }),
});
