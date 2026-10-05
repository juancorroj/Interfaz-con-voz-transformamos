import type { TitledText } from '../types';

/**
 * Contenido de «Costos». Fuente: ficha técnica · Costos. Las cifras de esta parte de la página son
 * las de la ficha, citadas tal cual; el simulador calcula las suyas aparte.
 */

export const costsIntro = {
  eyebrow: 'COSTOS',
  title: 'El costo de la inteligencia artificial no es el rubro principal.',
  titleLines: ['El costo de la inteligencia', 'artificial no es'],
  titleAccent: 'el rubro principal.',
  lead: 'Esta página tiene dos partes. Primero, la base: las cifras de la ficha, tal como se presentaron. Después, un simulador que parte de esa base y permite ver qué sucede cuando cambian los supuestos.',
};

export const costsIndex = [
  { id: 'base', label: 'La base de la ficha' },
  { id: 'simulador', label: 'Simulador' },
  { id: 'estructura', label: 'Estructura de costos' },
  { id: 'financiacion', label: 'Cómo financiarlo' },
];

export const base = {
  title: 'La base de la ficha',
  volume: 'A nivel de Asesoría la Universidad puede llegar a atender cerca de 10.920 sesiones al año. Se presupuesta sobre 14.000 para dejar margen.',
  scenarios: [
    { id: 'mas-costosa', value: 4584, label: 'Más costosa evaluada', perSession: '$4.584 COP', annual: '$64,2 millones COP' },
    { id: 'validacion', value: 2153, label: 'Arquitectura usada en la validación', perSession: '$2.153 COP', annual: '$30,1 millones COP' },
    { id: 'intermedia', value: 516, label: 'Intermedia', perSession: '$516 COP', annual: '$7,2 millones COP' },
    { id: 'mas-economica', value: 58, label: 'Más económica evaluada', perSession: '$58 COP', annual: '$800.000 COP' },
  ],
  scaleNote: 'Escala logarítmica: cada marca vale diez veces la anterior. Con una escala lineal, la más económica no se vería.',
  validationTag: 'La de la validación',
  perSessionUnit: 'por sesión',
  margin: {
    title: 'Los supuestos juegan a favor',
    sessions: { label: 'Sesiones al año', plan: 14000, real: 10920, planLabel: 'Se presupuesta', realLabel: 'Las reales' },
    others: [
      { id: 'tarifa', title: 'Tarifa', plan: 'Plena de 2027', real: 'La vigente, menor' },
      { id: 'trm', title: 'Dólar', plan: '$4.200 de planeación', real: 'La actual, menor' },
    ],
    close: 'Cualquier corrección de estos supuestos baja el número, no lo sube.',
  },
  tableLabels: { scenario: 'Escenario', perSession: 'Por sesión', annual: '14.000 sesiones al año' },
  range: 'Operar un año completo del proceso cuesta entre ochocientos mil y sesenta y cuatro millones de pesos, según la configuración que se elija. La que se usó en la validación es la cuarta más costosa de las doce: se priorizó la fidelidad de extracción sobre el precio, porque lo que estaba en juego era comprobar si el método funcionaba. Optimizar es una decisión posterior y el margen es amplio.',
  conservativeTitle: 'Supuestos conservadores',
  conservative: [
    '28 % más sesiones que las reales (14.000 en lugar de 10.920).',
    'La tarifa plena de 2027 en lugar de la vigente.',
    'Una tasa de cambio muy superior a la actual: $4.200 por dólar como TRM de planeación.',
  ],
  conservativeClose: 'Cualquier corrección de estos supuestos baja el número, no lo sube.',
  institutional: 'A escala institucional, procesar 50.000 sesiones al año, cuando haya varios procesos operando de forma simultánea, puede llegar a costar entre $2,9 millones y $107,6 millones de pesos según la configuración elegida.',
  source: 'Fuente: ficha técnica y estudio de costos de septiembre de 2026 (precios al 27 de septiembre).',
};

export const structure = {
  title: 'La estructura completa de costos',
  lead: 'El costo de la inteligencia artificial no es el rubro principal de este proyecto.',
  rows: [
    { kind: 'recurrente', item: 'Inferencia de los modelos', nature: 'Recurrente, variable según volumen', status: 'Calculado' },
    { kind: 'recurrente', item: 'Transcripción de audio', nature: 'Recurrente, variable', status: 'Escenario base: capacidad de cómputo institucional' },
    { kind: 'recurrente', item: 'Infraestructura y almacenamiento', nature: 'Recurrente', status: 'Sobre la nube ya adquirida · por dimensionar con TI' },
    { kind: 'inicial', item: 'Integraciones con Teams, App y sistemas', nature: 'Inversión inicial', status: 'Desarrollo, sin licenciamiento adicional' },
    { kind: 'personas', item: 'Horas de las personas que participan', nature: 'El rubro mayor', status: 'Por acordar' },
    { kind: 'inicial', item: 'Formación del equipo profesional', nature: 'Inversión inicial por cada proceso', status: 'Por dimensionar' },
    { kind: 'inicial', item: 'Gobierno jurídico y ético', nature: 'Inversión inicial', status: 'Por dimensionar' },
    { kind: 'recurrente', item: 'Operación, monitoreo y evolución', nature: 'Recurrente', status: 'Por dimensionar' },
  ],
  groups: [
    { kind: 'recurrente', title: 'Cuesta cada año', hint: 'Recurrentes' },
    { kind: 'inicial', title: 'Se paga al arrancar', hint: 'Inversión inicial' },
    { kind: 'personas', title: 'El rubro mayor', hint: 'No aparece en ninguna factura' },
  ],
  columns: { item: 'Rubro', nature: 'Naturaleza', status: 'Estado' },
  precisionTitle: 'Dos rubros merecen precisión',
  precisions: [
    { id: 'transcripcion', title: 'La transcripción', text: 'Es el componente que más mueve el total: realizada sobre capacidad de cómputo propia, su costo marginal tiende a cero.' },
    { id: 'audio', title: 'La conservación del audio', text: 'Determina el volumen de almacenamiento y es una decisión tanto económica como ética: técnicamente, descartarlo una vez verificada la transcripción abarata y reduce el riesgo sobre información sensible, pero la definición corresponde al dueño del proceso con el concepto jurídico correspondiente.' },
  ] satisfies TitledText[],
  biggestTitle: 'El rubro mayor no aparece en ninguna factura',
  biggest: 'Son las horas de las personas. La experticia ya está dentro de la Universidad y la propuesta se diseñó desde el equipo de analítica institucional, que es quien explotará la información, de modo que no se requiere consultoría externa de diseño, habitualmente el rubro más costoso en proyectos de esta naturaleza. Pero liberar a ese equipo exige cubrir la operación que hoy atiende.',
  biggestClose: 'Lo que se evita es pagar por conocimiento que la Universidad ya tiene; lo que debe presupuestarse es el respaldo operativo.',
};

export const financing = {
  title: 'Cómo financiarlo sin altos costos',
  items: [
    { id: 'plataforma', title: 'No se compra una plataforma', text: 'Se utilizan la infraestructura y las licencias ya contratadas, incluido el ecosistema de nube sobre el que se construyen la analítica avanzada y el lago de datos institucional. Ningún proveedor nuevo, ningún contrato nuevo.' },
    { id: 'arquitectura', title: 'La arquitectura es elegible', text: 'Migrar de la configuración de validación a la económica reduce el costo por sesión casi cuarenta veces sin cambiar el método. Quedan además tres palancas que no se han aplicado: caché de instrucciones, procesamiento por lotes y transcripción propia.' },
    { id: 'escalamiento', title: 'El escalamiento cuesta cada vez menos', text: 'Cada proceso nuevo reutiliza entre el 42 % y el 61 % de lo ya construido, y hasta el 85 % en los casos más cercanos al validado. Desarrollar el segundo caso cuesta menos que el primero.' },
    { id: 'experticia', title: 'No se contrata experticia externa', text: 'Únicamente el respaldo operativo del equipo interno.' },
    { id: 'tramos', title: 'El gasto se compromete por tramos', text: 'El plan avanza por compuertas de decisión: la Universidad habilita una fase, evalúa el resultado y decide con evidencia si continúa. El riesgo financiero se acota a lo autorizado.' },
    { id: 'no-gasta', title: 'Lo que no se gasta', text: 'Ninguna plataforma de escucha adquirida, ningún canal nuevo que difundir y sostener, ningún desarrollo desde cero.' },
  ] satisfies TitledText[],
};

/** Textos del simulador. */
export const simulator = {
  eyebrow: 'SIMULADOR',
  title: 'Cambia un supuesto y mira qué sucede.',
  lead: 'Parte de la base de la ficha. Es una simulación con los precios de septiembre de 2026: sirve para entender qué mueve el costo, no es una cotización.',
  scopeNote: 'Calcula solo el costo de la inteligencia artificial. Los demás rubros de la estructura quedan por dimensionar; las horas de las personas, por acordar. El simulador no redondea el costo por sesión, así que puede diferir en menos del 1 % de las cifras redondeadas de la ficha.',
  hoursNote: 'La ficha no fija este valor. Queda en blanco hasta que se acuerde: no se inventa una cifra.',
  tariffNote: 'La tarifa introductoria (la mitad) solo está documentada para Gemini 3.8 Flash, el modelo de la validación.',
  asrNote: 'Solo aplica a configuraciones con transcripción separada; los modelos multimodales reciben el audio directamente.',
  meshNote: 'La malla de escucha completa cuesta 3,4 veces lo que el agente acústico, según las trazas de la validación.',
  savedEmpty: 'Todavía no hay escenarios guardados. Ajusta los supuestos, ponle un nombre y guárdalo para compararlo después.',
  notPersistent: 'Este navegador no deja guardar datos: los escenarios se conservarán solo mientras la página permanezca abierta.',
};
