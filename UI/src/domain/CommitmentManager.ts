// ==============================================================================
// DOMAIN CLASS: CommitmentManager (Gestor de Compromisos de Doble Vía 1:N)
// Framework: MAPECI v1.2.0 (Ficha AaaS-PSI-DASH-02) & MARCA-IA v2.0.0 (Capítulo 9)
// ==============================================================================

import { ICommitment, CommitmentStatus, CommitmentRole } from './interfaces';

export class CommitmentManager {
  private _commitments: ICommitment[];

  constructor(commitments: ICommitment[] = []) {
    this._commitments = [...commitments];
  }

  public get all(): ICommitment[] {
    return [...this._commitments];
  }

  public get studentCommitments(): ICommitment[] {
    return this._commitments.filter(c => c.responsable === 'ESTUDIANTE');
  }

  public get advisorCommitments(): ICommitment[] {
    return this._commitments.filter(c => c.responsable === 'ASESOR');
  }

  public get externalCommitments(): ICommitment[] {
    return this._commitments.filter(c => c.responsable === 'UNIDAD_EXTERNA');
  }

  public get total(): number {
    return this._commitments.length;
  }

  public get completedCount(): number {
    return this._commitments.filter(c => c.estado_compromiso === 'CUMPLIDO').length;
  }

  public get pendingCount(): number {
    return this._commitments.filter(c => c.estado_compromiso === 'PENDIENTE').length;
  }

  public get completionRate(): number {
    if (this.total === 0) return 1.0;
    return Number((this.completedCount / this.total).toFixed(3));
  }

  /**
   * Actualiza el estado de un compromiso en 1 clic.
   */
  public updateStatus(idCommitment: string, newStatus: CommitmentStatus): boolean {
    const item = this._commitments.find(c => c.id_compromiso === idCommitment);
    if (!item) return false;
    item.estado_compromiso = newStatus;
    return true;
  }

  /**
   * Retorna compromisos vencidos por más de 3 días para emitir Señal_Compromiso_DobleVia_Vencido.
   */
  public getOverdueCommitments(referenceDate: string = '2026-09-20'): ICommitment[] {
    return this._commitments.filter(c => {
      if (c.estado_compromiso === 'CUMPLIDO') return false;
      if (!c.plazo_fecha) return false;
      return c.plazo_fecha < referenceDate;
    });
  }
}
