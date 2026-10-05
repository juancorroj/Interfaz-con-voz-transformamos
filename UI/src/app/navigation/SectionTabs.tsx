import type { SectionRegistry } from '../SectionRegistry';

interface SectionTabsProps {
  registry: SectionRegistry;
  sectionId: string;
  /** Pestaña activa; si falta, se marca la primera. */
  sub?: string;
  label: string;
  onNavigate: (id: string, sub?: string) => void;
}

/** Barra de pestañas de una sección con subpáginas. Se queda fija al desplazarse; si las pestañas tienen grupo, cada grupo lleva su rótulo encima. */
export function SectionTabs({ registry, sectionId, sub, label, onNavigate }: SectionTabsProps) {
  const tabs = registry.byId(sectionId)?.subsections ?? [];
  const activeId = tabs.find(t => t.id === sub)?.id ?? tabs[0]?.id;
  const button = (t: (typeof tabs)[number], i: number) => <button key={t.id} className={t.id === activeId ? 'active' : ''} aria-current={t.id === activeId ? 'page' : undefined} onClick={() => onNavigate(sectionId, t.id)}>
    <span className="section-tab-number">{i + 1}</span>{t.icon && <t.icon size={16} aria-hidden="true" />}<span>{t.shortLabel ?? t.label}</span>
  </button>;

  if (!tabs.some(t => t.group)) return <nav className="section-tabs" aria-label={label}>{tabs.map(button)}</nav>;

  const sets: { group: string; items: { tab: (typeof tabs)[number]; index: number }[] }[] = [];
  tabs.forEach((tab, index) => {
    const group = tab.group ?? '';
    const last = sets[sets.length - 1];
    if (last && last.group === group) last.items.push({ tab, index }); else sets.push({ group, items: [{ tab, index }] });
  });
  return <nav className="section-tabs grouped" aria-label={label}>
    {sets.map(set => <div key={set.group} className="section-tab-set" role="group" aria-label={set.group}>
      <span className="section-tab-group" aria-hidden="true">{set.group}</span>
      <div className="section-tab-row">{set.items.map(({ tab, index }) => button(tab, index))}</div>
    </div>)}
  </nav>;
}
