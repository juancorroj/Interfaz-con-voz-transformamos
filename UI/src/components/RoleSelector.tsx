import React from 'react';
import { UserRole } from '../domain/interfaces';
import { ShieldCheck, UserCheck, GraduationCap, Building2, RotateCcw } from 'lucide-react';

interface RoleSelectorProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onResetData: () => void;
  totalCasesCount: number;
  filteredCasesCount: number;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  onRoleChange,
  onResetData,
  totalCasesCount,
  filteredCasesCount,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo y Título Institucional */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-bold text-slate-950 shadow-inner">
              US
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Universidad de La Sabana</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">MAPECI v1.2 / MARCA-IA v2.0</span>
              </div>
              <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                Tableros de Priorización y Analítica Psicopedagógica
              </h1>
            </div>
          </div>

          {/* Conmutador Interactivo de Roles RLS */}
          <div className="flex items-center space-x-3 flex-wrap">
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <label htmlFor="role-select" className="text-xs text-slate-400 px-2 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Rol RLS:
              </label>
              <select
                id="role-select"
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-slate-900 text-slate-100 text-xs font-medium rounded-md px-2.5 py-1.5 border border-slate-700 focus:ring-1 focus:ring-amber-500 focus:outline-none cursor-pointer"
              >
                <option value="ASESOR_LILIAM">🩺 Psicóloga Asesora (Dra. Liliam Chía - HITL)</option>
                <option value="DIRECTOR_MECATRONICA">🎓 Director: Ing. Mecatrónica (RLS + CLS L4)</option>
                <option value="DIRECTOR_DERECHO">⚖️ Director: Derecho (RLS + CLS L4)</option>
                <option value="DIRECTOR_MEDICINA">🔬 Director: Medicina (RLS + CLS L4)</option>
                <option value="BIENESTAR_CENTRAL">🏛️ Dirección Bienestar Universitario (Macro KPIs)</option>
              </select>
            </div>

            {/* Badge de Alcance de Casos */}
            <div className="text-xs bg-slate-800/80 text-slate-300 px-3 py-1.5 rounded-md border border-slate-700/60 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Casos: <strong className="text-white">{filteredCasesCount}</strong> de {totalCasesCount}</span>
            </div>

            {/* Botón Reset de Simulación */}
            <button
              onClick={onResetData}
              title="Reiniciar datos de la simulación al estado original"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-md border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset MVP
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
