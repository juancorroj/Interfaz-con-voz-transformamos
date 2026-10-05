import type { SectionRegistry } from './SectionRegistry';

export interface Route {
  sectionId: string;
  /** Subpágina dentro de la sección (por ejemplo, una pestaña del caso). */
  sub?: string;
  params: Record<string, string>;
}

export type RouteTarget = Pick<Route, 'sectionId'> & Partial<Pick<Route, 'sub' | 'params'>>;

/** Rutas antiguas que ahora viven dentro de otra sección. Conserva los enlaces ya compartidos. */
export type RouteAliases = Record<string, RouteTarget>;

/**
 * Traduce entre la parte `#` de la URL y los identificadores del registro de
 * secciones. Las páginas no conocen el formato de la URL: solo trabajan con
 * `Route`. Formato: `#/<seccion>[/<sub>][?<param>=<valor>&…]`.
 */
export class HashRouter {
  constructor(
    private readonly registry: SectionRegistry,
    private readonly fallbackId: string,
    private readonly aliases: RouteAliases = {},
  ) {}

  /**
   * Nunca falla: un hash vacío, desconocido o de una sección oculta devuelve la
   * ruta de respaldo, y una subpágina que la sección no declara se descarta.
   */
  parse(hash: string): Route {
    const [path = '', query = ''] = hash.replace(/^#\/?/, '').split('?');
    const [rawSection = '', rawSub] = path.split('/').filter(Boolean).map(safeDecode);
    const params = Object.fromEntries(new URLSearchParams(query));

    const alias = this.aliases[rawSection];
    if (alias) return { sectionId: alias.sectionId, sub: alias.sub, params: { ...alias.params, ...params } };

    const section = this.registry.byId(rawSection);
    if (!section || section.hidden) return { sectionId: this.fallbackId, params: {} };
    const sub = rawSub && this.registry.subsection(section.id, rawSub) ? rawSub : undefined;
    return { sectionId: section.id, sub, params };
  }

  format({ sectionId, sub, params = {} }: RouteTarget): string {
    const path = [sectionId, sub].filter((s): s is string => Boolean(s)).map(encodeURIComponent).join('/');
    const query = new URLSearchParams(params).toString();
    return `#/${path}${query ? `?${query}` : ''}`;
  }
}

function safeDecode(segment: string): string {
  try { return decodeURIComponent(segment); } catch { return segment; }
}
