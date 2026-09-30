// ==============================================================================
// DOMAIN ENGINE: MECOCadenceEngine (Modelo de Estimación de Cadencia y Capacidad)
// Framework: MAPECI v1.2.0 (Ficha AaaS-PSI-CADENCIA-04) & MARCA-IA v2.0.0 (Capítulo 3)
// ==============================================================================

export interface IMECOEvaluation {
  kBase: number;
  kRevisado: number;
  horasConsultorioLiberadas: number;
  elegibleCierreAnticipado: boolean;
  justificacion: string;
}

export class MECOCadenceEngine {
  private static readonly PISO_MINIMO_INVIOLABLE = 2;
  private static readonly DURACION_SESION_HORAS = 0.75; // 45 minutos

  /**
   * Calcula la cadencia base inicial (K_base) según el ISRPP y la condición de permanencia.
   */
  public static calculateKBase(isrpp: number, condicionPermanencia: string): number {
    let k = 2;
    if (isrpp >= 0.75) {
      k = 7;
    } else if (isrpp >= 0.45) {
      k = 4;
    }

    if (condicionPermanencia.includes('PRUEBA') || condicionPermanencia.includes('SRA')) {
      k = Math.max(k, 6);
    }
    return k;
  }

  /**
   * Recalcula dinámicamente la cadencia restante (K_revisado) con base en la tasa de
   * cumplimiento de compromisos en la ventana y el progreso del estudiante.
   */
  public static evaluateCadence(
    isrpp: number,
    condicionPermanencia: string,
    tasaCompromisos: number,
    sesionesCompletadas: number = 1
  ): IMECOEvaluation {
    const kBase = this.calculateKBase(isrpp, condicionPermanencia);
    
    // Si la tasa de compromisos es alta, reduce proporcionalmente citas restantes
    const deduccion = Math.round(kBase * 0.45 * Math.min(Math.max(tasaCompromisos, 0), 1.0));
    let kRevisado = Math.max(this.PISO_MINIMO_INVIOLABLE, kBase - deduccion);

    // Salvaguarda: si estamos en sesión inicial (<= 1), no se permite cierre anticipado directo
    let elegibleCierre = false;
    if (sesionesCompletadas >= 2 && tasaCompromisos >= 0.75 && isrpp < 0.45) {
      elegibleCierre = true;
    }

    const citasAhorradas = Math.max(0, kBase - kRevisado);
    const horasLiberadas = Number((citasAhorradas * this.DURACION_SESION_HORAS).toFixed(1));

    let justificacion = `Cadencia base de ${kBase} citas asignada por ISRPP ${isrpp.toFixed(2)}.`;
    if (citasAhorradas > 0) {
      justificacion += ` Optimización MECO: Reducción a ${kRevisado} citas por cumplimiento del ${(tasaCompromisos * 100).toFixed(0)}% de acuerdos. Liberadas ${horasLiberadas} horas de agenda presencial.`;
    }

    return {
      kBase,
      kRevisado,
      horasConsultorioLiberadas: horasLiberadas,
      elegibleCierreAnticipado: elegibleCierre,
      justificacion
    };
  }
}
