import type { FaqItem } from '../types';

/**
 * Preguntas frecuentes. Cada respuesta se redacta solo con lo que dicen la ficha
 * técnica o los documentos del repositorio; lo que está por definir se responde
 * como tal. `linksTo` es una ruta de sección (`seccion` o `seccion/sub`) y solo se
 * ofrece si esa página existe.
 */

export const faqIntro = {
  eyebrow: 'PREGUNTAS FRECUENTES',
  title: 'Lo que más suele preguntarse.',
  /** El título partido en renglones; el último tramo va resaltado. */
  titleLines: ['Lo que más suele'],
  titleAccent: 'preguntarse.',
  lead: 'Respuestas cortas, con su origen en la ficha técnica y un enlace a la página donde se desarrollan.',
};

export const faqItems: FaqItem[] = [
  // ---------- Qué es ----------
  { id: 'que-es', topic: 'Qué es', question: '¿Qué es ResonancIA en pocas palabras?', source: 'Ficha · Descripción', linksTo: 'solucion',
    answer: 'Un ecosistema inteligente de escucha, comprensión y realimentación que convierte las conversaciones que ya ocurren en la Universidad en información útil para acompañar mejor a las personas, fortalecer la toma de decisiones y construir memoria institucional.' },
  { id: 'chatbot-transcriptor', topic: 'Qué es', question: '¿Es un chatbot, un transcriptor, un tablero o una automatización? ¿En qué se diferencia?', source: 'Ficha · Diferenciación', linksTo: 'distintos',
    answer: 'No es ninguna de las cuatro. No conversa con nadie; la transcripción es solo el insumo; un tablero reporta lo que ocurrió y una automatización ejecuta. ResonancIA opera alrededor de la conversación, entrega información estructurada y verificada, y nada se ejecuta sin decisión profesional.' },
  { id: 'canal-nuevo', topic: 'Qué es', question: '¿Por qué no crea un canal nuevo?', source: 'Ficha · Descripción e innovación', linksTo: 'solucion',
    answer: 'Porque cada canal adicional compite por la misma atención y produce fatiga: la respuesta cae y, con ella, la calidad de lo que se escucha. ResonancIA se instala sobre las conversaciones que ya ocurren (asesorías, entrevistas, reuniones, comités) y el proceso no cambia.' },

  // ---------- Cómo funciona ----------
  { id: 'tres-momentos', topic: 'Cómo funciona', question: '¿Qué pasa en cada momento: escuchar, comprender y realimentar?', source: 'Ficha · ¿Cómo funciona?', linksTo: 'solucion',
    answer: 'Escuchar: agentes procesan voz, texto o transcripciones y estructuran la información que el dueño del proceso definió que necesita. Comprender: los equipos de analítica y el dueño del proceso interpretan, no la IA. Realimentar: los hallazgos vuelven como acción (un seguimiento, un mensaje para revisión, un recurso, acceso a información analítica), siempre con decisión profesional.' },
  { id: 'ia-interviene', topic: 'Cómo funciona', question: '¿La IA interviene en la conversación?', source: 'Ficha · Decisiones de diseño', linksTo: 'asesoria/proceso',
    answer: 'No. ResonancIA no interviene la conversación, no aplica guiones, no la interrumpe ni la puntúa: opera alrededor de ella, nunca dentro. La conversación sigue siendo humana, cálida y sin guiones rígidos.' },
  { id: 'quien-interpreta', topic: 'Cómo funciona', question: '¿Quién interpreta la información, la IA o las personas? ¿Por qué?', source: 'Ficha · Innovación 1', linksTo: 'distintos',
    answer: 'Las personas: los equipos de analítica institucional y el dueño del proceso. Es una decisión de diseño, no una limitación técnica. Un modelo puede reproducir un sesgo a escala y con apariencia de objetividad; una persona responsable puede explicar su criterio y cambiarlo.' },
  { id: 'inventar', topic: 'Cómo funciona', question: '¿Cómo se evita que la IA invente cosas?', source: 'Ficha · Innovación 2', linksTo: 'distintos',
    answer: 'Un verificador agéntico independiente exige que todo hallazgo esté respaldado por una cita textual de la conversación. Lo que no se puede sustentar se descarta antes de llegar a la base de datos.' },
  { id: 'memoria-activa', topic: 'Cómo funciona', question: '¿Qué es la memoria institucional activa?', source: 'Ficha · Descripción e innovación 4', linksTo: 'solucion',
    answer: 'Es el ciclo que se alimenta de sí mismo: se escucha, se estructura y se comprende, se decide y se realimenta, y se vuelve a escuchar. Como lo conversado queda estructurado y trazable hasta su origen, también puede releerse con dimensiones que no existían cuando ocurrió.' },

  // ---------- Personas y ética ----------
  { id: 'vigilar', topic: 'Personas y ética', question: '¿Se usa lo que digo para vigilar, juzgar o sancionar?', source: 'Ficha · Beneficios y Marco legal', linksTo: 'etica',
    answer: 'No. La información existe para acompañar, nunca para vigilar, juzgar, clasificar, perfilar ni sancionar. Esa restricción define qué se almacena, quién accede y qué queda fuera del alcance analítico. En la escucha a profesores y administrativos, además, no puede alimentar evaluaciones punitivas ni procesos disciplinarios.' },
  { id: 'consentimiento', topic: 'Personas y ética', question: '¿Se necesita mi consentimiento?', source: 'Ficha · Decisiones de diseño y Fase 1', linksTo: 'etica',
    answer: 'Sí. El consentimiento informado es condición de existencia del proceso, no un trámite posterior. Su mecanismo concreto debe aprobarlo la Universidad con los avales éticos y jurídicos (Fase 1 del plan). Para Asesoría existe un borrador de guion de consentimiento, pendiente de revisión de la Dirección Jurídica, de la líder del proceso y del Comité de Ética.' },
  { id: 'riesgo', topic: 'Personas y ética', question: '¿Qué pasa si alguien expresa una situación de riesgo?', source: 'Ficha · Señal de riesgo', linksTo: 'etica',
    answer: 'Ningún agente actúa por su cuenta: no se envían mensajes automáticos a la persona. La señal se entrega a la interfaz del profesional responsable y se marca para revisión preferente. El diseño distingue el malestar cotidiano del riesgo real y, en la escucha a colaboradores, el reporte no se comparte con la jefatura inmediata.' },
  { id: 'quien-ve', topic: 'Personas y ética', question: '¿Quién puede ver la información? ¿Se anonimiza?', source: 'Ficha · Marco legal', linksTo: 'etica',
    answer: 'El acceso es por roles. La analítica institucional trabaja sobre información disociada de la identidad; la posibilidad de vincular un hallazgo con una persona reside únicamente en el ámbito del profesional responsable, bajo secreto profesional.' },
  { id: 'audio', topic: 'Personas y ética', question: '¿Se conserva el audio?', source: 'Ficha · Costos y Marco legal', linksTo: 'costos',
    answer: 'Está por definir. Conservarlo o no es una decisión económica y ética: descartarlo una vez verificada la transcripción abarata y reduce el riesgo sobre información sensible, pero la definición corresponde al dueño y responsable del proceso, con el concepto jurídico correspondiente.' },

  // ---------- Evidencia ----------
  { id: 'probado', topic: 'Evidencia', question: '¿Está probado? ¿Con personas reales?', source: 'Ficha · Dónde funciona', linksTo: 'asesoria/validacion',
    answer: 'Se probó en un escenario simulado, no con personas reales. Se procesaron 42 sesiones simuladas: dos corrieron de punta a punta desde audio sintético y cuarenta se replicaron en texto. La conexión en vivo con Microsoft Teams está diseñada, pero no desplegada.' },
  { id: 'por-que-asesoria', topic: 'Evidencia', question: '¿Por qué se eligió Asesoría Psicopedagógica?', source: 'Ficha · Dónde funciona', linksTo: 'asesoria/resumen',
    answer: 'Porque es el escenario más exigente: alta sensibilidad humana, secreto profesional y conversación abierta sin formato. La idea es que, si el marco resiste ahí, está preparado para resistir en cualquier parte.' },
  { id: 'otros-publicos', topic: 'Evidencia', question: '¿Qué hay de los otros públicos? ¿Por qué no se ejecutaron?', source: 'Ficha · Cómo se extiende', linksTo: 'publicos',
    answer: 'Para graduados, aliados, profesores y administrativos se diseñaron las metodologías y las mallas, pero no se ejecutaron, y no por falta de tiempo sino por coherencia: prometer cómo escuchar a un público antes de que su dueño de proceso diga qué quiere escuchar, por qué canal y para qué, rompería uno de los principios de la propuesta.' },
  { id: 'reutilizacion', topic: 'Evidencia', question: '¿Qué significa «42 % a 61 % reutilizado»?', source: 'Ficha · Innovación 5', linksTo: 'asesoria/validacion',
    answer: 'Al diseñar las cinco mallas se comprobó que entre el 42 % y el 61 % de cada malla nueva se apoya en piezas ya construidas (orquestación, auditoría, persistencia, guardarraíles). En los casos más cercanos al validado, la reutilización proyectada llega al 65 %–85 %. Lo que se construye son las fichas temáticas propias de cada dominio.' },

  // ---------- Implementación ----------
  { id: 'cuanto-tarda', topic: 'Implementación', question: '¿Cuánto tardaría una primera operación real?', source: 'Ficha · Tiempos', linksTo: 'implementacion',
    answer: 'Entre cuatro y cinco meses desde la decisión de habilitación; un primer ciclo completo con resultados medidos tomaría un semestre académico. Los tiempos suponen dedicación efectiva del equipo y dependen del cierre de la Fase 1.' },
  { id: 'por-donde', topic: 'Implementación', question: '¿Por dónde conviene empezar?', source: 'Ficha · Fase 1', linksTo: 'implementacion',
    answer: 'El equipo sugiere avanzar de dentro hacia afuera: estudiantes (entrevista, servicios de bienestar, asesorías), luego profesores y administrativos y, después, graduados y aliados. Es una sugerencia, no una decisión: la priorización estratégica corresponde a la Universidad.' },
  { id: 'que-se-necesita', topic: 'Implementación', question: '¿Qué se necesita de la Universidad y qué puede retrasar el plan?', source: 'Ficha · Fase 1 y Condiciones', linksTo: 'implementacion',
    answer: 'Definir prioridades, activar a los equipos de Inteligencia Artificial y de Analítica, acordar con Tecnologías el gobierno de la información y obtener los avales éticos y jurídicos. Pueden alterar el plan la aprobación presupuestal, la disponibilidad del equipo profesional, las definiciones de arquitectura institucional, la disponibilidad de los dueños de proceso y el calendario académico.' },
  { id: 'responsables', topic: 'Implementación', question: '¿Quién es responsable de qué?', source: 'Ficha · Responsabilidad del modelo', linksTo: 'implementacion',
    answer: 'No se crea una figura ni una unidad nueva. Los agentes son responsabilidad técnica del equipo de Inteligencia Artificial; las capacidades analíticas, del equipo de Analítica institucional; y el dueño de cada proceso responde por qué se escucha, para qué se usa esa información y qué realimentación se devuelve.' },

  // ---------- Costos ----------
  { id: 'cuanto-cuesta', topic: 'Costos', question: '¿Cuánto costaría y de qué depende?', source: 'Ficha · Costos', linksTo: 'costos',
    answer: 'En Asesoría, sobre 14.000 sesiones al año, operar un año cuesta entre ochocientos mil y sesenta y cuatro millones de pesos, según la configuración de modelos que se elija; la usada en la validación cuesta unos $30,1 millones. Las cifras parten de supuestos conservadores, así que corregirlos baja el número, no lo sube.' },
  { id: 'rubro-mayor', topic: 'Costos', question: '¿Cuál es el rubro más grande?', source: 'Ficha · Costos', linksTo: 'costos',
    answer: 'Las horas de las personas, que no aparecen en ninguna factura. La experticia ya está dentro de la Universidad y no se requiere consultoría externa de diseño; lo que debe presupuestarse es el respaldo operativo del equipo interno. El costo de la inteligencia artificial no es el rubro principal.' },
  { id: 'plataforma', topic: 'Costos', question: '¿Se compra una plataforma o se contrata un proveedor nuevo?', source: 'Ficha · Cómo financiarlo', linksTo: 'costos',
    answer: 'No. Se utilizan la infraestructura y las licencias ya contratadas, incluido el ecosistema de nube sobre el que se construyen la analítica avanzada y el lago de datos institucional. Ningún proveedor nuevo, ningún contrato nuevo.' },

  // ---------- Alcance ----------
  { id: 'que-no-hace', topic: 'Alcance', question: '¿Qué NO hace ResonancIA?', source: 'Ficha · Frontera e innovación', linksTo: 'solucion',
    answer: 'No reemplaza al profesional ni altera la esencia de los procesos; no conversa con las personas; no genera la analítica ni tiene la última palabra sobre la realimentación; y nunca se usa para vigilar, juzgar, perfilar ni sancionar.' },
  { id: 'que-falta', topic: 'Alcance', question: '¿Qué falta por hacer?', source: 'Ficha · Madurez y Fase 0', linksTo: 'implementacion',
    answer: 'Acordar el gobierno de la información, definir dónde empezar, validar la propuesta con cada dueño de proceso, formar a los equipos y acompañar el paso de un entorno simulado a conversaciones reales. La validación jurídica formal, el mecanismo de consentimiento y la política de retención corresponden a las instancias de la Universidad.' },

  // ---------- Equipo ----------
  { id: 'quien-esta-detras', topic: 'Equipo', question: '¿Quién está detrás de esta propuesta?', source: 'Ficha · Equipo', linksTo: 'equipo',
    answer: 'El equipo ResonancIA: Gabriel Gerardo Amaya Becerra, Juan Esteban Cortés Rojas y Camilo Antonio Roncancio Camacho, integrantes administrativos de la Universidad. El caso de Asesoría se co-construyó con el equipo de Asesoría Psicopedagógica.' },
];
