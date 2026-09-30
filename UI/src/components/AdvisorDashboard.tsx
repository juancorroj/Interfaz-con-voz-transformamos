import React, { useState } from 'react';
import { StudentCase } from '../domain/StudentCase';
import { SecurityContext } from '../domain/SecurityContext';
import { CommitmentsTable } from './CommitmentsTable';
import { CertificateModal } from './CertificateModal';
import { TeamsDraftModal } from './TeamsDraftModal';
import {
  AlertOctagon,
  Clock,
  Sparkles,
  Award,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  User,
  GraduationCap,
  HeartHandshake,
  Layers
} from 'lucide-react';

interface AdvisorDashboardProps {
  cases: StudentCase[];
  security: SecurityContext;
  onCommitmentChange: (strategyId: string, commitmentId: string, newStatus: any) => void;
  onIssueCertificate: (strategyId: string, advisorSignature: string, reason: string) => void;
  onApproveDraft: (strategyId: string, customCopy?: string) => void;
}

export const AdvisorDashboard: React.FC<AdvisorDashboardProps> = ({
  cases,
  security,
  onCommitmentChange,
  onIssueCertificate,
  onApproveDraft,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTypology, setFilterTypology] = useState<string>('TODAS');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false);

  // 1. Filtrado y ordenamiento: Los casos con "es_prioridad_preferente" (Score UAD 25) van PRIMERO en la cabecera
  const filteredCases = cases
    .filter((c) => {
      const matchSearch =
        c.studentAnonId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.programCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.sessionId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTypo = filterTypology === 'TODAS' || c.typology === filterTypology;
      return matchSearch && matchTypo;
    })
    .sort((a, b) => {
      // Prioridad preferente en la cima absoluta
      if (a.isPriorityPreferred && !b.isPriorityPreferred) return -1;
      if (!a.isPriorityPreferred && b.isPriorityPreferred) return 1;
      // Luego por severidad del ISRPP descendente
      return b.isrpp.value - a.isrpp.value;
    });

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || filteredCases[0];

  const preferredCases = cases.filter((c) => c.isPriorityPreferred);

  return (
    <div className="space-y-6">
      
      {/* CABECERA CENTINELA: Casos con Revisión Preferente (Score UAD = 25 / Crisis / Motivo Fachada Crítico) */}
      {preferredCases.length > 0 && (
        <div className="bg-gradient-to-r from-red-500/10 via-rose-500/5 to-transparent border-l-4 border-red-600 bg-white p-4 rounded-r-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <h2 className="text-sm font-bold text-red-950 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-red-600" />
                Cabecera Centinela: Casos con Revisión Preferente (Score UAD = 25)
              </h2>
            </div>
            <span className="text-[11px] font-medium text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">
              {preferredCases.length} caso(s) prioritario(s) detectado(s)
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Identificados por alta vulnerabilidad emocional concurrente o dolor afectivo severo. Posicionados en la primera línea de trabajo para valoración humana soberana (HITL), con cero bots automáticos invasivos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {preferredCases.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCase?.id === c.id
                    ? 'bg-red-50/90 border-red-400 shadow-sm ring-1 ring-red-400'
                    : 'bg-white hover:bg-slate-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-900 bg-red-100 px-1.5 py-0.5 rounded">
                      {c.studentAnonId}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 ml-2">{c.programCode}</span>
                  </div>
                  <span className="text-xs font-black text-red-600 font-mono">
                    ISRPP: {c.isrpp.percentage}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 mt-1.5 line-clamp-2 italic">
                  "{c.unmaskedRootReason}"
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>MECO: {c.kRevisado} citas proyectadas</span>
                  <span className="font-semibold text-red-700 flex items-center gap-0.5">
                    Ver caso <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENEDOR PRINCIPAL: Lista de Casos y Detalle Activo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA (5 cols): Bandeja de Casos Ordenados */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Barra de Búsqueda y Filtros */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por ID, programa o sesión..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-800 bg-slate-50"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Tipología:
              </span>
              <select
                value={filterTypology}
                onChange={(e) => setFilterTypology(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded px-2 py-1 font-medium text-slate-700 focus:outline-none"
              >
                <option value="TODAS">Todas las tipologías</option>
                <option value="MOTIVO_FACHADA">Motivo Fachada</option>
                <option value="DEMANDA_INVERTIDA">Demanda Invertida</option>
                <option value="PERIODO_PRUEBA">Periodo de Prueba</option>
                <option value="BECARIO">Becario en Riesgo</option>
                <option value="PREVENTIVO">Preventivo</option>
              </select>
            </div>
          </div>

          {/* Lista de Estudiantes con Semáforo ISRPP */}
          <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {filteredCases.map((c) => {
              const isSelected = selectedCase?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-800'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          c.isrpp.riskLevel === 'ALTO'
                            ? 'bg-red-500'
                            : c.isrpp.riskLevel === 'MEDIO'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {c.studentAnonId}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {c.isPriorityPreferred && (
                        <span className="text-[10px] bg-red-500/20 text-red-300 font-bold px-1.5 py-0.5 rounded border border-red-500/40">
                          Preferente
                        </span>
                      )}
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-white/10 text-white'
                            : c.isrpp.badgeClasses
                        }`}
                      >
                        {c.isrpp.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className={isSelected ? 'text-slate-300' : 'text-slate-600'}>
                      {c.programCode} • {c.permanenceCondition}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                        isSelected ? 'bg-white/20 text-slate-100' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.typology.replace('_', ' ')}
                    </span>
                  </div>

                  {c.isFacadeReason && (
                    <div className="mt-1 text-[10px] text-amber-400 font-medium flex items-center gap-1">
                      ⚠️ Motivo fachada desocultado
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* COLUMNA DERECHA (7 cols): Detalle Operativo del Caso Seleccionado */}
        {selectedCase && (
          <div className="lg:col-span-7 space-y-4">
            
            {/* Tarjeta Cabecera del Caso */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-slate-900 font-mono">
                      {selectedCase.studentAnonId}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                      {selectedCase.programCode}
                    </span>
                    {selectedCase.isScholarship && (
                      <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 font-semibold px-2 py-0.5 rounded">
                        🎓 {selectedCase.scholarshipType.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sesión: <span className="font-mono">{selectedCase.sessionId}</span> • Asesor: {selectedCase.rawData.id_asesor}
                  </p>
                </div>

                {/* Score ISRPP */}
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Score ISRPP Multifuente</span>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {selectedCase.isrpp.percentage}%
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${selectedCase.isrpp.badgeClasses}`}>
                      Riesgo {selectedCase.isrpp.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Panel MECO: Cadencia Dinámica y Optimización de Capacidad */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 p-4 rounded-xl border border-blue-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-700" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Modelo MECO — Cadencia Oportuna de Sesiones
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded">
                    Piso Mínimo Inviolable: K_min = 2 citas
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Cadencia Base (K)</span>
                    <span className="text-lg font-bold text-slate-800">{selectedCase.kBase} citas</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Cadencia Sugerida</span>
                    <span className="text-lg font-bold text-blue-700">{selectedCase.kRevisado} citas</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Horas Liberadas</span>
                    <span className="text-lg font-bold text-emerald-700">+{selectedCase.hoursFreed} h</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Compromisos</span>
                    <span className="text-lg font-bold text-slate-800">
                      {(selectedCase.commitmentManager.completionRate * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Botón HITL: Acreditar Cierre Anticipado */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <p className="text-[11px] text-slate-600">
                    {selectedCase.certificate ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Caso cerrado y desescalado formalmente a Nivel 1.
                      </span>
                    ) : selectedCase.isEarlyClosureEligible ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Metas cumplidas: Elegible para acreditar cierre anticipado.
                      </span>
                    ) : (
                      <span>Acompañamiento regular en curso. Piso mínimo y compromisos en seguimiento.</span>
                    )}
                  </p>

                  <div className="flex items-center gap-2">
                    {/* Botón Borrador Teams */}
                    <button
                      onClick={() => setIsTeamsModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#464EB8] bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Borrador Teams ({selectedCase.teamsDraft.estado === 'APROBADO_ENVIADO' ? 'Enviado' : 'Pendiente'})
                    </button>

                    {/* Botón Certificado MECO */}
                    <button
                      onClick={() => setIsCertModalOpen(true)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all ${
                        selectedCase.certificate
                          ? 'bg-slate-800 text-white hover:bg-slate-700 shadow-sm'
                          : selectedCase.isEarlyClosureEligible
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-sm animate-pulse'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      {selectedCase.certificate ? 'Ver Certificado MECO' : 'Acreditar Cierre Anticipado'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Contraste: Motivo Declarado vs Motivo Raíz Desocultado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 font-semibold uppercase block text-[10px]">
                    Motivo Declarado por el Alumno (Sintético)
                  </span>
                  <p className="text-slate-800 mt-1 font-medium">{selectedCase.declaredReason}</p>
                </div>
                <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200">
                  <span className="text-amber-800 font-semibold uppercase block text-[10px]">
                    Causa Raíz Desocultada (Nota Asesor / Ground Truth)
                  </span>
                  <p className="text-amber-950 mt-1 font-medium">{selectedCase.unmaskedRootReason}</p>
                </div>
              </div>

              {/* Evidencias Forenses Verbatim (FactScore >= 0.95) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                  <span>Evidencia Textual Fáctica Verbatim</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                    FactScore ≥ 0.95
                  </span>
                </h4>
                <div className="space-y-1.5">
                  {selectedCase.getMaskedQuotes(security).map((q) => (
                    <div key={q.id_hallazgo} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                        <span className="font-semibold uppercase text-slate-700">{q.categoria}</span>
                        <span>FactScore: <strong>{q.fact_score.toFixed(2)}</strong></span>
                      </div>
                      <p className="text-slate-800 font-medium">{q.afirmacion}</p>
                      <p className="text-slate-500 italic text-[11px] mt-1 bg-white p-1.5 rounded border border-slate-200">
                        "{q.cita}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabla de Compromisos de Doble Vía (1:N) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Compromisos de Doble Vía (Estudiante vs Asesor)
                  </h4>
                  <span className="text-xs font-medium text-slate-500">
                    {selectedCase.commitmentManager.completedCount} de {selectedCase.commitmentManager.total} cumplidos
                  </span>
                </div>
                <CommitmentsTable
                  commitments={selectedCase.commitmentManager.all}
                  canEdit={security.isAdvisor}
                  onStatusChange={(cid, status) => onCommitmentChange(selectedCase.id, cid, status)}
                />
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Modales Interactivos */}
      {selectedCase && (
        <>
          <CertificateModal
            studentCase={selectedCase}
            isOpen={isCertModalOpen}
            onClose={() => setIsCertModalOpen(false)}
            onConfirmIssue={(signature, reason) => {
              onIssueCertificate(selectedCase.id, signature, reason);
              setIsCertModalOpen(false);
            }}
          />

          <TeamsDraftModal
            studentCase={selectedCase}
            isOpen={isTeamsModalOpen}
            onClose={() => setIsTeamsModalOpen(false)}
            onApproveDraft={(customCopy) => {
              onApproveDraft(selectedCase.id, customCopy);
            }}
          />
        </>
      )}

    </div>
  );
};
