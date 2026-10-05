import type { LegalNorm, NormBadge, TitledText } from '../types';

/**
 * Contenido de «Ética y marco legal». Fuentes: ficha técnica · Marco legal y buenas prácticas, y
 * `Casos-de-uso/Asesoria-Psicopedagogica/GUION_CONSENTIMIENTO_INFORMADO.md` (borrador de trabajo).
 */

export const ethicsIntro = {
  eyebrow: 'ÉTICA Y MARCO LEGAL',
  title: 'Cada norma se volvió una decisión de diseño.',
  /** El título partido en renglones; el último tramo va resaltado. */
  titleLines: ['Cada norma'],
  titleTail: 'se volvió una ',
  titleAccent: 'decisión de diseño.',
  lead: 'Escuchar conversaciones sensibles exige una base jurídica explícita, no una declaración de buenas intenciones. Antes de construir revisamos el marco aplicable en Colombia y los estándares internacionales de gobernanza de inteligencia artificial, y cada norma se tradujo en una decisión concreta.',
};

export const ethicsIndex = [
  { id: 'normas', label: 'Normas y estándares' },
  { id: 'practica', label: 'En la práctica' },
  { id: 'riesgo', label: 'Señal de riesgo' },
  { id: 'consentimiento', label: 'El consentimiento' },
  { id: 'alcance', label: 'Alcance de la revisión' },
];

/** Sellos de lo que se adoptó. Son el marco que orientó el diseño: no certifican a la propuesta. */
export const normBadgeGroups: { title: string; badges: NormBadge[] }[] = [
  { title: 'Marco colombiano', badges: [
    { id: 'ley-1581', code: 'Ley 1581', year: '2012', caption: 'Habeas Data' },
    { id: 'ley-1090', code: 'Ley 1090', year: '2006', caption: 'Ejercicio de la psicología' },
    { id: 'ley-1010', code: 'Ley 1010', year: '2006', caption: 'Acoso laboral' },
  ] },
  { title: 'Estándares internacionales', badges: [
    { id: 'iso-42001', code: 'ISO/IEC 42001', year: '2023', caption: 'Gestión de IA' },
    { id: 'iso-27001', code: 'ISO/IEC 27001', year: '2022', caption: 'Seguridad de la información' },
    { id: 'nist-rmf', code: 'NIST AI RMF', caption: 'Riesgo en IA' },
    { id: 'ieee-7000', code: 'IEEE 7000', year: '2021', caption: 'Ética en el diseño' },
    { id: 'nist-800-88', code: 'NIST SP 800-88', caption: 'Retención y borrado' },
    { id: 'gdpr-5', code: 'GDPR', year: 'Art. 5', caption: 'Minimización' },
  ] },
];

export const normLabels = {
  notice: 'Estos sellos son el marco que se adoptó para diseñar la solución, no certificaciones que la Universidad o un tercero haya otorgado a ResonancIA. La validación jurídica formal está pendiente.',
  title: 'Qué exige cada norma y cómo se refleja',
  lead: 'Elige una norma o un estándar. A la izquierda, lo que exige; a la derecha, la decisión de diseño que produjo en ResonancIA.',
  demands: 'Qué exige',
  reflected: 'Cómo se refleja en ResonancIA',
};

export const colombianNorms: LegalNorm[] = [
  { id: 'ley-1581', scope: 'colombia', name: 'Ley 1581 de 2012 y Decreto 1377 de 2013 · Protección de datos personales (Habeas Data)',
    demands: 'Autorización previa, expresa e informada; finalidad declarada y limitada; derecho del titular a conocer, actualizar, rectificar y suprimir su información; tratamiento reforzado para datos sensibles.',
    reflected: 'El consentimiento informado es condición de existencia del proceso, no un paso posterior. La finalidad de acompañar, nunca vigilar ni sancionar, está declarada y acota qué se recoge. El acceso opera por roles y el titular conserva sus derechos sobre la información.' },
  { id: 'ley-1090', scope: 'colombia', name: 'Ley 1090 de 2006 · Ejercicio de la psicología',
    demands: 'Reserva y secreto profesional sobre la información obtenida en el ejercicio.',
    reflected: 'La información clínica permanece en el ámbito del profesional tratante. La analítica institucional opera sobre información disociada de la identidad, de modo que el secreto profesional no se ve comprometido por el uso agregado.' },
  { id: 'ley-1010', scope: 'colombia', name: 'Ley 1010 de 2006 · Acoso laboral',
    demands: 'Protección frente al uso de información como instrumento de presión o menoscabo en el entorno de trabajo.',
    reflected: 'En la escucha a profesores y administrativos, la información no puede alimentar evaluaciones punitivas ni procesos disciplinarios. Es la razón por la que el diseño excluye explícitamente los usos de vigilancia y sanción.' },
];

export const internationalStandards: LegalNorm[] = [
  { id: 'iso-42001', scope: 'internacional', name: 'ISO/IEC 42001:2023 · Gestión de sistemas de IA',
    demands: 'Trazabilidad del dato, evaluación de impacto y explicabilidad.',
    reflected: 'Origen de tres piezas centrales: el linaje desde el audio original hasta el dato estructurado; la evaluación de riesgos de inferencia sesgada; y la exigencia de que todo hallazgo sea atribuible a una cita textual verificable.' },
  { id: 'iso-27001', scope: 'internacional', name: 'ISO/IEC 27001:2022 · Seguridad de la información',
    demands: 'Control de acceso granular y arquitectura de confianza cero.',
    reflected: 'Fundamenta el esquema de permisos por rol y la segmentación entre el ámbito del profesional y el ámbito analítico.' },
  { id: 'nist-rmf', scope: 'internacional', name: 'NIST AI Risk Management Framework',
    demands: 'Gestión sistemática del riesgo en sistemas de IA.',
    reflected: 'Orientó las pruebas de tensión que aplicamos sobre nuestro propio diseño antes de cualquier uso real.' },
  { id: 'ieee-7000', scope: 'internacional', name: 'IEEE 7000-2021 · Consideraciones éticas en el diseño',
    demands: 'Método para incorporar valores al diseño, no a posteriori.',
    reflected: 'Sustenta el punto de partida del proyecto: preguntar primero qué es intocable y construir después.' },
  { id: 'nist-800-88', scope: 'internacional', name: 'NIST SP 800-88 · Ciclo de vida y sanitización de medios',
    demands: 'Criterios de retención y eliminación segura de información.',
    reflected: 'Fundamenta la política de retención, incluida la decisión sobre cuánto tiempo conservar el audio original.' },
  { id: 'gdpr-5', scope: 'internacional', name: 'GDPR, artículo 5',
    demands: 'Minimización, limitación de la finalidad y del plazo de conservación.',
    reflected: 'Adoptado como buena práctica, aunque no sea norma aplicable en Colombia: se recoge lo necesario para la finalidad declarada y nada más.' },
];

export const practiceTitle = 'Tres consecuencias operativas';
export const practiceConsequences: TitledText[] = [
  { id: 'finalidad', title: 'La finalidad está acotada y es verificable', text: 'La información se recoge para acompañar y mejorar el proceso. Cualquier uso distinto, enfocado en vigilancia, evaluación punitiva o perfilamiento, queda fuera del diseño y no solo de la política.' },
  { id: 'separados', title: 'La identidad y el análisis viajan separados', text: 'La analítica institucional trabaja sobre información disociada. La posibilidad de vincular un hallazgo con una persona reside únicamente en el ámbito del profesional responsable, bajo secreto profesional.' },
  { id: 'rastreable', title: 'Todo hallazgo es rastreable hasta su origen', text: 'No es solo una garantía técnica contra la invención de datos: es el requisito de explicabilidad que permite que una persona cuestione lo que el sistema afirmó sobre ella.' },
];

export const risk = {
  title: '¿Qué ocurre cuando aparece una señal de riesgo?',
  lead: 'Un sistema que escucha conversaciones sensibles debe responder con precisión qué hace cuando alguien expresa sufrimiento severo, vulneración de derechos o riesgo para su integridad. El diseño lo contempla de forma explícita en todos los públicos, con cuatro reglas.',
  rules: [
    { id: 'nadie-actua', title: 'Ningún agente actúa por su cuenta', text: 'Está prohibido que el sistema envíe mensajes automáticos, correos de autoayuda o notificaciones robóticas a una persona en situación de riesgo. La señal se entrega exclusivamente a la interfaz de trabajo del profesional responsable para su valoración.' },
    { id: 'prioriza', title: 'La señal se prioriza, no se procesa en fila', text: 'Un hallazgo de esta naturaleza se marca para revisión preferente inmediata en lugar de seguir el flujo ordinario.' },
    { id: 'distingue', title: 'Se distingue el malestar cotidiano del riesgo real', text: 'El diseño diferencia la frustración operativa (una herramienta lenta, un trámite engorroso) de expresiones de desesperanza, acoso sistemático o vulneración de la dignidad. Un sistema que confunde ambas cosas satura al equipo profesional y pierde utilidad.' },
    { id: 'no-viaja', title: 'La información no viaja hacia quien podría usarla en contra', text: 'En la escucha a colaboradores, un reporte de esta naturaleza no se comparte con la jefatura inmediata de la persona: queda confinado al nivel de acceso de la unidad responsable del acompañamiento, en coherencia con la Ley 1010 de 2006.' },
  ] satisfies TitledText[],
  demoNote: 'En el panel del profesional de esta web, la señal aparece como «pendiente de valoración»: es solo una indicación para que la persona decida, nunca una acción automática.',
};

/** Del principio a la práctica: el borrador de consentimiento del caso de Asesoría. */
export const consent = {
  title: 'Del principio a la práctica: el consentimiento',
  lead: 'La dueña del proceso lo planteó como un principio de integridad: es sagrado que los estudiantes firmen un consentimiento informado o haya algún mecanismo que blinde. Para que la conversación con Jurídica empiece sobre algo escrito y no sobre una intención, el equipo redactó un borrador para Asesoría.',
  statusTitle: 'Estado: borrador de trabajo',
  status: 'No ha sido revisado ni aprobado por ninguna instancia de la Universidad y no debe usarse con ninguna persona real hasta contar con el aval de la Dirección Jurídica, del Comité de Ética y de la dirección responsable del proceso.',
  principlesTitle: 'Cómo se escribió',
  principles: [
    'Lenguaje de estudiante, no de abogado: si no se entiende en una lectura, no sirve como consentimiento.',
    'Decir qué se hace, no solo pedir permiso.',
    'La negativa no penaliza, y la alternativa existe de verdad.',
    'Revocable en cualquier momento, sin justificar y sin consecuencias.',
    'Sin eufemismos: si se graba, se dice «se graba».',
  ],
  threeThingsTitle: 'Las tres cosas que el asesor aclara antes de empezar',
  threeThings: [
    { id: 'no-evaluar', title: 'No se usa para evaluar, calificar ni sancionar', text: 'Solo sirve para acompañar mejor y para que, si otra persona atiende después, no haya que contar la historia desde cero.' },
    { id: 'secreto', title: 'Está protegido por secreto profesional', text: 'La grabación y lo extraído lo custodia el profesional. Hacia la Universidad solo salen datos sin nombre, para entender qué necesitan los estudiantes en general.' },
    { id: 'decir-no', title: 'Se puede decir que no, ahora o después', text: 'La sesión es exactamente igual: el profesional toma notas a mano, como siempre. Si cambia de opinión, se borra.' },
  ] satisfies TitledText[],
  accessTitle: 'Quién puede ver qué',
  accessCaption: 'De adentro hacia afuera, la información es cada vez menos identificable. Toca un anillo para ver quién accede a él.',
  accessCenter: 'La persona atendida',
  accessWho: 'Quién accede',
  access: [
    { content: 'Audio y transcripción completa', who: 'Únicamente el profesional que atiende, bajo secreto profesional.' },
    { content: 'Temas de salud mental o situaciones delicadas', who: 'Únicamente Bienestar Universitario, con reserva.' },
    { content: 'Acuerdos y plan de trabajo', who: 'El profesional y la propia persona.' },
    { content: 'Datos sin nombre, agregados con los de otros estudiantes', who: 'El equipo de Analítica de la Universidad.' },
  ],
  openTitle: 'Seis decisiones que el borrador deja abiertas',
  openIntro: 'Ninguna la puede resolver el equipo técnico. Están listadas para que la conversación con las instancias competentes tenga agenda desde el primer día.',
  open: [
    { decision: 'Plazo de retención del audio crudo', owner: 'Jurídica y Seguridad de TI' },
    { decision: '¿Autorización por sesión o una vez por semestre con recordatorio?', owner: 'Asesoría Psicopedagógica' },
    { decision: 'Manejo en estudiantes menores de edad (autorización del acudiente)', owner: 'Jurídica' },
    { decision: 'Procedimiento operativo de borrado cuando alguien revoca', owner: 'TI' },
    { decision: '¿Firma en papel, firma digital o aceptación en la App UniSabana?', owner: 'Asesoría y TI' },
    { decision: 'Qué ocurre con lo ya extraído si el estudiante revoca después', owner: 'Jurídica y Asesoría' },
  ],
};

export const reviewScope = {
  title: 'Alcance de esta revisión',
  text: 'Lo anterior es el marco que el equipo adoptó para diseñar la solución y las buenas prácticas que de él se derivaron. La validación jurídica formal, la aprobación del mecanismo de consentimiento informado y la definición final de la política de retención corresponden a las instancias competentes de la Universidad, y hacen parte de la primera fase del plan de implementación.',
};
