import React, { useState } from 'react';
import { StudentCase } from '../domain/StudentCase';
import { SecurityContext } from '../domain/SecurityContext';
import { ShieldCheck, Lock, Award, BookOpen, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';

interface ProgramDirectorDashboardProps {
  cases: StudentCase[];
  security: SecurityContext;
}

export const ProgramDirectorDashboard: React.FC<ProgramDirectorDashboardProps> = ({
  cases,
  security,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const programCode = security.allowedProgramCode || 'GENERAL';
  const certifiedCount = cases.filter((c) => c.certificate).length;
  const probationCount = cases.filter((c) => c.permanenceCondition.includes('PRUEBA') || c.permanenceCondition.includes('SRA')).length;
  const scholarshipCount = cases.filter((c) => c.isScholarship).length;

  return (
    <div className="space-y-6">
      
      {/* Banner de RLS y Protección L4 (Ley 1090) */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold tracking-tight">
              Vista Gobernada por Row-Level Security (RLS) — {security.roleDisplayName}
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Filtrado confinado al programa <strong className="text-amber-300 font-mono">{programCode}</strong>. Se aplica enmascaramiento dinámico (CLS) sobre notas clínicas y salud mental bajo estricta salvaguarda de la Ley 1090 de 2006.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 flex-shrink-0">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Ofuscación L4: <strong className="text-emerald-400">ACTIVA</strong></span>
        </div>
      </div>

      {/* Tarjetas Resumen del Programa */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Estudiantes en Acompañamiento</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{cases.length}</span>
          <span className="text-[11px] text-slate-500">Cohorte activa 2026-2</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Periodo de Prueba / SRA</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{probationCount}</span>
          <span className="text-[11px] text-slate-500">Seguimiento reglamentario</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Becarios en Seguimiento</span>
          <span className="text-2xl font-black text-blue-700 mt-1 block">{scholarshipCount}</span>
          <span className="text-[11px] text-slate-500">Protección de permanencia</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Certificados MECO Acreditados</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">{certifiedCount}</span>
          <span className="text-[11px] text-emerald-600 font-medium">Aceptados por Secretaría Académica</span>
        </div>
      </div>

      {/* Grilla de Casos del Programa y Detalle Académico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lista de Estudiantes de la Carrera (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
            Estudiantes Asignados a la Dirección de Programa ({cases.length})
          </h3>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {cases.map((c) => {
              const isSelected = selectedCase?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-800'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {c.studentAnonId}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/10 text-white' : c.isrpp.badgeClasses
                      }`}
                    >
                      ISRPP: {c.isrpp.percentage}%
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>
                      {c.permanenceCondition}
                    </span>
                    {c.certificate ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Cierre Acreditado
                      </span>
                    ) : (
                      <span className={isSelected ? 'text-slate-400' : 'text-slate-400'}>
                        {c.kRevisado} citas pendientes
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detalle Académico Confinado para la Dirección (7 cols) */}
        {selectedCase && (
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5">
            
            <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
              <div>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  {selectedCase.studentAnonId}
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Programa: <strong className="text-slate-700">{selectedCase.programCode}</strong> • Condición: {selectedCase.permanenceCondition}
                </p>
              </div>

              {selectedCase.certificate && (
                <div className="text-right">
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    Periodo de Prueba Cumplido
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">{selectedCase.certificate.codigo_verificacion_digital}</p>
                </div>
              )}
            </div>

            {/* Resumen de Plan Pedagógico */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Resumen del Plan Pedagógico de Permanencia
              </h4>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <p><strong>Enfoque de Trabajo:</strong> {selectedCase.declaredReason}</p>
                <p><strong>Cadencia Proyectada:</strong> {selectedCase.kRevisado} sesiones de orientación psicopedagógica.</p>
                <p><strong>Cumplimiento de Compromisos:</strong> {(selectedCase.commitmentManager.completionRate * 100).toFixed(0)}% de acuerdos completados satisfactoriamente.</p>
              </div>
            </div>

            {/* Evidencias con Ofuscación Criptográfica y Deontológica L4 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Evidencias y Antecedentes Pedagógicos (Filtro CLS Ley 1090)</span>
                </h4>
                <span className="text-[10px] text-slate-400 italic">Notas clínicas ofuscadas por reserva</span>
              </div>

              <div className="space-y-2">
                {selectedCase.getMaskedQuotes(security).map((q) => {
                  const isMasked = q.afirmacion.includes('[RESTRINGIDO');
                  return (
                    <div
                      key={q.id_hallazgo}
                      className={`p-3 rounded-lg border text-xs ${
                        isMasked
                          ? 'bg-amber-50/70 border-amber-200 text-amber-950 font-mono text-[11px]'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span className="font-semibold uppercase">{q.categoria}</span>
                        {isMasked && (
                          <span className="text-amber-800 font-bold flex items-center gap-0.5">
                            <Lock className="w-3 h-3" /> Secreto Profesional L4
                          </span>
                        )}
                      </div>
                      <p className="font-medium">{q.afirmacion}</p>
                      <p className={`mt-1 italic ${isMasked ? 'text-amber-900 select-none' : 'text-slate-500 bg-white p-1.5 rounded border border-slate-200'}`}>
                        "{q.cita}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certificado Emitido si Existe */}
            {selectedCase.certificate && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-700" />
                  Certificado Digital Transmitido a la Secretaría de {selectedCase.programCode}
                </h4>
                <p className="text-xs text-emerald-800 italic">
                  "{selectedCase.certificate.justificacion}"
                </p>
                <div className="text-[11px] text-emerald-700 flex justify-between pt-1 border-t border-emerald-200/60 font-mono">
                  <span>Código: {selectedCase.certificate.codigo_verificacion_digital}</span>
                  <span>Firmado: {selectedCase.certificate.firma_digital_asesor}</span>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
