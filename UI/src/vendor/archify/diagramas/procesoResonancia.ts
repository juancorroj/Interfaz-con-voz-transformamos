// ==============================================================================
// DIAGRAMA 2 — EL MISMO PROCESO CON RESONANCIA
// ==============================================================================
// Mismas fases, mismo eje temporal y mismo carril de la persona que el proceso
// actual: la comparación tiene que poder hacerse bloque contra bloque.
//
// Lo que cambia está a la derecha. Durante la conversación, la capa es UNA sola
// caja que no interrumpe nada. Después de la sesión —mientras el profesional
// respira— es cuando la IA procesa los dos audios, clasifica, valida, almacena,
// alimenta los tableros y deja los borradores listos. El profesional vuelve a
// entrar solo al final, para revisar y enviar.
// ==============================================================================

import { Conexion } from '../dominio/Conexion.js';
import { FaseProceso } from '../dominio/FaseProceso.js';
import { ModeloProceso } from '../dominio/ModeloProceso.js';
import { ActividadSistema } from '../dominio/nodos/ActividadSistema.js';
import { EtapaHumana } from '../dominio/nodos/EtapaHumana.js';
import { ResultadoInstitucional } from '../dominio/nodos/ResultadoInstitucional.js';

export const procesoResonancia = new ModeloProceso({
  id: 'proceso-resonancia',
  titulo: 'El mismo proceso, con ResonancIA',
  subtitulo: 'La conversación sigue siendo humana; el conocimiento deja de perderse',

  fases: [
    new FaseProceso({
      id: 'antes',
      nombre: 'Antes',
      nodos: [
        new EtapaHumana({
          id: 'pr-preparacion',
          titulo: 'Preparación con contexto vivo',
          duracionMinutos: 2,
          detalle: 'Lo conversado, los acuerdos y su estado, en una sola pantalla.',
          simulacion: {
            nota: '2 minutos: la asesora ya sabe dónde quedó el caso.',
            minutos: 2,
            retencion: 58,
          },
        }),
        new ActividadSistema({
          id: 'pr-memoria-previa',
          titulo: 'Memoria del caso disponible',
          detalle: 'Lo que Mateo ya contó viaja con él.',
          alineadoCon: 'pr-preparacion',
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
          id: 'pr-escucha',
          titulo: 'Escucha profunda',
          duracionMinutos: 25,
          detalle: 'Cinco minutos más de conversación. Ningún formulario abierto.',
          simulacion: {
            nota: '25 minutos de escucha: cinco más que en el proceso actual.',
            minutos: 25,
            escucha: 25,
            retencion: 100,
          },
        }),
        new ActividadSistema({
          id: 'pr-captura',
          titulo: 'Captura en segundo plano',
          detalle: 'La capa acompaña la conversación sin intervenirla. Nadie digita.',
          alineadoCon: 'pr-escucha',
          simulacion: { nota: 'La capa escucha con la sesión. El profesional solo conversa.' },
        }),
        new EtapaHumana({
          id: 'pr-validacion',
          titulo: 'Validación en Teams',
          duracionMinutos: 2,
          detalle: 'La asesora revisa y aprueba lo que quedó estructurado.',
          simulacion: {
            nota: '2 minutos: nada se guarda sin el visto bueno del profesional.',
            minutos: 2,
            retencion: 97,
          },
        }),
        new EtapaHumana({
          id: 'pr-respiro',
          enfasis: 'positivo',
          titulo: 'Respiro cognitivo',
          duracionMinutos: 3,
          detalle: 'El tiempo que antes se iba en digitar vuelve al profesional.',
          simulacion: {
            nota: '3 minutos de respiro. Cuidamos también a quien escucha.',
            minutos: 3,
          },
        }),
        new ActividadSistema({
          id: 'pr-procesa',
          titulo: 'Procesa, clasifica, valida y almacena',
          detalle: 'Los dos audios —la sesión y la nota del asesor— mientras la persona respira.',
          alineadoCon: 'pr-respiro',
          simulacion: {
            nota: 'Mientras la persona respira, la IA procesa ambos audios y estructura el caso.',
            retencion: 96,
          },
        }),
      ],
    }),

    new FaseProceso({
      id: 'despues',
      nombre: 'Después',
      meta: 'Sin costo de tiempo',
      // Aquí el ritmo lo lleva el sistema: prepara todo y la persona vuelve a
      // entrar solo al final, para revisar y enviar.
      carrilPrincipal: 'sistema',
      nodos: [
        new ActividadSistema({
          id: 'pr-tableros',
          titulo: 'Tableros y automatizaciones',
          detalle: 'El caso alimenta la analítica y dispara las rutas institucionales.',
          simulacion: {
            nota: 'La información estructurada llega a los tableros y activa automatizaciones.',
          },
        }),
        new ActividadSistema({
          id: 'pr-borradores',
          titulo: 'Borradores de realimentación listos',
          detalle: 'La IA los prepara. No los envía.',
          simulacion: {
            nota: 'La IA deja los borradores preparados. Enviar sigue siendo decisión humana.',
          },
        }),
        new EtapaHumana({
          id: 'pr-realimentacion',
          enfasis: 'positivo',
          titulo: 'Realimentación en varios frentes',
          duracionMinutos: 3,
          alineadoCon: 'pr-borradores',
          detalle: 'Revisa, envía y activa los recursos que el caso necesite.',
          simulacion: {
            nota: 'El profesional revisa, envía y activa recursos. Tres minutos, no una tarde.',
            minutos: 3,
            retencion: 96,
          },
        }),
      ],
    }),
  ],

  cierre: new ResultadoInstitucional({
    id: 'pr-resultado',
    enfasis: 'positivo',
    meta: 'Resultado institucional',
    titulo: 'El caso sobrevive a la sesión, al cambio de rol y al paso del tiempo.',
    simulacion: {
      nota: 'Fin del recorrido: la Universidad sabe qué pasó y por qué.',
      retencion: 96,
    },
  }),

  conexiones: [
    new Conexion({
      desde: 'pr-resultado',
      hasta: 'pr-memoria-previa',
      tipo: 'retorno',
      etiqueta: 'Memoria activa',
    }),
  ],
});
