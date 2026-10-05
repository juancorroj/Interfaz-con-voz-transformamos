import type { CaseFigure } from '../types';

/**
 * Soporte técnico: lo clave del Dossier de evidencia (`Dossier/`). Cada resumen se redactó leyendo el
 * documento y repite sus cifras tal como están ahí, incluidas las que la propia auditoría corrigió.
 */

export const supportIntro = {
  eyebrow: 'ANEXO · SOPORTE TÉCNICO',
  title: 'Verificaciones técnicas abiertas.',
  titleLines: ['Verificaciones', 'técnicas'],
  titleAccent: 'abiertas.',
  lead: 'Una propuesta que pide confianza para escuchar conversaciones humanas merece poder revisarse. Aquí está lo clave de cada documento de evidencia: lo que ya se comprobó, lo que se declara con precisión que aún no se ha probado y, para los que se pueden leer completos, el texto íntegro.',
};

export const supportIndex = [
  { id: 'comprobable', label: 'Lo que se puede comprobar' },
  { id: 'documentos', label: 'Documentos de evidencia' },
  { id: 'correcciones', label: 'Lo que se corrigió' },
  { id: 'preguntas-previsibles', label: 'Si preguntan…' },
  { id: 'comprobar', label: 'Comprobarlo uno mismo' },
  { id: 'soporte-costos', label: 'Soporte de los costos' },
];

export const supportNotice = {
  title: 'Cómo leer este soporte',
  text: 'Todo describe el alcance validado del MVP: dos sesiones procesadas de punta a punta con audio sintetizado, sin personas reales. Nada de esto equivale a un piloto con estudiantes. Los límites no están en letra pequeña: son la primera parte de la Declaración de alcance.',
};

/** Alcance validado de un vistazo; los números son los de la Declaración de alcance. */
export const supportScope = {
  total: 42,
  endToEnd: 2,
  endToEndLabel: 'procesadas de punta a punta',
  replicatedLabel: 'replicadas programáticamente',
  facts: ['Audio sintetizado: no se grabó a ninguna persona', 'Sin personas reales: no equivale a un piloto con estudiantes'],
};

export interface SupportDocument {
  id: string;
  title: string;
  /** Ruta en el repositorio, relativa a la raíz. */
  file: string;
  /** Una frase: qué permite comprobar. */
  verifies: string;
  points: string[];
  /** `full` se puede leer completo en la web; `summary` solo se resume aquí. */
  mode: 'full' | 'summary';
  /** Por qué un documento no se publica completo. */
  summaryReason?: string;
  badge?: string;
}

export const supportDocuments: SupportDocument[] = [
  {
    id: 'declaracion',
    title: 'Declaración de alcance, límites y verificabilidad',
    file: 'Dossier/DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md',
    verifies: 'Qué se construyó, qué se probó, qué no, y cómo comprobarlo sin creer en nadie.',
    badge: 'Empezar por aquí',
    mode: 'full',
    points: [
      'Los siete principios de integridad los definió la dueña del proceso, no el equipo técnico, y gobiernan cualquier decisión de diseño que los contradiga.',
      'De las 42 sesiones del Staging, 2 las procesó la malla de punta a punta y 40 se replicaron programáticamente: las cifras agregadas describen un patrón, no 42 auditorías independientes.',
      'Los audios son voz sintetizada: no se grabó a ninguna persona. Es la única forma éticamente aceptable de probar la malla antes de tener consentimiento y respaldo jurídico.',
      'Diez límites declarados: cuatro los señaló el equipo y seis aparecieron al auditarse, entre ellos la validación jurídica pendiente y que no existe una línea base medida del proceso actual.',
      'Cuatro afirmaciones previas se corrigieron o retiraron tras recalcularlas desde los archivos originales.',
    ],
  },
  {
    id: 'verificacion',
    title: 'Verificación acústica independiente',
    file: 'Dossier/VERIFICACION_ACUSTICA_INDEPENDIENTE.md',
    verifies: 'Que los audios son los que se dice y que la atribución de quién habla se sostiene por una vía distinta a la del agente.',
    badge: 'Reproducible',
    mode: 'full',
    points: [
      'Cadena de custodia: 12 de 12 afirmaciones reproducidas exactamente (huellas SHA-256 de las cuatro pistas y parámetros del contenedor medidos con ffprobe).',
      'Atribución de hablante: en las dos sesiones, la pista de ancla del profesional corresponde a uno de los dos hablantes y no al otro, con una técnica independiente (frecuencia fundamental y agrupación en dos conjuntos).',
      'Sus propias correcciones: los valores de pitch, la similitud coseno, la tasa de error de diarización y la relación señal-ruido no se sostuvieron y quedan corregidos o retirados.',
      'Un 11 % de tramas con silencio digital absoluto demuestra que las pistas son audio sintetizado, y que el comportamiento ante audio real con ruido de sala no está demostrado.',
      'Se ejecuta con un script de Python que solo requiere numpy y ffmpeg.',
    ],
  },
  {
    id: 'hallazgos',
    title: 'Registro de cierre de hallazgos de la prueba de estrés',
    file: 'Dossier/REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md',
    verifies: 'Que las fallas que el equipo encontró en su propio diseño se corrigieron, y con qué criterio exacto se comprueba cada una.',
    badge: 'Autoauditoría',
    mode: 'full',
    points: [
      'La prueba de estrés encontró 10 fallas en el diseño antes de construirlo; tres eran bloqueantes para la base de datos.',
      'Los tres hallazgos bloqueantes están cerrados. En total, 6 están cerrados, 1 abordado en la especificación, 1 parcial y 2 siguen abiertos por ser decisiones institucionales ajenas al equipo técnico.',
      'El hallazgo 4 es el único con implicación ética: la fórmula de priorización podía dejar sin alerta a un becario en crisis (0,6295) y el mismo cuadro en un no becario sí la activaba (0,8147). Ya está corregido, y la calibración de pesos queda para el dueño del proceso y Bienestar.',
      'Ocho de los diez se comprueban leyendo el repositorio; no hace falta poner el sistema en operación.',
    ],
  },
  {
    id: 'indice',
    title: 'Índice de consulta de la evidencia',
    file: 'Dossier/INDICE.md',
    verifies: 'Dónde está la respuesta a cada pregunta previsible y cómo verificar lo central en cuatro comandos.',
    badge: 'Mapa',
    mode: 'full',
    points: [
      'Cada fila responde a una pregunta (¿funciona o es maqueta?, ¿los audios son auténticos?, ¿qué no probaron?) y señala el documento y la sección.',
      'Propone cuatro comprobaciones por cuenta propia: huella de los audios, parámetros con ffprobe, verificación acústica completa y modelo de costos.',
      'Reconoce que varias cifras de versiones anteriores se retiraron o corrigieron y las deja a la vista a propósito.',
    ],
  },
  {
    id: 'certificacion',
    title: 'Certificación forense y evidencias de la malla de escucha',
    file: 'Dossier/DOSSIER_CERTIFICACION_FORENSE_Y_EVIDENCIAS.md',
    verifies: 'El detalle de la ejecución: sesiones procesadas, hallazgos con su cita, trazabilidad de las conversaciones agénticas y gobierno de acceso a la información.',
    badge: 'Documento extenso',
    mode: 'summary',
    summaryReason: 'Reproduce prompts, respuestas crudas y rutas de trabajo locales. Se consulta en el repositorio.',
    points: [
      'Dos sesiones procesadas de punta a punta con cuatro pistas de audio sintético (27,69 minutos en total) y 40 sesiones adicionales replicadas, hasta 42 en el Staging.',
      'Los 210 hallazgos estructurados se contrastaron contra la transcripción y su marca de tiempo en milisegundos.',
      'Compilación de las 24 conversaciones agénticas de la malla, con su identificador y los pasos ejecutados.',
      'Matriz de acceso por niveles (L1 a L7): el audio crudo y las citas de salud mental quedan restringidos a Bienestar; los equipos de analítica ven solo datos seudonimizados.',
      'Contiene cifras de una versión anterior (similitud coseno, margen de error cero) que la Declaración y la Verificación acústica corrigieron: cuando difieren, valen estas últimas.',
    ],
  },
  {
    id: 'procesamiento',
    title: 'Soporte de procesamiento del agente escuchador acústico',
    file: 'Dossier/dossier_soporte_procesamiento_y_certificacion_forense.md',
    verifies: 'Cómo el agente que escucha el audio garantiza integridad, trazabilidad y fidelidad textual.',
    badge: 'Documento extenso',
    mode: 'summary',
    summaryReason: 'Incluye el prompt completo del agente y las salidas crudas de las sesiones. Se consulta en el repositorio.',
    points: [
      'Siete arneses de control: contrato de uso de herramientas, persistencia física en disco, declaración de herramientas, estampado criptográfico, estándar tipográfico, máquina de estados de cuatro fases y manejo de ruido extremo.',
      'Diarización guiada por ancla: una nota en solitario del profesional permite distinguir quién es quién en el diálogo.',
      'Cadena de custodia con huellas SHA-256 calculadas al ingresar cada audio y gobierno de los datos biométricos de voz.',
      'Como el documento anterior, trae cifras que la auditoría independiente corrigió; allí está el detalle.',
    ],
  },
];

export const supportFigures: CaseFigure[] = [
  { value: '12', label: 'afirmaciones de custodia reproducidas', detail: 'de 12 recalculadas desde los archivos originales' },
  { value: '2', label: 'sesiones con atribución verificada', detail: 'de 2, por una técnica independiente a la del agente' },
  { value: '3', label: 'hallazgos bloqueantes cerrados', detail: 'de 3 que encontró la prueba de estrés' },
  { value: '10', label: 'límites declarados', detail: 'cuatro del equipo y seis al auditarse' },
];

/** Las mismas cifras de `supportFigures`, con el total contra el que se miden para dibujarlas como anillos. */
export const supportRings = [
  { value: 12, of: 12, label: 'afirmaciones de custodia reproducidas', detail: 'de 12 recalculadas desde los archivos originales' },
  { value: 2, of: 2, label: 'sesiones con atribución verificada', detail: 'de 2, por una técnica independiente a la del agente' },
  { value: 3, of: 3, label: 'hallazgos bloqueantes cerrados', detail: 'de 3 que encontró la prueba de estrés' },
  { value: 10, of: 10, label: 'límites declarados', detail: 'a la vista, no en letra pequeña', segments: [{ value: 4, label: 'del equipo' }, { value: 6, label: 'al auditarse' }] },
];

export const correctionsTitle = 'Lo que se corrigió al auditarse';
export const correctionsLead = 'Al recalcular las métricas desde los archivos originales, cuatro afirmaciones no se sostuvieron. Se dejan a la vista a propósito: el valor de un sistema que promete no inventar depende de que su documentación tampoco lo haga.';
export const corrections: { claim: string; status: string; now: string }[] = [
  { claim: 'Pitch de 215,2 · 115,8 · 128,4 · 224,6 Hz', status: 'Corregido', now: '191,9 · 101,8 · 99,8 · 201,4 Hz, medidos' },
  { claim: 'Similitud coseno de 0,9421 y 0,9514', status: 'Reclasificada', now: 'Criterio de diseño, no medición' },
  { claim: 'Tasa de error de diarización de 0,00 %', status: 'Retirada', now: 'No hay anotación humana de referencia con la cual calcularla' },
  { claim: 'Relación señal-ruido de 24,8 y 23,9 dB', status: 'Retirada', now: 'El audio es sintético y no tiene piso de ruido medible' },
];

export const askedTitle = 'Si preguntan…';
export const askedLead = 'Las preguntas previsibles y dónde está la respuesta.';
export const asked: { question: string; answer: string; docId?: string; where?: string }[] = [
  { question: '¿Esto realmente funciona o es una maqueta?', answer: '24 conversaciones de las corridas agénticas, con su identificador, pasos y llamadas a herramientas.', where: 'En el repositorio: Dossier/soporte_forense' },
  { question: '¿Cómo sé que la IA no inventó nada?', answer: 'Cada hallazgo estructurado lleva su cita textual y su marca de tiempo, contrastables contra el audio.', docId: 'declaracion' },
  { question: '¿Los audios son auténticos?', answer: '12 de 12 afirmaciones de custodia reproducidas. Y se declara que son sintéticos.', docId: 'verificacion' },
  { question: '¿Cómo distinguen quién habla?', answer: 'Con una nota en solitario del profesional como ancla; verificado por vía independiente en 2 de 2 sesiones.', docId: 'verificacion' },
  { question: '¿Grabaron estudiantes reales?', answer: 'No. Audio sintético, y la declaración explica por qué.', docId: 'declaracion' },
  { question: '¿Son 42 sesiones reales?', answer: 'Dos de punta a punta y 40 replicadas. Se explica por qué y qué consecuencia tiene para las cifras.', docId: 'declaracion' },
  { question: '¿Qué no probaron?', answer: 'Diez límites declarados.', docId: 'declaracion' },
  { question: '¿Encontraron fallas en su propio diseño?', answer: 'Diez, y cada una con su estado y el criterio para comprobarlo.', docId: 'hallazgos' },
  { question: '¿Esto no discrimina a algún grupo?', answer: 'El hallazgo 4: un sesgo contra becarios que el equipo detectó y corrigió.', docId: 'hallazgos' },
];

export const verifyTitle = 'Comprobarlo por cuenta propia';
export const verifyLead = 'Cuatro comandos permiten verificar lo central sin creer en el equipo. Se ejecutan desde la raíz del repositorio.';
export const verifyCommands: { id: string; label: string; command: string }[] = [
  { id: 'huella', label: 'Los audios no fueron alterados', command: 'certutil -hashfile "Casos-de-uso/Asesoria-Psicopedagogica/Simulacion/Escucha/PISTA AUDIO/SES_8F3A21C1_PA.mp3" SHA256' },
  { id: 'ffprobe', label: 'Los parámetros del audio son reales', command: 'ffprobe -v quiet -print_format json -show_format "Casos-de-uso/Asesoria-Psicopedagogica/Simulacion/Escucha/PISTA AUDIO/SES_8F3A21C1_PA.mp3"' },
  { id: 'acustica', label: 'Verificación acústica completa', command: 'python Dossier/verificacion_acustica_independiente.py' },
  { id: 'costos', label: 'Modelo de costos', command: 'python Implementacion/modelo_costos_2026.py' },
];
export const verifyClosing = 'La comprobación que más importa: tomar cualquier hallazgo de una auditoría forense, leer su cita textual y su marca de tiempo, y escuchar el audio en ese milisegundo exacto.';

export const costSupport = {
  title: 'Soporte de los costos',
  text: 'Las cifras de Costos salen del estudio de 12 arquitecturas y de su modelo reproducible. El simulador de la web reproduce los resultados del modelo y las pruebas lo comprueban.',
  files: ['Implementacion/ESTUDIO_COSTOS_2026.md', 'Implementacion/modelo_costos_2026.py'],
};

export const readerNotice = {
  scope: 'Documento de evidencia verificable tal como está en el repositorio. Describe el alcance validado del MVP; no aplica a personas reales.',
  redaction: 'Se omiten los nombres de las personas que hicieron de profesional en las sesiones simuladas.',
};
