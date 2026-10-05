import type { LucideIcon } from 'lucide-react';
import type { StatusKind } from '../content/types';

export interface SectionGroup {
  id: string;
  /** Nombre en mayúsculas y minúsculas normales; el menú lo muestra en versalitas por CSS. */
  label: string;
  /** Si es false, la miga de pan omite el grupo (por ejemplo, cuando repetiría el nombre de la página). */
  breadcrumb?: boolean;
  /** Una línea que explica qué encontrará la persona en el grupo (guía de bienvenida). */
  description?: string;
  icon?: LucideIcon;
}

/** Subpágina de una sección (por ejemplo, una pestaña del caso de Asesoría). */
export interface SubsectionDefinition {
  id: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
  /** Estado del caso que describe la subpágina; las tarjetas que la enlazan muestran su sello. */
  status?: StatusKind;
  /** Rótulo del grupo de pestañas al que pertenece; la barra lo muestra cuando cambia de un grupo a otro. */
  group?: string;
  /** Nombre corto para la barra de pestañas, cuando el completo no cabe. */
  shortLabel?: string;
}

/** Destino de navegación: una sección y, opcionalmente, una de sus subpáginas. */
export interface NavTarget {
  id: string;
  label: string;
  sub?: string;
}

/** Destino ya resuelto contra el registro, con lo necesario para pintarlo. */
export interface ResolvedStep extends NavTarget {
  description?: string;
  icon?: LucideIcon;
  status?: StatusKind;
}

export interface SectionDefinition {
  id: string;
  label: string;
  icon: LucideIcon;
  group: string;
  /** Subpáginas, en orden. La sección las muestra como pestañas. */
  subsections?: SubsectionDefinition[];
  /** Una línea que explica qué hay en la página (guía de bienvenida). */
  description?: string;
  /** Sigue siendo navegable por código, pero no aparece en el menú. */
  hidden?: boolean;
  /** Si es false, la página no muestra los botones Anterior / Siguiente. */
  showPager?: boolean;
  /** Si es true, aparece como enlace en el pie de página. */
  footer?: boolean;
  /** Clase de estilo heredada de una página que se fusionó con esta (`page-<clase>`), para conservar sus reglas. */
  legacyClass?: string;
  /** Si es false, no es una entrada del menú lateral porque tiene su propio acceso; sigue en la guía, el pie y la navegación secuencial. */
  sidebar?: boolean;
}

export interface SectionSiblings {
  prev?: NavTarget;
  next?: NavTarget;
}

export interface GroupedSections {
  group: SectionGroup;
  sections: SectionDefinition[];
}

/**
 * Fuente única de verdad de qué secciones existen, cómo se agrupan y en qué
 * orden. El menú, la miga y la navegación secuencial se alimentan de aquí:
 * agregar una página es registrarla, sin editar el shell.
 */
export class SectionRegistry {
  private readonly groupsById = new Map<string, SectionGroup>();
  private readonly sectionsById = new Map<string, SectionDefinition>();

  registerGroup(group: SectionGroup): this {
    if (this.groupsById.has(group.id)) throw new Error(`Grupo duplicado: ${group.id}`);
    this.groupsById.set(group.id, group);
    return this;
  }

  register(section: SectionDefinition): this {
    if (this.sectionsById.has(section.id)) throw new Error(`Sección duplicada: ${section.id}`);
    if (!this.groupsById.has(section.group)) throw new Error(`Grupo desconocido para ${section.id}: ${section.group}`);
    this.sectionsById.set(section.id, section);
    return this;
  }

  byId(id: string): SectionDefinition | undefined {
    return this.sectionsById.get(id);
  }

  all(): SectionDefinition[] {
    return [...this.sectionsById.values()];
  }

  subsection(sectionId: string, subId?: string): SubsectionDefinition | undefined {
    return subId ? this.sectionsById.get(sectionId)?.subsections?.find(s => s.id === subId) : undefined;
  }

  /**
   * Resuelve una ruta escrita como `seccion` o `seccion/sub`. Devuelve
   * `undefined` si no existe o es una sección oculta.
   */
  resolveStep(path: string): ResolvedStep | undefined {
    const [sectionId, subId] = path.split('/');
    const section = this.sectionsById.get(sectionId);
    if (!section || section.hidden) return undefined;
    if (!subId) return { id: section.id, label: section.label, description: section.description, icon: section.icon };
    const sub = this.subsection(sectionId, subId);
    return sub && { id: section.id, sub: sub.id, label: sub.label, description: sub.description, icon: sub.icon ?? section.icon, status: sub.status };
  }

  groupFor(sectionId: string): SectionGroup | undefined {
    const section = this.sectionsById.get(sectionId);
    return section && this.groupsById.get(section.group);
  }

  /** Secciones visibles que piden un enlace en el pie de página. */
  footerLinks(): SectionDefinition[] {
    return this.visible().filter(s => s.footer);
  }

  /** Secciones que aparecen en el menú, en orden de registro. */
  visible(): SectionDefinition[] {
    return this.all().filter(s => !s.hidden);
  }

  /** Grupos con al menos una sección visible, en orden de registro. */
  groups(): GroupedSections[] {
    const visible = this.visible();
    return [...this.groupsById.values()]
      .map(group => ({ group, sections: visible.filter(s => s.group === group.id) }))
      .filter(g => g.sections.length > 0);
  }

  /**
   * Anterior y siguiente de una página. Si la sección tiene subpáginas, se
   * recorren primero sus pestañas y, en los extremos, se pasa a la sección
   * vecina del menú.
   */
  pagerFor(sectionId: string, subId?: string): SectionSiblings {
    const outer = this.siblings(sectionId);
    const tabs = this.sectionsById.get(sectionId)?.subsections;
    if (!tabs?.length) return outer;
    const index = Math.max(0, tabs.findIndex(t => t.id === subId));
    const toTarget = (i: number): NavTarget | undefined => tabs[i] && { id: sectionId, sub: tabs[i].id, label: tabs[i].label };
    return { prev: toTarget(index - 1) ?? outer.prev, next: toTarget(index + 1) ?? outer.next };
  }

  /** Vecinas anterior y siguiente dentro del orden visible del menú. */
  siblings(id: string): SectionSiblings {
    const visible = this.visible();
    const index = visible.findIndex(s => s.id === id);
    if (index < 0) return {};
    return { prev: visible[index - 1], next: visible[index + 1] };
  }
}
