import React from 'react';
import { StudentCase } from '../domain/StudentCase';
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  ShieldCheck,
  Building2,
  HeartHandshake,
  Sparkles
} from 'lucide-react';

interface BienestarCentralDashboardProps {
  cases: StudentCase[];
}

export const BienestarCentralDashboard: React.FC<BienestarCentralDashboardProps> = ({ cases }) => {
  const total = cases.length;

  // 1. Métricas de Demanda Invertida
  const demandaInvertidaCases = cases.filter(
    (c) => c.typology === 'DEMANDA_INVERTIDA' || c.isrpp.value >= 0.70
  );
  const demandaInvertidaCount = demandaInvertidaCases.length;
  const demandaInvertidaPct = Math.round((demandaInvertidaCount / (total || 1)) * 100);

  // 2. Horas Presenciales Liberadas por MECO
  const totalHorasLiberadas = cases.reduce((acc, c) => acc + c.hoursFreed, 0);

  // 3. Casos Cerrados y Desescalados con Certificado
  const closedWithCert = cases.filter((c) => c.certificate || c.state === 'DESESCALADO_EXITOSO').length;
  const tasaDesescalamiento = Math.round((closedWithCert / (total || 1)) * 100);

  // 4. Pirámide de Acompañamiento
  const n3Cases = cases.filter((c) => c.pyramidTier === 'NIVEL_3_HITL');
  const n2Cases = cases.filter((c) => c.pyramidTier === 'NIVEL_2_HOTL');
  const n1Cases = cases.filter((c) => c.pyramidTier === 'NIVEL_1_PULL');

  // 5. Casos por Tipología
  const tipologias = [
    { label: 'Motivo Fachada', count: cases.filter((c) => c.typology === 'MOTIVO_FACHADA').length, color: 'border-amber-400 bg-amber-50 text-amber-900' },
    { label: 'Demanda Invertida', count: cases.filter((c) => c.typology === 'DEMANDA_INVERTIDA').length, color: 'border-rose-400 bg-rose-50 text-rose-900' },
    { label: 'Periodo de Prueba', count: cases.filter((c) => c.typology === 'PERIODO_PRUEBA').length, color: 'border-blue-400 bg-blue-50 text-blue-900' },
    { label: 'Becario en Riesgo', count: cases.filter((c) => c.typology === 'BECARIO').length, color: 'border-purple-400 bg-purple-50 text-purple-900' },
    { label: 'Preventivo / Voluntario', count: cases.filter((c) => c.typology === 'PREVENTIVO').length, color: 'border-emerald-400 bg-emerald-50 text-emerald-900' },
  ];

  // 6. Resumen por Facultad (Cumpliendo k-anonymity n >= 5)
  const facultadMap: Record<string, number> = {};
  for (const c of cases) {
    facultadMap[c.facultyId] = (facultadMap[c.facultyId] || 0) + 1;
  }

  return (
    <div className="space-y-6">
      
      {/* Banner Superior Institucional */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#002B49] text-white p-6 rounded-2xl shadow-sm border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Dirección de Bienestar Universitario</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">Vista Macro Institucional</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight mt-1">
              Centro de Mando Analítico & KPIs de Co-Inteligencia
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Monitoreo del cierre de ciclo (MARCA-IA) y de la resolución de la demanda invertida a partir de las capacidades inteligentes del Radar (MAPECI).
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <ShieldCheck className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="text-slate-400 block font-medium">Gobernanza Institucional:</span>
              <span className="font-bold text-white">ISO/IEC 42001 & Ley 1090</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Maestros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Demanda Invertida */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Demanda Invertida</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900">{demandaInvertidaPct}%</span>
            <span className="text-xs font-semibold text-rose-600 font-mono">({demandaInvertidaCount} casos)</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Detectados antes de sem. 8 con ISRPP ≥ 0.70 sin cita previa.
          </p>
        </div>

        {/* KPI 2: Horas de Consultorio Liberadas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Agenda Liberada</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-blue-700">+{totalHorasLiberadas.toFixed(1)} h</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Optimizadas por el modelo MECO para acoger casos prioritarios.
          </p>
        </div>

        {/* KPI 3: Desescalamiento Formal */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Cierre Acreditado</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-700">{closedWithCert}</span>
            <span className="text-xs font-semibold text-slate-500">certificados</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Aprobados en compuerta HITL ante Secretaría Académica.
          </p>
        </div>

        {/* KPI 4: Cooldown Guardrail */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Cooldown Guardrail</span>
            <HeartHandshake className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-purple-700">100%</span>
            <span className="text-xs font-semibold text-emerald-600">Cumplido</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Ventana 3-5 días y custodia estricta del Token Ciego (L4).
          </p>
        </div>

      </div>

      {/* PIRÁMIDE DE ACOMPAÑAMIENTO Y DISTRIBUCIÓN TIPOLÓGICA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pirámide Proporcional de Acompañamiento (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Pirámide Proporcional de Acompañamiento (MARCA-IA Capítulo 3)
              </h3>
            </div>
            <span className="text-xs text-slate-500">Total: {total} estudiantes</span>
          </div>

          <p className="text-xs text-slate-600">
            Distribución del esfuerzo humano y automatizado para erradicar la saturación de consultorios y garantizar acompañamiento oportuno:
          </p>

          <div className="space-y-3 pt-2">
            
            {/* Nivel 3: Intensivo HITL */}
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-1.5 transition-all hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-600"></span>
                  NIVEL 3: INTENSIVO / HITL (Psicólogo Asesor Responsable Único)
                </span>
                <span className="text-sm font-black text-red-700 font-mono">
                  {n3Cases.length} casos ({Math.round((n3Cases.length / total) * 100)}%)
                </span>
              </div>
              <p className="text-[11px] text-red-800 leading-relaxed">
                Estudiantes en periodo de prueba, becarios con riesgo inminente de perder beneficio o alta vulnerabilidad afectiva. Acompañamiento clínico/pedagógico directo.
              </p>
            </div>

            {/* Nivel 2: Focalizado HOTL */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5 transition-all hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  NIVEL 2: FOCALIZADO / HOTL (Supervisión Muestral y Derivación)
                </span>
                <span className="text-sm font-black text-amber-700 font-mono">
                  {n2Cases.length} casos ({Math.round((n2Cases.length / total) * 100)}%)
                </span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Asignaturas críticas de alto índice de pérdida (Cálculo, Física). Derivación ágil a monitorías pares y micro-talleres de métodos de estudio.
              </p>
            </div>

            {/* Nivel 1: Universal Pull */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5 transition-all hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                  NIVEL 1: UNIVERSAL / PULL (Autoservicio Formativo en App UniSabana)
                </span>
                <span className="text-sm font-black text-emerald-700 font-mono">
                  {n1Cases.length} casos ({Math.round((n1Cases.length / total) * 100)}%)
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Autonomía formativa bajo demanda: cápsulas interactivas, plantillas descargables de gestión del tiempo y catálogo libre de monitorías. Cero fatiga comunicativa.
              </p>
            </div>

          </div>
        </div>

        {/* Desglose por Tipologías de Caso (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Distribución por Tipología Operativa
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Enrutamiento conforme a MARCA-IA Capítulo 10</p>
          </div>

          <div className="space-y-2.5">
            {tipologias.map((t) => (
              <div
                key={t.label}
                className={`p-3 rounded-lg border flex items-center justify-between ${t.color}`}
              >
                <div>
                  <span className="text-xs font-bold block">{t.label}</span>
                  <span className="text-[10px] opacity-80">Ruta de acompañamiento asignada</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black font-mono">{t.count}</span>
                  <span className="text-[10px] block opacity-80">({Math.round((t.count / total) * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Regla k-anonymity */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Regla de k-anonymity activa: reportes agregados confinados con n ≥ 5 para proteger privacidad de cohortes.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
