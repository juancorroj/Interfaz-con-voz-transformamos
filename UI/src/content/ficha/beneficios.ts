import type { AudienceVision, Benefit } from '../types';

/** Contenido de «Beneficios». Fuente: ficha técnica · Beneficios de la idea. */

export const benefitsIntro = {
  eyebrow: 'BENEFICIOS',
  title: 'Ganan las personas, los procesos y la Universidad.',
  /** El título partido en renglones; el último tramo va resaltado. */
  titleLines: ['Ganan las personas,', 'los procesos y'],
  titleAccent: 'la Universidad.',
  lead: 'ResonancIA genera beneficios en tres niveles. Los que dependen de la operación no se prometen como cifra: se prometen medidos.',
};

/** Los tres niveles del beneficio, de lo más cercano a lo más amplio; el icono y la cuenta los pone la página. */
export const benefitLevels = [
  { id: 'personas', title: 'Para las personas', summary: 'Quien es escuchado y quien escucha: ambos ganan.' },
  { id: 'procesos', title: 'Para los procesos', summary: 'Trazabilidad, patrones visibles y realimentación pertinente.' },
  { id: 'universidad', title: 'Para la Universidad', summary: 'Memoria institucional, analítica como servicio y escalabilidad.' },
];
export const benefitGrowth = 'El beneficio se amplía de un nivel al siguiente';

/** Palabra clave de cada beneficio: una etiqueta corta para ubicarlo de un vistazo. */
export const benefitKeywords: Record<string, string> = {
  voz: 'Voz', respuesta: 'Respuesta', pertinente: 'Pertinencia', consistente: 'Consistencia', libertad: 'Libertad',
  tiempo: 'Tiempo', contexto: 'Contexto', carga: 'Carga mental', respaldo: 'Respaldo', conocimiento: 'Memoria',
  registros: 'Orden', trazabilidad: 'Trazabilidad', dueno: 'Control', articulacion: 'Articulación', patrones: 'Patrones', mejora: 'Mejora', pertinencia: 'Pertinencia',
  memoria: 'Memoria', analitica: 'Analítica', costo: 'Costo', confianza: 'Confianza', rendicion: 'Rendición de cuentas', transversal: 'Alcance', etica: 'Ética',
};

/**
 * Cuándo ocurre cada beneficio personal dentro del encuentro entre dos personas. Es una lectura de presentación
 * de los beneficios de la ficha: no agrega ni cambia ninguno.
 */
export const encounterStages = [
  { id: 'antes', label: 'Antes', hint: 'Llegar preparados', heard: ['voz'], listener: ['contexto', 'carga'] },
  { id: 'durante', label: 'Durante', hint: 'Estar presentes', heard: ['libertad', 'consistente'], listener: ['tiempo'] },
  { id: 'despues', label: 'Después', hint: 'Cerrar el ciclo', heard: ['respuesta', 'pertinente'], listener: ['respaldo', 'conocimiento'] },
];
export const encounterHint = 'Toca un beneficio para leerlo completo.';
export const levelHint = 'Elige un beneficio de la lista para verlo en detalle.';

export const peopleIntro = 'En cada conversación hay dos personas y ambas ganan.';

export const heardTitle = 'Para quien es escuchado';
export const heardBenefits: Benefit[] = [
  { id: 'voz', title: 'Su voz no se pierde y no tiene que repetirla', text: 'Hoy una misma historia puede contarse varias veces ante distintas instancias y cada una conserva solo un fragmento. Con la memoria activa, la persona retoma donde quedó en lugar de empezar de nuevo.' },
  { id: 'respuesta', title: 'Recibe una respuesta, no solo una escucha', text: 'Puede ver qué ocurrió con lo que dijo: un seguimiento, una conexión con un recurso, un ajuste en el proceso, o la explicación de por qué algo no fue posible. Quien comprueba que hablar sirve, vuelve a hablar.' },
  { id: 'pertinente', title: 'Una respuesta más pertinente y mejor conectada', text: 'La escucha estructurada permite enlazar lo conversado con recursos y rutas institucionales y externas que la persona muchas veces no sabía que existían.' },
  { id: 'consistente', title: 'Una atención más consistente', text: 'La calidad de lo que queda registrado y de lo que se le devuelve deja de depender del tiempo que tuvo el profesional para diligenciar la información.' },
  { id: 'libertad', title: 'Puede hablar con libertad', text: 'Lo que expresa no será usado en su contra: nunca para vigilar, juzgar, clasificar, perfilar ni sancionar. Sin esa garantía, cualquier sistema recoge respuestas correctas en lugar de respuestas verdaderas.' },
];

export const listenerTitle = 'Para quien escucha';
export const listenerBenefits: Benefit[] = [
  { id: 'tiempo', title: 'Recupera para la escucha el tiempo del registro', text: 'Es el beneficio más directo y una medida concreta de cuidado hacia quienes dedican su jornada a cuidar a otros.' },
  { id: 'contexto', title: 'Llega al encuentro con contexto, no en blanco', text: 'Dispone de la información previa pertinente según las reglas de acceso de cada proceso, lo que mejora la continuidad del acompañamiento.' },
  { id: 'carga', title: 'Reduce la carga cognitiva de recordar', text: 'Sostener mentalmente los detalles de decenas de casos es un costo invisible que hoy asume la persona.' },
  { id: 'respaldo', title: 'Su criterio queda respaldado y trazable', text: 'Cuando decide algo, queda registro de con qué información lo decidió. Eso protege tanto a quien atiende como a quien es atendido.' },
  { id: 'conocimiento', title: 'Su conocimiento no se va con ella', text: 'Cuando cambia de rol o asume otra responsabilidad, el proceso conserva lo aprendido y quien llega no arranca desde cero.' },
];

export const processBenefits: Benefit[] = [
  { id: 'registros', title: 'Menos dependencia de registros dispersos', text: 'Convierte información que hoy queda fragmentada en insumo utilizable para decidir.' },
  { id: 'trazabilidad', title: 'Más trazabilidad', text: 'Mejora la trazabilidad de lo conversado y de las decisiones asociadas.' },
  { id: 'dueno', title: 'El dueño del proceso define', text: 'Decide qué necesita escuchar, qué necesita medir y para qué usará esa información. La tecnología se configura alrededor de esa definición y no al revés.' },
  { id: 'articulacion', title: 'Una capa que articula lo que ya existe', text: 'Los instrumentos de escucha existentes cumplen fines específicos y no siempre dialogan entre sí. ResonancIA permite trabajarlos de forma integrada cuando el dueño del proceso lo considere clave.' },
  { id: 'patrones', title: 'Hace visibles patrones que nadie veía solo', text: 'Una dificultad que se repite en una cohorte, una asignatura, un momento del semestre o un perfil de vinculación aparece al agregar muchas conversaciones, no al leer una.' },
  { id: 'mejora', title: 'El proceso puede revisarse y mejorar', text: 'Al hacer explícitos criterios que viven solo en la experiencia de quienes lo ejecutan, sus puntos ciegos se vuelven examinables, sin promover discriminaciones.' },
  { id: 'pertinencia', title: 'La realimentación que llega es la pertinente', text: 'Cada propuesta sigue la lógica que el dueño del proceso definió y llega con aquello que la sustenta. El profesional valida, ajusta o descarta: una revisión de minutos, no un análisis rehecho.' },
];

export const universityBenefits: Benefit[] = [
  { id: 'memoria', title: 'Memoria institucional y gestión del conocimiento', text: 'Cuando una persona cambia de rol, el conocimiento relevante del proceso no vuelve a empezar de cero. Eso acelera curvas de aprendizaje y protege la continuidad.' },
  { id: 'analitica', title: 'Evoluciona el paradigma analítico', text: 'De una analítica descriptiva, que cuenta lo que ocurrió, a una Analítica como Servicio diseñada para necesidades concretas y que apoya decisiones posteriores.' },
  { id: 'costo', title: 'Escuchar a un público nuevo cuesta cada vez menos', text: 'Entre el 42 % y el 61 % de cada malla nueva se apoya en piezas ya construidas (orquestación, auditoría, persistencia, guardarraíles). En los casos más cercanos al validado, la reutilización proyectada llega al 65 %–85 %.' },
  { id: 'confianza', title: 'La confianza se vuelve capacidad operativa', text: 'Una institución en la que las personas confían escucha a tiempo: que el estudiante está a punto de desistir, que el aliado dejó de llamar, que el profesor está al límite. Donde no hay confianza, se entera cuando el hecho ya ocurrió.' },
  { id: 'rendicion', title: 'Evidencia para la rendición de cuentas', text: 'Los espacios donde la Universidad devuelve resultados a sus grupos de interés pueden nutrirse de lo que efectivamente se escuchó y de lo que se hizo con ello.' },
  { id: 'transversal', title: 'Una capacidad transversal, no de un área', text: 'El mismo marco opera en acompañamiento estudiantil, graduados, desarrollo profesoral, desarrollo humano y aliados, y puede extenderse a otros públicos como padres de familia o la familia del empleado.' },
  { id: 'etica', title: 'El estándar ético no se renegocia en cada implementación', text: 'La Universidad no tiene que volver a discutir los mínimos éticos cada vez que un área quiera empezar a escuchar: ya vienen incorporados en las piezas que se reutilizan.' },
];

export const audiencesIntro = 'Estos beneficios se derivan de los casos de uso diseñados con y para cada grupo. El de estudiantes está validado; los otros cuatro describen el propósito de escucha que proponemos y que debe confirmarse con cada dueño de proceso.';

export const audienceVisions: AudienceVision[] = [
  { id: 'estudiantes', title: 'Estudiantes', status: 'ejecutado', points: [
    'Que su historia no se fragmente entre instancias y no tengan que reconstruirla cada vez que consultan un nuevo servicio.',
    'Que el acompañamiento tenga continuidad, aunque cambie la persona que atiende.',
    'Que la conexión con los recursos de apoyo institucionales ocurra a tiempo, antes de que la dificultad escale.',
  ] },
  { id: 'graduados', title: 'Graduados', status: 'disenado', points: [
    'Que la relación con la Universidad deje de depender exclusivamente de una encuesta de egreso puntual.',
    'Que lo que expresan sobre su trayectoria profesional se traduzca en una oferta de aprendizaje a lo largo de la vida realmente pertinente.',
  ] },
  { id: 'profesores', title: 'Profesores', status: 'disenado', points: [
    'Que sus necesidades de desarrollo y acompañamiento se identifiquen desde lo que ellos mismos expresan en espacios que ya existen, sin sumar instrumentos de evaluación ni convertir la escucha en un ejercicio punitivo.',
  ] },
  { id: 'administrativos', title: 'Administrativos', status: 'disenado', points: [
    'Que el conocimiento que acumulan sobre su proceso no se pierda cuando cambian de cargo, y que quien llegue no empiece de cero.',
    'Que las sobrecargas y los picos estacionales se vuelvan visibles a tiempo para poder atenderlos.',
  ] },
  { id: 'aliados', title: 'Aliados', status: 'disenado', points: [
    'Que lo que expresan sobre sus retos, brechas y necesidades conecte con las capacidades de la Universidad en un plazo útil para ellos, y no en el ciclo de revisión curricular siguiente.',
  ] },
];
