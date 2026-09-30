import React from 'react';
import { ICommitment, CommitmentStatus } from '../domain/interfaces';
import { CheckCircle2, Clock, AlertCircle, Calendar, User, ShieldAlert } from 'lucide-react';

interface CommitmentsTableProps {
  commitments: ICommitment[];
  canEdit: boolean;
  onStatusChange: (idCommitment: string, newStatus: CommitmentStatus) => void;
}

export const CommitmentsTable: React.FC<CommitmentsTableProps> = ({
  commitments,
  canEdit,
  onStatusChange,
}) => {
  if (commitments.length === 0) {
    return (
      <div className="text-center py-6 text-slate-400 text-sm italic">
        No hay compromisos registrados para esta sesión.
      </div>
    );
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ESTUDIANTE':
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200"><User className="w-3 h-3" /> Estudiante</span>;
      case 'ASESOR':
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200"><ShieldAlert className="w-3 h-3" /> Asesor</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300">Unidad Externa</span>;
    }
  };

  const getStatusBadge = (status: CommitmentStatus) => {
    switch (status) {
      case 'CUMPLIDO':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cumplido
          </span>
        );
      case 'INCUMPLIDO':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Incumplido
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Pendiente
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
        <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase tracking-wider">
          <tr>
            <th className="py-2.5 px-3">Responsable</th>
            <th className="py-2.5 px-3">Acción Pedagógica</th>
            <th className="py-2.5 px-3">Plazo</th>
            <th className="py-2.5 px-3">Estado</th>
            {canEdit && <th className="py-2.5 px-3 text-right">Acción 1 Clic</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {commitments.map((c) => (
            <tr key={c.id_compromiso} className="hover:bg-slate-50/80 transition-colors">
              <td className="py-2.5 px-3 whitespace-nowrap align-top">
                {getRoleBadge(c.responsable)}
              </td>
              <td className="py-2.5 px-3 text-slate-800">
                <p className="font-medium text-slate-900">{c.descripcion_accion}</p>
                <p className="text-[11px] text-slate-500 mt-0.5"><strong className="font-medium">Verificable:</strong> {c.resultado_verificable}</p>
              </td>
              <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 align-top">
                <span className="inline-flex items-center gap-1 text-slate-600">
                  <Calendar className="w-3 h-3 text-slate-400" /> {c.plazo_fecha || 'Sin fecha fija'}
                </span>
              </td>
              <td className="py-2.5 px-3 whitespace-nowrap align-top">
                {getStatusBadge(c.estado_compromiso)}
              </td>
              {canEdit && (
                <td className="py-2.5 px-3 text-right whitespace-nowrap align-top">
                  <div className="inline-flex items-center gap-1 bg-slate-50 p-1 rounded border border-slate-200">
                    <button
                      onClick={() => onStatusChange(c.id_compromiso, 'CUMPLIDO')}
                      title="Marcar como cumplido"
                      className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                        c.estado_compromiso === 'CUMPLIDO'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      ✓ Cumplido
                    </button>
                    <button
                      onClick={() => onStatusChange(c.id_compromiso, 'PENDIENTE')}
                      title="Marcar como pendiente"
                      className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                        c.estado_compromiso === 'PENDIENTE'
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      Pendiente
                    </button>
                    <button
                      onClick={() => onStatusChange(c.id_compromiso, 'INCUMPLIDO')}
                      title="Marcar como incumplido"
                      className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                        c.estado_compromiso === 'INCUMPLIDO'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50'
                      }`}
                    >
                      ✗ Incumplido
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
