// ==============================================================================
// OBJETO DE VALOR: ISRPPScore (Single Responsibility Principle)
// Encapsula la evaluación paramétrica del Índice Sintético de Riesgo de Pérdida de Permanencia
// Framework: MAPECI v1.2.0 (Ficha AaaS-PSI-SCORE-01)
// ==============================================================================

import { EmotionalVulnerability } from './interfaces';

export type RiskLevel = 'ALTO' | 'MEDIO' | 'LEVE';

export class ISRPPScore {
  private readonly _score: number;
  private readonly _baseScore: number;
  private readonly _isScholarshipStudent: boolean;
  private readonly _financialRisk: number;

  constructor(
    score: number,
    baseScore: number,
    isScholarshipStudent: boolean,
    financialRisk: number = 0
  ) {
    this._score = Math.min(Math.max(score, 0.0), 1.0);
    this._baseScore = Math.min(Math.max(baseScore, 0.0), 1.0);
    this._isScholarshipStudent = isScholarshipStudent;
    this._financialRisk = financialRisk;
  }

  /**
   * Factory method para calcular el ISRPP siguiendo la fórmula institucional calibrada:
   * ISRPP_base = (0.35 * V_emoc + 0.35 * (1 - S_voc) + 0.15 * A_tut) / 0.85
   * Para becarios: max(ISRPP_base, (0.35 * V_emoc + 0.35 * (1 - S_voc) + 0.15 * A_tut + 0.25 * F_beca) / 1.10)
   */
  public static calculate(
    vulnerability: EmotionalVulnerability,
    certaintyVocational: number,
    absenceRateTutorias: number,
    isScholarship: boolean,
    hasFinancialRisk: boolean
  ): ISRPPScore {
    const vMap: Record<EmotionalVulnerability, number> = {
      ALTO: 0.90,
      MEDIO: 0.50,
      BAJO: 0.15
    };
    const vEmoc = vMap[vulnerability] ?? 0.20;
    const sVoc = Math.min(Math.max(certaintyVocational, 0.0), 1.0);
    const aTut = Math.min(Math.max(absenceRateTutorias, 0.0), 1.0);

    const base = (0.35 * vEmoc + 0.35 * (1.0 - sVoc) + 0.15 * aTut) / 0.85;

    let finalScore = base;
    const fBeca = (isScholarship && hasFinancialRisk) ? 0.85 : 0.0;

    if (isScholarship) {
      const becarioScore = (0.35 * vEmoc + 0.35 * (1.0 - sVoc) + 0.15 * aTut + 0.25 * fBeca) / 1.10;
      // Principio de No Dilución por Beneficio (operador max)
      finalScore = Math.max(base, becarioScore);
    }

    return new ISRPPScore(finalScore, base, isScholarship, hasFinancialRisk ? 1 : 0);
  }

  public get value(): number {
    return this._score;
  }

  public get baseValue(): number {
    return this._baseScore;
  }

  public get percentage(): number {
    return Math.round(this._score * 100);
  }

  public get riskLevel(): RiskLevel {
    if (this._score >= 0.70) return 'ALTO';
    if (this._score >= 0.45) return 'MEDIO';
    return 'LEVE';
  }

  public get colorHex(): string {
    switch (this.riskLevel) {
      case 'ALTO':
        return '#DC2626'; // Rojo Tailwind red-600
      case 'MEDIO':
        return '#D97706'; // Amarillo/Ámbar amber-600
      case 'LEVE':
        return '#16A34A'; // Verde green-600
    }
  }

  public get badgeClasses(): string {
    switch (this.riskLevel) {
      case 'ALTO':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIO':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'LEVE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  }
}
