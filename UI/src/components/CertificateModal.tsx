import React, { useState } from 'react';
import { ICertificateData } from '../domain/interfaces';
import { StudentCase } from '../domain/StudentCase';
import { Award, CheckCircle, X, Download, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  studentCase: StudentCase;
  isOpen: boolean;
  onClose: () => void;
  onConfirmIssue: (advisorSignature: string, reason: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  studentCase,
  isOpen,
  onClose,
  onConfirmIssue,
}) => {
  const existingCert = studentCase.certificate;
  const [signature, setSignature] = useState('ASESORA-LILIAM-BIENESTAR');
  const [reason, setReason] = useState(
    'Superación exitosa de barreras de permanencia académica, consolidación de hábitos de estudio autónomo y cumplimiento del 100% de compromisos de doble vía verificados bajo el modelo MECO.'
  );

  if (!isOpen) return null;

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmIssue(signature, reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        
        {/* Cabecera del Certificado con estética institucional de La Sabana */}
        <div className="bg-gradient-to-r from-slate-900 via-[#002B49] to-[#005587] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">Universidad de La Sabana</span>
              <h2 className="text-xl font-bold tracking-tight">Certificado Digital de Cumplimiento Pedagógico Temprano</h2>
              <p className="text-xs text-slate-300 mt-0.5">Modelo MECO — Optimización de Capacidad Humana (AaaS-PSI-CADENCIA-04)</p>
            </div>
          </div>
        </div>

        {/* Cuerpo del Certificado */}
        <div className="p-6 space-y-5">
          {existingCert ? (
            /* Vista de Certificado ya Emitido */
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-900">Certificado Válido y Registrado</h3>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Este certificado ha sido acreditado en compuerta HITL por el profesional de Bienestar y transmitido formalmente a la Secretaría Académica de {studentCase.programCode}.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/50 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-sans font-medium">Código de Verificación Digital:</span>
                  <span className="font-bold text-slate-900 select-all">{existingCert.codigo_verificacion_digital}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-sans font-medium">Estudiante Anonimizado (RLS):</span>
                  <span className="font-bold text-slate-800">{existingCert.id_sujeto_anonimizado}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-sans font-medium">Programa Académico:</span>
                  <span className="font-bold text-slate-800">{existingCert.codigo_programa}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1 text-center bg-white p-2 rounded border border-slate-200 font-sans">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Sesiones Cursadas</span>
                    <span className="text-base font-bold text-slate-800">{existingCert.sesiones_completadas}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Citas Ahorradas</span>
                    <span className="text-base font-bold text-emerald-700">+{existingCert.sesiones_ahorradas}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Agenda Liberada</span>
                    <span className="text-base font-bold text-blue-700">{existingCert.horas_liberadas} h</span>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-2 text-slate-700 font-sans text-xs">
                  <strong className="block text-slate-900 mb-1">Dictamen Pedagógico y Fundamento Clínico:</strong>
                  <p className="italic bg-white p-2.5 rounded border border-slate-200 text-slate-600 leading-relaxed">
                    "{existingCert.justificacion}"
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2 text-[11px] text-slate-500 font-sans">
                  <span>Firmado digitalmente por: <strong className="text-slate-800">{existingCert.firma_digital_asesor}</strong></span>
                  <span>{new Date(existingCert.fecha_emision).toLocaleString('es-CO')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cerrar Vista
                </button>
              </div>
            </div>
          ) : (
            /* Formulario de Emisión HITL */
            <form onSubmit={handleIssue} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 leading-relaxed">
                <strong className="font-semibold block mb-1">🏛️ Efecto Vinculante Institucional (Ley 1090 / Reglamento Estudiantil):</strong>
                Al firmar este certificado digital, el estudiante <strong className="font-mono">{studentCase.studentAnonId}</strong> cumplirá formalmente la obligación de periodo de prueba. El contador de citas restantes se transicionará formalmente a <strong>K = 0</strong>, liberando <strong>{studentCase.hoursFreed} horas</strong> presenciales para acoger casos de demanda invertida.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Firma Digital del Profesional Asesor (Matrícula Ley 1090):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full text-xs font-medium border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  />
                  <ShieldCheck className="w-4 h-4 text-emerald-600 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Justificación de Cumplimiento Pedagógico Temprano:
                </label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full text-xs font-normal border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-600 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  Emitir y Transmitir a Secretaría Académica
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
