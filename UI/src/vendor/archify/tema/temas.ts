import { TemaDiagrama, type PaletaDiagrama } from './TemaDiagrama.js';

/** Tokens compartidos: tipografía y estructura (fondo oscuro institucional). */
const BASE = {
  superficie: 'rgba(19, 29, 50, 0.82)',
  superficieSistema: 'rgba(13, 21, 38, 0.72)',
  borde: 'rgba(148, 173, 209, 0.16)',
  estructura: 'rgba(148, 173, 209, 0.22)',
  tintaTitulo: '#f4f7fc',
  tintaDetalle: '#9fb1cc',
  tintaMeta: '#6b7d9c',
} as const;

/**
 * Proceso actual. Las etapas humanas van en gris institucional —no están mal
 * hechas, simplemente ocurren sin memoria— y el color se reserva para lo que
 * destruye conocimiento.
 */
const PALETA_FRACTURA: PaletaDiagrama = {
  ...BASE,
  acentoEtapa: '#7d8fad',
  acentoCritico: '#F2564B',
  acentoPositivo: '#22C58B',
  acentoSistema: '#6b7d9c',
};

/**
 * Con ResonancIA. Las etapas humanas recuperan el azul de marca —siguen siendo
 * las protagonistas— y el teal queda para el carril del sistema.
 */
const PALETA_RESONANCIA: PaletaDiagrama = {
  ...BASE,
  acentoEtapa: '#4F7CF7',
  acentoCritico: '#F5A623',
  acentoPositivo: '#22C58B',
  acentoSistema: '#1FC8B8',
};

export const temaFractura = new TemaDiagrama('fractura-oscuro', PALETA_FRACTURA);
export const temaResonancia = new TemaDiagrama('resonancia-oscuro', PALETA_RESONANCIA);

export { TemaDiagrama, conAlfa, type PaletaDiagrama } from './TemaDiagrama.js';
