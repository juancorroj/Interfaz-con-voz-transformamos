// ==============================================================================
// DOMAIN CLASS: SecurityContext (Gobernanza RLS, CLS y Secreto Profesional Ley 1090)
// Framework: MAPECI v1.2.0 (Capítulo 8) & MARCA-IA v2.0.0 (Capítulo 7)
// ==============================================================================

import { UserRole, IVerbatimQuote, IStudentCaseData } from './interfaces';

export class SecurityContext {
  private readonly _currentRole: UserRole;

  constructor(role: UserRole = 'ASESOR_LILIAM') {
    this._currentRole = role;
  }

  public get role(): UserRole {
    return this._currentRole;
  }

  public get roleDisplayName(): string {
    switch (this._currentRole) {
      case 'ASESOR_LILIAM':
        return 'Dra. Liliam Chía — Psicóloga Asesora (Bienestar)';
      case 'DIRECTOR_MECATRONICA':
        return 'Director de Programa — Ing. Mecatrónica';
      case 'DIRECTOR_DERECHO':
        return 'Director de Programa — Derecho';
      case 'DIRECTOR_MEDICINA':
        return 'Director de Programa — Medicina';
      case 'BIENESTAR_CENTRAL':
        return 'Dirección de Bienestar y Experiencia del Estudiante';
    }
  }

  public get isAdvisor(): boolean {
    return this._currentRole === 'ASESOR_LILIAM';
  }

  public get isDirector(): boolean {
    return this._currentRole.startsWith('DIRECTOR_');
  }

  public get isBienestarCentral(): boolean {
    return this._currentRole === 'BIENESTAR_CENTRAL';
  }

  public get allowedProgramCode(): string | null {
    switch (this._currentRole) {
      case 'DIRECTOR_MECATRONICA':
        return 'ING-MECATRONICA';
      case 'DIRECTOR_DERECHO':
        return 'DER';
      case 'DIRECTOR_MEDICINA':
        return 'MED';
      default:
        return null;
    }
  }

  /**
   * Filtro RLS: evalúa si un caso es visible para el rol en sesión.
   */
  public canViewCase(studentCase: IStudentCaseData): boolean {
    if (this.isAdvisor || this.isBienestarCentral) {
      return true;
    }
    const prog = this.allowedProgramCode;
    if (prog) {
      return studentCase.codigo_programa === prog;
    }
    return false;
  }

  /**
   * Filtro CLS: ofusca dinámicamente cualquier cita o información sensible L4
   * conforme a la Ley 1090 de 2006 y Directrices Institucionales.
   */
  public maskVerbatimQuote(quote: IVerbatimQuote): IVerbatimQuote {
    if (this.isAdvisor || this.isBienestarCentral) {
      return quote; // Acceso legítimo en custodia clínica
    }

    if (quote.sensible_l4 || quote.categoria === 'ETICO_L4') {
      return {
        ...quote,
        afirmacion: '[RESTRINGIDO_RESERVA_PSICOPEDAGOGICA_LEY_1090]',
        cita: '[CONTENIDO_CLINICO_CONFIDENCIAL_PROTEGIDO_POR_SECRETO_PROFESIONAL_LEY_1090_COLOMBIA]'
      };
    }
    return quote;
  }

  /**
   * Valida si el rol tiene soberanía para emitir certificados de cierre anticipado.
   */
  public canCertifyClosure(): boolean {
    return this.isAdvisor; // Solo el psicólogo clínico/asesor HITL puede certificar
  }

  /**
   * Valida si el rol tiene permiso para editar o despachar borradores a Teams.
   */
  public canDispatchTeams(): boolean {
    return this.isAdvisor;
  }
}
