import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import agents from './data/agents.json';
import { useDemoCases } from './services/useDemoCases';
import './resonancia.css';
import './meeting.css';
import './pitch.css';
import './sidebar.css';
import './styles/tokens.css';
import './styles/shell.css';
import { AppShell } from './app/AppShell';
import { sectionRegistry, HOME_SECTION_ID, CASE_SECTION_ID, legacyRouteAliases } from './app/sections';
import { HashRouter } from './app/HashRouter';
import { useHashRoute } from './app/useHashRoute';
import { AgentDialog } from './features/shared/AgentDialog';
import type { Agent } from './features/shared/phases';
import { scenarioCodec } from './features/costs/costModel';
import { WelcomePage } from './features/welcome/WelcomePage';

/** Las páginas se descargan al visitarlas: la primera carga solo trae el marco, la bienvenida y el panorama. */
const Continuity = lazy(() => import('./components/Continuity').then(m => ({ default: m.Continuity })));
const GuidedExperience = lazy(() => import('./components/GuidedExperience').then(m => ({ default: m.GuidedExperience })));
const PitchStage = lazy(() => import('./components/PitchStage').then(m => ({ default: m.PitchStage })));
const SolutionPage = lazy(() => import('./features/solution/SolutionPage').then(m => ({ default: m.SolutionPage })));
const BenefitsPage = lazy(() => import('./features/benefits/BenefitsPage').then(m => ({ default: m.BenefitsPage })));
const DistinctPage = lazy(() => import('./features/distinct/DistinctPage').then(m => ({ default: m.DistinctPage })));
const FaqPage = lazy(() => import('./features/faq/FaqPage').then(m => ({ default: m.FaqPage })));
const EthicsPage = lazy(() => import('./features/ethics/EthicsPage').then(m => ({ default: m.EthicsPage })));
const ImplementationPage = lazy(() => import('./features/implementation/ImplementationPage').then(m => ({ default: m.ImplementationPage })));
const CostsPage = lazy(() => import('./features/costs/CostsPage').then(m => ({ default: m.CostsPage })));
const PublicsPage = lazy(() => import('./features/publics/PublicsPage').then(m => ({ default: m.PublicsPage })));
const SupportPage = lazy(() => import('./features/support/SupportPage').then(m => ({ default: m.SupportPage })));
const TeamPage = lazy(() => import('./features/team/TeamPage').then(m => ({ default: m.TeamPage })));
const MeshPage = lazy(() => import('./features/mesh/MeshPage').then(m => ({ default: m.MeshPage })));
const AsesoriaPage = lazy(() => import('./features/asesoria/AsesoriaPage').then(m => ({ default: m.AsesoriaPage })));
const CaseSummary = lazy(() => import('./features/asesoria/CaseSummary').then(m => ({ default: m.CaseSummary })));
const CaseProcess = lazy(() => import('./features/asesoria/CaseProcess').then(m => ({ default: m.CaseProcess })));
const CaseValidation = lazy(() => import('./features/asesoria/CaseValidation').then(m => ({ default: m.CaseValidation })));
const CatalogPage = lazy(() => import('./features/catalog/CatalogPage').then(m => ({ default: m.CatalogPage })));
const OperationsPage = lazy(() => import('./features/operations/OperationsPage').then(m => ({ default: m.OperationsPage })));

export function App() {
  const { cases, update, reset, storageError } = useDemoCases();
  const [recording, setRecording] = useState(false);
  const router = useMemo(() => new HashRouter(sectionRegistry, HOME_SECTION_ID, legacyRouteAliases), []);
  const [route, navigate] = useHashRoute(router); const page = route.sectionId;
  const [query, setQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const go = (next: string, sub?: string, params?: Record<string, string>) => { setRecording(false); navigate({ sectionId: next, sub, params }); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const goCase = (sub: string) => go(CASE_SECTION_ID, sub);
  useEffect(() => { setRecording(false); }, [page]);
  // Cada fase del ciclo corresponde a un momento del ciclo en La solución.
  const momentOfPhase: Record<string, string> = { escucha: 'escuchar', analitica: 'comprender', respuesta: 'realimentar' };
  const openPhase = (phase: string) => go('solucion', undefined, { momento: momentOfPhase[phase] ?? '' });
  const openAudience = (id: string) => go('publicos', id);
  // Una pregunta abierta se refleja en la URL sin añadir historial ni mover la página.
  const faqHash = (id?: string) => router.format({ sectionId: 'preguntas', params: id ? { q: id } : {} });
  const syncFaqUrl = (id?: string) => window.history.replaceState(null, '', faqHash(id));
  // Un escenario del simulador se comparte como parámetros en la URL.
  const costsLink = (input: Parameters<typeof scenarioCodec.encode>[0]) => window.location.href.split('#')[0] + router.format({ sectionId: 'costos', params: scenarioCodec.encode(input) });
  // Un documento abierto del Dossier vive en la URL, así se puede compartir.
  const docHash = (id?: string) => router.format({ sectionId: 'soporte', params: id ? { doc: id } : {} });
  const docLink = (id: string) => window.location.href.split('#')[0] + docHash(id);
  const inspect = (id: string) => setSelectedAgent(agents.find(a => a.id === id) ?? null);
  const caseView = (tab: string) => {
    switch (tab) {
      case 'proceso': return <CaseProcess />;
      case 'malla': return <MeshPage onInspect={inspect} />;
      case 'agentes': return <CatalogPage query={query} onQuery={setQuery} onSelect={setSelectedAgent} />;
      case 'memoria': return <Continuity cases={cases} onPanel={() => goCase('operacion')} />;
      case 'operacion': return <OperationsPage cases={cases} update={update} reset={reset} />;
      case 'validacion': return <CaseValidation onOpenSupport={() => go('soporte')} />;
      default: return <CaseSummary registry={sectionRegistry} onOpen={goCase} />;
    }
  };
  return <AppShell registry={sectionRegistry} page={page} sub={route.sub} recording={recording} onNavigate={go}
    notice={storageError && <p role="alert" className="demo-note">No se pudieron guardar los cambios en este navegador. Se conservarán solo mientras la página permanezca abierta.</p>}
    overlay={selectedAgent && <AgentDialog key={selectedAgent.id} agent={selectedAgent} close={() => setSelectedAgent(null)} />}>
        <Suspense fallback={<p className="page-loading" role="status">Cargando…</p>}>
        {page === HOME_SECTION_ID && <WelcomePage registry={sectionRegistry} onNavigate={go} onPhase={openPhase} />}
        {page === 'solucion' && <SolutionPage focus={route.params.momento} onOpenCase={() => goCase('proceso')} />}
        {page === 'beneficios' && <BenefitsPage registry={sectionRegistry} sub={route.sub} onNavigate={go} onOpenAudience={openAudience} />}
        {page === 'distintos' && <DistinctPage onOpenValidation={() => goCase('validacion')} onOpenFaq={() => go('preguntas')} />}
        {page === 'preguntas' && <FaqPage key={route.params.q ?? ''} registry={sectionRegistry} initialOpen={route.params.q} onNavigate={go} onOpenChange={syncFaqUrl} onHelp={() => go(HOME_SECTION_ID)} />}
        {page === 'etica' && <EthicsPage focus={route.params.tema} onNavigate={go} />}
        {page === 'implementacion' && <ImplementationPage onNavigate={go} />}
        {page === 'costos' && <CostsPage params={route.params} linkFor={costsLink} onNavigate={go} />}
        {page === CASE_SECTION_ID && <AsesoriaPage registry={sectionRegistry} sub={route.sub} onNavigate={go} onOpenRisk={() => go('etica', undefined, { tema: 'riesgo' })}>{caseView(route.sub ?? 'resumen')}</AsesoriaPage>}
        {page === 'pitch' && <PitchStage recording={recording} onRecording={setRecording} onInspect={inspect} onPanel={() => goCase('operacion')} />}
        {page === 'recorrido' && <GuidedExperience cases={cases} onAudience={openAudience} onMemory={() => goCase('memoria')} onPanel={() => goCase('operacion')} />}
        {page === 'soporte' && <SupportPage doc={route.params.doc} linkFor={docLink} onOpenDoc={id => go('soporte', undefined, id ? { doc: id } : {})} onNavigate={go} />}
        {page === 'equipo' && <TeamPage onNavigate={go} />}
        {page === 'publicos' && <PublicsPage registry={sectionRegistry} sub={route.sub} onNavigate={go} />}
        </Suspense>
  </AppShell>;
}
export default App;
