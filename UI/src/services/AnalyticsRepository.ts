// ==============================================================================
// REPOSITORY CONTRACT & SERVICE (DIP - Dependency Inversion Principle)
// Manejo de persistencia local y desacoplamiento de fuentes de datos
// ==============================================================================

import { IStudentCaseData, ICertificateData, CommitmentStatus } from '../domain/interfaces';
import { StudentCase } from '../domain/StudentCase';
import initialData from '../data/analitica_casos_unificados.json';

export interface IAnalyticsRepository {
  getAllCases(): StudentCase[];
  getCaseById(id: string): StudentCase | undefined;
  updateCommitment(strategyId: string, commitmentId: string, status: CommitmentStatus): StudentCase | undefined;
  saveCertificate(strategyId: string, cert: ICertificateData): StudentCase | undefined;
  saveTeamsDraft(strategyId: string, customCopy?: string): StudentCase | undefined;
  resetToInitial(): StudentCase[];
}

const STORAGE_KEY = 'SABANA_ANALITICA_CASES_STATE_V1';

export class AnalyticsRepository implements IAnalyticsRepository {
  private _cases: Map<string, StudentCase> = new Map();

  constructor() {
    this._loadState();
  }

  private _loadState(): void {
    const rawSaved = localStorage.getItem(STORAGE_KEY);
    let sourceData: IStudentCaseData[] = [];

    if (rawSaved) {
      try {
        sourceData = JSON.parse(rawSaved);
      } catch (e) {
        console.warn('Error leyendo estado guardado de localStorage, usando datos base.', e);
        sourceData = initialData as IStudentCaseData[];
      }
    } else {
      sourceData = initialData as IStudentCaseData[];
    }

    this._cases.clear();
    for (const item of sourceData) {
      this._cases.set(item.id_estrategia, new StudentCase(item));
    }
  }

  private _persist(): void {
    try {
      const serializable = Array.from(this._cases.values()).map(c => c.rawData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch (e) {
      console.error('Error persistiendo estado en localStorage', e);
    }
  }

  public getAllCases(): StudentCase[] {
    return Array.from(this._cases.values());
  }

  public getCaseById(id: string): StudentCase | undefined {
    return this._cases.get(id);
  }

  public updateCommitment(
    strategyId: string,
    commitmentId: string,
    status: CommitmentStatus
  ): StudentCase | undefined {
    const caseObj = this._cases.get(strategyId);
    if (!caseObj) return undefined;

    caseObj.updateCommitment(commitmentId, status);
    this._persist();
    return caseObj;
  }

  public saveCertificate(strategyId: string, cert: ICertificateData): StudentCase | undefined {
    const caseObj = this._cases.get(strategyId);
    if (!caseObj) return undefined;

    // El método interno ya aplica la transición
    this._persist();
    return caseObj;
  }

  public saveTeamsDraft(strategyId: string, customCopy?: string): StudentCase | undefined {
    const caseObj = this._cases.get(strategyId);
    if (!caseObj) return undefined;

    caseObj.approveTeamsDraft(customCopy);
    this._persist();
    return caseObj;
  }

  public resetToInitial(): StudentCase[] {
    localStorage.removeItem(STORAGE_KEY);
    this._cases.clear();
    for (const item of (initialData as IStudentCaseData[])) {
      this._cases.set(item.id_estrategia, new StudentCase(item));
    }
    this._persist();
    return this.getAllCases();
  }
}
