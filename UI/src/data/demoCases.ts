export type DemoAction = { id: string; text: string; owner: string; done: boolean };
export type DemoCase = {
  id: string; name: string; program: string; need: string; signal: string;
  sessions: { title: string; said: string; observed: string; proposed: string; next: string }[];
  actions: DemoAction[]; draft: string; reviewed: boolean; closed: boolean;
};
export const demoCases: DemoCase[] = [
  {
    id: 'DEMO-001', name: 'Alex', program: 'Ingeniería',
    need: 'Organizar las entregas y probar una estrategia de estudio.',
    signal: 'Revisar con Alex si el plan semanal se ajusta a su carga de trabajo. Es una pregunta pendiente de valoración, no un diagnóstico.',
    sessions: [
      { title: 'Primer encuentro', said: 'Se me juntan las entregas y no sé por dónde empezar.', observed: 'Alex identifica dos entregas cercanas y solicita apoyo para planificar.', proposed: 'Probar un calendario semanal y consultar una tutoría.', next: 'Revisar el calendario y confirmar si logró consultar la tutoría.' },
      { title: 'Siguiente encuentro', said: 'El calendario me ayudó a empezar; todavía no he confirmado la tutoría.', observed: 'Alex trae un calendario de ejemplo y señala una gestión pendiente.', proposed: 'Ajustar el plan con Alex y revisar las opciones de tutoría.', next: 'Confirmar la tutoría y conversar sobre cómo funciona el plan ajustado.' },
    ],
    actions: [
      { id: 'alex-calendario', text: 'Probar el calendario semanal.', owner: 'Alex', done: true },
      { id: 'alex-tutoria', text: 'Consultar disponibilidad de tutoría.', owner: 'Alex', done: false },
      { id: 'alex-seguimiento', text: 'Acordar el próximo seguimiento con Alex.', owner: 'Profesional', done: false },
    ],
    draft: 'Hola, Alex. En nuestro siguiente encuentro podemos revisar cómo te funcionó el calendario y retomar la consulta de tutoría que quedó pendiente. ¿Qué te gustaría priorizar?',
    reviewed: false, closed: false,
  },
  {
    id: 'DEMO-002', name: 'Sam', program: 'Derecho',
    need: 'Encontrar una forma de preparar lecturas antes de clase.',
    signal: 'Preguntar qué formato de preparación le resulta más útil. No hay una conclusión sobre sus capacidades.',
    sessions: [{ title: 'Primer encuentro', said: 'Quiero llegar a clase con mis preguntas mejor organizadas.', observed: 'Sam propone usar una ficha breve para preparar cada lectura.', proposed: 'Probar una ficha con ideas y preguntas antes de una clase.', next: 'Conversar sobre la utilidad de la ficha en el siguiente encuentro.' }],
    actions: [{ id: 'sam-ficha', text: 'Probar una ficha de lectura y anotar qué resultó útil.', owner: 'Sam', done: false }],
    draft: 'Hola, Sam. Podemos retomar la ficha de lectura que acordamos y revisar juntos qué te resultó útil. La ajustamos según tu experiencia.',
    reviewed: false, closed: false,
  },
];
