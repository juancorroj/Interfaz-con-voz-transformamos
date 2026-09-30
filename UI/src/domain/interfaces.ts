// ==============================================================================
// CONTRATOS E INTERFACES DE DOMINIO (ISP - Interface Segregation Principle)
// Ecosistema: ResonancIA — Universidad de La Sabana
// Frameworks: MAPECI v1.2.0 & MARCA-IA v2.0.0
// ==============================================================================

export type PyramidTier = 'NIVEL_1_PULL' | 'NIVEL_2_HOTL' | 'NIVEL_3_HITL';

export type CaseTypology =
  | 'PREVENTIVO'
  | 'DEMANDA_INVERTIDA'
  | 'PERIODO_PRUEBA'
  | 'BECARIO'
  | 'MOTIVO_FACHADA';

export type EmotionalVulnerability = 'BAJO' | 'MEDIO' | 'ALTO';

export type CommitmentStatus = 'PENDIENTE' | 'CUMPLIDO' | 'INCUMPLIDO';

export type CommitmentRole = 'ESTUDIANTE' | 'ASESOR' | 'UNIDAD_EXTERNA';

export type UserRole =
  | 'ASESOR_LILIAM'
  | 'DIRECTOR_MECATRONICA'
  | 'DIRECTOR_DERECHO'
  | 'DIRECTOR_MEDICINA'
  | 'BIENESTAR_CENTRAL';

export interface ICommitment {
  id_compromiso: string;
  id_sesion: string;
  responsable: CommitmentRole;
  categoria_compromiso: string;
  descripcion_accion: string;
  plazo_fecha: string | null;
  resultado_verificable: string;
  estado_compromiso: CommitmentStatus;
  fecha_registro: string;
}

export interface IVerbatimQuote {
  id_hallazgo: string;
  categoria: string;
  afirmacion: string;
  cita: string;
  fact_score: number;
  sensible_l4: boolean;
}

export interface ITeamsDraft {
  id_borrador: string;
  copy_propuesto: string;
  palabras: number;
  estado: 'PENDIENTE_REVISION' | 'APROBADO_ENVIADO' | 'DESCARTADO';
}

export interface ICertificateData {
  codigo_verificacion_digital: string;
  id_estrategia: string;
  id_sujeto_anonimizado: string;
  codigo_programa: string;
  sesiones_completadas: number;
  sesiones_ahorradas: number;
  horas_liberadas: number;
  tasa_cumplimiento_final: number;
  justificacion: string;
  firma_digital_asesor: string;
  fecha_emision: string;
  aceptado_secretaria_academica: boolean;
}

export interface IStudentCaseData {
  id_estrategia: string;
  id_sesion: string;
  id_sujeto_anonimizado: string;
  id_asesor: string;
  codigo_programa: string;
  facultad_id: string;
  periodo_academico: string;
  es_becario: boolean;
  tipo_beca: string;
  condicion_permanencia: string;
  isrpp_score: number;
  isrpp_base: number;
  vulnerabilidad_emocional: EmotionalVulnerability;
  certeza_vocacional: number;
  riesgo_financiero: number;
  flag_motivo_fachada: number;
  motivo_declarado: string;
  motivo_raiz_desocultado: string;
  cadencia_k_base: number;
  cadencia_k_revisado: number;
  horas_liberadas: number;
  tasa_compromisos: number;
  elegible_cierre_anticipado: boolean;
  nivel_piramide: PyramidTier;
  tipologia_caso: CaseTypology;
  score_uad: number;
  es_prioridad_preferente: boolean;
  estado_caso: 'ACTIVO' | 'EN_SEGUIMIENTO' | 'DESESCALADO_EXITOSO' | 'REMITIDO_EXTERNO';
  token_ciego: string;
  compromisos: ICommitment[];
  citas_verbatim: IVerbatimQuote[];
  borrador_teams: ITeamsDraft;
  certificado_cierre?: ICertificateData;
}
