import { useState, type ReactNode } from 'react';
import { AudioLines, Orbit } from 'lucide-react';
import claudeCodeLogo from '../assets/brand/claude-code-logo-ivory.svg';
import type { SectionRegistry } from './SectionRegistry';
import { PageNav } from './navigation/PageNav';
import { HOME_SECTION_ID } from './sections';

interface AppShellProps {
  registry: SectionRegistry;
  page: string;
  recording: boolean;
  /** Subpágina activa de la sección actual, si la hay. */
  sub?: string;
  onNavigate: (id: string, sub?: string) => void;
  /** Aviso global bajo la barra superior (por ejemplo, fallo de almacenamiento). */
  notice?: ReactNode;
  /** Elementos superpuestos al área de trabajo (diálogos). */
  overlay?: ReactNode;
  children: ReactNode;
}

/** Marco de la aplicación: menú lateral, barra superior, contenido y pie. */
export function AppShell({ registry, page, sub, recording, onNavigate, notice, overlay, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(true);
  const current = registry.byId(page);
  const currentGroup = registry.groupFor(page);
  const currentSub = registry.subsection(page, sub);
  const team = registry.byId('equipo');
  const footerLinks = registry.footerLinks();
  return <div className={`resonancia-shell page-${page} ${current?.legacyClass ? `page-${current.legacyClass}` : ''} ${collapsed ? 'sidebar-collapsed' : ''} ${recording ? 'video-mode' : ''}`}>
    <aside className="sidebar"
      onPointerEnter={e => { if (e.pointerType === 'mouse') setCollapsed(false); }}
      onPointerLeave={e => { if (!e.currentTarget.querySelector(':focus-visible')) setCollapsed(true); }}
      onFocus={e => { if (e.target.matches(':focus-visible')) setCollapsed(false); }}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget) && !e.currentTarget.matches(':hover')) setCollapsed(true); }}
    ><button className="brand" aria-label="ResonancIA · Ir a la bienvenida" title="ResonancIA" onClick={() => onNavigate(HOME_SECTION_ID)}><AudioLines size={34} /><span>ResonancIA<small>MEMORIA INSTITUCIONAL VIVA</small></span></button>
      <nav aria-label="Principal">{registry.groups().map(({ group, sections }) => <div key={group.id} className="nav-group" role="group" aria-labelledby={`nav-group-${group.id}`}>
        <div id={`nav-group-${group.id}`} className="workspace-label nav-group-label">{group.label}</div>
        {sections.filter(n => n.sidebar !== false).map(n => <button key={n.id} aria-label={n.label} title={collapsed ? n.label : undefined} onClick={() => onNavigate(n.id)} className={page === n.id ? 'active' : ''} aria-current={page === n.id ? 'page' : undefined}><n.icon size={19} /><span className="nav-label">{n.label}</span>{page === n.id && <span className="nav-dot" />}</button>)}
      </div>)}</nav>
      <div className="sidebar-bottom"><Orbit size={26} /><p>Inteligencia que acompaña.<br /><strong>Decisiones humanas.</strong></p>
        {team
          ? <button className="team team-link" onClick={() => onNavigate(team.id)}><span>R</span><div>Equipo ResonancIA<small>Laboratorio de innovación</small></div></button>
          : <div className="team"><span>R</span><div>Equipo ResonancIA<small>Laboratorio de innovación</small></div></div>}
      </div>
    </aside>
    <div className="workspace"><header className="topbar"><span>ResonancIA <span className="slash">/</span> {currentGroup && currentGroup.breadcrumb !== false && <>{currentGroup.label} <span className="slash">/</span> </>}{current?.label}{currentSub && <> <span className="slash">/</span> {currentSub.label}</>}</span><span className="simulation"><i />Prototipo · Datos de simulación</span></header>
      <main className="res-main">{notice}
        {children}
        {current?.showPager !== false && <PageNav {...registry.pagerFor(page, sub)} onNavigate={onNavigate} />}
        <footer className="res-footer"><span>ResonancIA <span>· Con Voz Transformamos</span></span><span>Exploramos. Experimentamos. Evolucionamos.</span>
          {footerLinks.length > 0 && <nav className="res-footer-links" aria-label="Enlaces del pie">{footerLinks.map(s => <button key={s.id} onClick={() => onNavigate(s.id)}>{s.label}</button>)}</nav>}
          <span className="res-credit">Desarrollado en conjunto con <img src={claudeCodeLogo} alt="Claude Code" height={15} /></span>
        </footer>
      </main>
    </div>{overlay}
  </div>;
}
