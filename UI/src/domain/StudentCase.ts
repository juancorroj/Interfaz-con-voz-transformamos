// ==============================================================================
// DOMAIN ENTITY: StudentCase (Entidad Rica de Dominio)
// Encapsula el estado, las reglas de negocio y las transiciones del estudiante
// Principios SOLID: Encapsulamiento, Abstracción y Alta Cohesión
// ==============================================================================

import {
  IStudentCaseData,
  IVerbatimQuote,
  ICertificateData,
  CommitmentStatus,
  PyramidTier,
  CaseTypology
} from './interfaces';
import { ISRPPScore } from './ISRPPScore';
import { CommitmentManager } from './CommitmentManager';
import { SecurityContext } from './SecurityContext';

export class StudentCase {
  private _data: IStudentCaseData;
  private _commitmentManager: CommitmentManager;

  constructor(data: IStudentCaseData) {
    this._data = { ...data };
    this._commitmentManager = new CommitmentManager(this._data.compromisos);
  }

  public get rawData(): IStudentCaseData {
    return {
      ...this._data,
      compromisos: this._commitmentManager.all
    };
  }

  public get id(): string {
    return this._data.id_estrategia;
  }

  public get sessionId(): string {
    return this._data.id_sesion;
  }

  public get studentAnonId(): string {
    return this._data.id_sujeto_anonimizado;
  }

  public get programCode(): string {
    return this._data.codigo_programa;
  }

  public get facultyId(): string {
    return this._data.facultad_id;
  }

  public get academicPeriod(): string {
    return this._data.periodo_academico;
  }

  public get isScholarship(): boolean {
    return this._data.es_becario;
  }

  public get scholarshipType(): string {
    return this._data.tipo_beca;
  }

  public get permanenceCondition(): string {
    return this._data.condicion_permanencia;
  }

  public get isrpp(): ISRPPScore {
    return new ISRPPScore(
      this._data.isrpp_score,
      this._data.isrpp_base,
      this._data.es_becario,
      this._data.riesgo_financiero
    );
  }

  public get emotionalVulnerability(): string {
    return this._data.vulnerabilidad_emocional;
  }

  public get vocationalCertainty(): number {
    return this._data.certeza_vocacional;
  }

  public get isFacadeReason(): boolean {
    return this._data.flag_motivo_fachada === 1;
  }

  public get declaredReason(): string {
    return this._data.motivo_declarado;
  }

  public get unmaskedRootReason(): string {
    return this._data.motivo_raiz_desocultado;
  }

  public get kBase(): number {
    return this._data.cadencia_k_base;
  }

  public get kRevisado(): number {
    return this._data.cadencia_k_revisado;
  }

  public get hoursFreed(): number {
    return this._data.horas_liberadas;
  }

  public get commitmentManager(): CommitmentManager {
    return this._commitmentManager;
  }

  public get isEarlyClosureEligible(): boolean {
    return this._data.elegible_cierre_anticipado;
  }

  public get pyramidTier(): PyramidTier {
    return this._data.nivel_piramide;
  }

  public get typology(): CaseTypology {
    return this._data.tipologia_caso;
  }

  public get scoreUAD(): number {
    return this._data.score_uad;
  }

  public get isPriorityPreferred(): boolean {
    return this._data.es_prioridad_preferente;
  }

  public get state(): string {
    return this._data.estado_caso;
  }

  public get blindToken(): string {
    return this._data.token_ciego;
  }

  public get certificate(): ICertificateData | undefined {
    return this._data.certificado_cierre;
  }

  public get teamsDraft() {
    return this._data.borrador_teams;
  }

  /**
   * Obtiene las citas textuales aplicando el filtro de seguridad CLS (Ley 1090)
   */
  public getMaskedQuotes(security: SecurityContext): IVerbatimQuote[] {
    return this._data.citas_verbatim.map(q => security.maskVerbatimQuote(q));
  }

  /**
   * Actualiza el estado de un compromiso en 1 clic y recalcula la tasa.
   */
  public updateCommitment(idCommitment: string, newStatus: CommitmentStatus): void {
    const updated = this._commitmentManager.updateStatus(idCommitment, newStatus);
    if (updated) {
      this._data.tasa_compromisos = this._commitmentManager.completionRate;
      // Si la tasa supera 80% y el ISRPP es bajo, habilita cierre anticipado
      if (this._data.tasa_compromisos >= 0.75 && this._data.isrpp_score < 0.45) {
        this._data.elegible_cierre_anticipado = true;
      }
    }
  }

  /**
   * Emite el Certificado Digital de Cumplimiento Pedagógico Temprano (MECO HITL)
   * Formaliza el cierre exitoso del ciclo intensivo y transiciona K a 0.
   */
  public issueEarlyClosureCertificate(
    advisorSignature: string,
    justification: string
  ): ICertificateData {
    const certCode = `CERT-MECO-2026-${this.studentAnonId.replace(/[^A-Z0-9]/gi, '').slice(-6)}-${Date.now().toString().slice(-4)}`;
    const sesionesCompletadas = 2; // Cumplimiento de piso mínimo
    const sesionesAhorradas = Math.max(1, this._data.cadencia_k_base - sesionesCompletadas);
    const horasAhorradas = Number((sesionesAhorradas * 0.75).toFixed(1));

    const cert: ICertificateData = {
      codigo_verificacion_digital: certCode,
      id_estrategia: this._data.id_estrategia,
      id_sujeto_anonimizado: this.studentAnonId,
      codigo_programa: this._data.codigo_programa,
      sesiones_completadas: sesionesCompletadas,
      sesiones_ahorradas: sesionesAhorradas,
      horas_liberadas: horasAhorradas,
      tasa_cumplimiento_final: this._commitmentManager.completionRate,
      justificacion: justification || `Certificación expedida por cumplimiento satisfactorio de metas formativas y superación de barreras de permanencia (MECO).`,
      firma_digital_asesor: advisorSignature || 'ASESORA-LILIAM-BIENESTAR',
      fecha_emision: new Date().toISOString(),
      aceptado_secretaria_academica: true
    };

    // Actualización de estado en el caso
    this._data.certificado_cierre = cert;
    this._data.cadencia_k_revisado = 0; // Transición formal de cierre
    this._data.horas_liberadas = horasAhorradas;
    this._data.estado_caso = 'DESESCALADO_EXITOSO';
    this._data.nivel_piramide = 'NIVEL_1_PULL'; // Desescalamiento formal a autoservicio
    this._data.elegible_cierre_anticipado = false;

    return cert;
  }

  /**
   * Aprueba y despacha el borrador compasivo de Teams.
   */
  public approveTeamsDraft(customText?: string): void {
    if (customText) {
      this._data.borrador_teams.copy_propuesto = customText;
      this._data.borrador_teams.palabras = customText.trim().split(/\s+/).length;
    }
    this._data.borrador_teams.estado = 'APROBADO_ENVIADO';
  }
}
