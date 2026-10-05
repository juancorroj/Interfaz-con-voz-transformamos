import type { Architecture, PriceBook, SimulationInput } from './types';

/**
 * Precios, supuestos y configuraciones del estudio de costos de septiembre de 2026.
 * Copia fiel de `Implementacion/modelo_costos_2026.py`: una prueba compara estas constantes con
 * `modelo_costos_2026_resultados.json` para detectar cualquier diferencia.
 */

export const PRICES_DATE = '2026-09-27';

/** TRM de planeación, deliberadamente conservadora. */
export const TRM_PLANNING = 4200;
/** TRM observada el 2026-09-27, solo como referencia (la fuente es el comentario del modelo). */
export const TRM_OBSERVED = 3306.86;

/** Sesiones al año que la Universidad podría llegar a atender en Asesoría, y volumen presupuestado. */
export const SESSIONS_REAL = 10_920;
export const SESSIONS_BUDGET = 14_000;
export const SESSIONS_INSTITUTIONAL = 50_000;

/** Duración de la sesión modelada: el caso superior (40 minutos), para no subestimar. */
export const AUDIO_MINUTES_DEFAULT = 40;

export const priceBook: PriceBook = {
  tokensAudioPerSecond: 25,
  textInputTokens: 10_500,
  outputTokens: 6_000,
  meshFactor: 3.4,
  models: {
    'gemini-3.8-flash': { audio: 1.5, in: 1.5, out: 7.5, introFactor: 0.5, note: 'Tarifa plena desde 2027-01-01. Hasta 2026-12-31 cuesta la mitad' },
    'gemini-3.5-flash-lite': { audio: 0.3, in: 0.3, out: 2.5, note: '' },
    'gemini-3.1-flash-lite': { audio: 0.5, in: 0.25, out: 1.5, note: '' },
    'claude-haiku-4.5': { audio: null, in: 1, out: 5, note: 'Requiere ASR externo' },
    'claude-sonnet-5': { audio: null, in: 2, out: 10, note: 'Requiere ASR externo' },
    'gpt-6-luna': { audio: null, in: 0.1, out: 0.5, note: 'Requiere ASR externo' },
    'gpt-6-sol': { audio: null, in: 2, out: 10, note: 'Requiere ASR externo' },
    'deepseek-v4.1-flash-pico': { audio: null, in: 0.3, out: 1.2, note: '01-04 y 06-10 UTC L-V' },
    'deepseek-v4.1-flash-valle': { audio: null, in: 0.15, out: 0.6, note: 'Resto del tiempo (-50%)' },
    'deepseek-v4-pro-valle': { audio: null, in: 0.66, out: 1.98, note: '' },
  },
  asr: {
    'whisper-local-gpu': 0,
    'gpt-4o-mini-transcribe': 0.003,
    'gpt-4o-transcribe': 0.006,
    'whisper-api': 0.006,
  },
};

/** Nombres legibles de los motores de transcripción. */
export const asrLabels: Record<string, string> = {
  'whisper-local-gpu': 'Whisper en capacidad de cómputo propia',
  'gpt-4o-mini-transcribe': 'gpt-4o-mini-transcribe (API)',
  'gpt-4o-transcribe': 'gpt-4o-transcribe (API)',
  'whisper-api': 'Whisper (API)',
};

export const architectures: Architecture[] = [
  { id: 'gemini-38-flash', name: 'Gemini 3.8 Flash (nativo multimodal)', modelKey: 'gemini-3.8-flash', asrKey: null, ficha: 'validacion' },
  { id: 'gemini-35-flash-lite', name: 'Gemini 3.5 Flash-Lite (nativo)', modelKey: 'gemini-3.5-flash-lite', asrKey: null, ficha: 'intermedia' },
  { id: 'gemini-31-flash-lite', name: 'Gemini 3.1 Flash-Lite (nativo)', modelKey: 'gemini-3.1-flash-lite', asrKey: null },
  { id: 'gpt6-luna-whisper', name: 'GPT-6 Luna + Whisper local', modelKey: 'gpt-6-luna', asrKey: 'whisper-local-gpu', ficha: 'mas-economica' },
  { id: 'gpt6-luna-mini', name: 'GPT-6 Luna + gpt-4o-mini-transcribe', modelKey: 'gpt-6-luna', asrKey: 'gpt-4o-mini-transcribe' },
  { id: 'deepseek-flash-valle', name: 'DeepSeek V4.1 Flash (valle) + Whisper local', modelKey: 'deepseek-v4.1-flash-valle', asrKey: 'whisper-local-gpu' },
  { id: 'deepseek-flash-pico', name: 'DeepSeek V4.1 Flash (pico) + Whisper local', modelKey: 'deepseek-v4.1-flash-pico', asrKey: 'whisper-local-gpu' },
  { id: 'deepseek-pro-valle', name: 'DeepSeek V4 Pro (valle) + Whisper local', modelKey: 'deepseek-v4-pro-valle', asrKey: 'whisper-local-gpu' },
  { id: 'haiku-whisper', name: 'Claude Haiku 4.5 + Whisper local', modelKey: 'claude-haiku-4.5', asrKey: 'whisper-local-gpu' },
  { id: 'haiku-mini', name: 'Claude Haiku 4.5 + gpt-4o-mini-transcribe', modelKey: 'claude-haiku-4.5', asrKey: 'gpt-4o-mini-transcribe' },
  { id: 'sonnet-mini', name: 'Claude Sonnet 5 + gpt-4o-mini-transcribe', modelKey: 'claude-sonnet-5', asrKey: 'gpt-4o-mini-transcribe' },
  { id: 'gpt6-sol', name: 'GPT-6 Sol + gpt-4o-transcribe', modelKey: 'gpt-6-sol', asrKey: 'gpt-4o-transcribe', ficha: 'mas-costosa' },
];

/** La base de la ficha: la configuración de la validación, 14.000 sesiones, TRM de planeación y tarifa plena. */
export const baselineInput: SimulationInput = {
  architectureId: 'gemini-38-flash',
  sessionsPerYear: SESSIONS_BUDGET,
  trm: TRM_PLANNING,
  audioMinutes: AUDIO_MINUTES_DEFAULT,
  tariff: 'plena',
  asrOverride: null,
  scope: 'malla',
  peopleHours: null,
  hourlyCop: null,
};
