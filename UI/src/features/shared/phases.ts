import { AudioLines, Brain, HeartHandshake } from 'lucide-react';
import agents from '../../data/agents.json';

export type Agent = typeof agents[number];

export const phases = [
  { id: 'escucha', title: 'Escucha', method: 'MAPEA-IA', icon: AudioLines, description: 'Captura y estructuración asistida, con autorización y agentes adecuados al proceso y a sus fuentes.' },
  { id: 'analitica', title: 'Comprensión', method: 'MAPECI / RADAR', icon: Brain, description: 'El equipo humano de Analítica construye indicadores y análisis junto al área, según su necesidad.' },
  { id: 'respuesta', title: 'Realimentación', method: 'MARCA-IA', icon: HeartHandshake, description: 'El responsable del proceso define las acciones, con apoyo de agentes o automatizaciones cuando corresponda.' },
];
