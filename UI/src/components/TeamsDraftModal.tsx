import React, { useState } from 'react';
import { StudentCase } from '../domain/StudentCase';
import { Send, X, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';

interface TeamsDraftModalProps {
  studentCase: StudentCase;
  isOpen: boolean;
  onClose: () => void;
  onApproveDraft: (customCopy?: string) => void;
}

export const TeamsDraftModal: React.FC<TeamsDraftModalProps> = ({
  studentCase,
  isOpen,
  onClose,
  onApproveDraft,
}) => {
  const draft = studentCase.teamsDraft;
  const [copyText, setCopyText] = useState(draft.copy_propuesto);

  if (!isOpen) return null;

  const wordCount = copyText.trim().split(/\s+/).filter(Boolean).length;
  const isOverLimit = wordCount > 75;
  const isApproved = draft.estado === 'APROBADO_ENVIADO';

  const handleSend = () => {
    onApproveDraft(copyText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        
        {/* Cabecera Teams Branding */}
        <div className="bg-[#464EB8] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold">Microsoft Teams / Bienestar HITL</span>
              <h2 className="text-base font-bold">Bandeja de Borradores Asistidos</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
            <span>Destinatario: <strong className="font-mono text-slate-800">{studentCase.studentAnonId}</strong></span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600">
              Modo Orgánico Implícito (Anti-Vigilancia)
            </span>
          </div>

          {isApproved ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Mensaje Despachado por el Asesor
              </div>
              <p className="text-slate-700 italic bg-white p-2.5 rounded border border-emerald-200">
                "{draft.copy_propuesto}"
              </p>
              <span className="text-[11px] text-emerald-700 block">
                Entregado al canal seguro de Microsoft Teams del estudiante con firma institucional.
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Este micro-copy fue redactado por el <strong className="text-slate-800">Subagente Diseñador de Tono Compasivo</strong> bajo directrices APA/OMS. Revisa y edita el texto antes de autorizar su despacho soberano:
              </p>

              <div>
                <textarea
                  rows={4}
                  value={copyText}
                  onChange={(e) => setCopyText(e.target.value)}
                  className="w-full text-xs font-normal border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-[#464EB8] focus:outline-none leading-relaxed"
                />
                
                <div className="flex items-center justify-between mt-1 text-[11px]">
                  <span className={`font-semibold ${isOverLimit ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                    Longitud: {wordCount} / 75 palabras máx.
                  </span>
                  {isOverLimit && (
                    <span className="text-rose-600 flex items-center gap-1 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" /> Excede el límite de concisión compasiva
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-[11px] text-slate-500">
                🛡️ <strong>Salvaguarda Anti-Vigilancia:</strong> Terminantemente prohibido aludir a algoritmos, modelos de deserción o grabaciones de voz.
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cerrar
            </button>
            {!isApproved && (
              <button
                disabled={isOverLimit}
                onClick={handleSend}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-lg flex items-center gap-1.5 transition-colors ${
                  isOverLimit
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-[#464EB8] hover:bg-[#3b429f] shadow-sm'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                Validar y Despachar a Teams
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
