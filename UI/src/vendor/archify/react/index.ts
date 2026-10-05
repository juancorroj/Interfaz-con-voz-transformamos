// Punto de entrada del adaptador React. Se mantiene separado del barril
// principal para que el mockup vanilla nunca arrastre React en su grafo de
// importaciones.
export { DiagramaProceso, type PropsDiagramaProceso } from './DiagramaProceso.js';
export { usarSimulacion, type ControlesSimulacion } from './usarSimulacion.js';
