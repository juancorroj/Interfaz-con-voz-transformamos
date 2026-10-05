import type { ResolvedStep, SectionRegistry } from '../../app/SectionRegistry';
import type { GuideRoute } from '../../content/types';

export interface ResolvedRoute extends Omit<GuideRoute, 'steps'> {
  steps: ResolvedStep[];
}

/** Clave estable de un destino, útil para listas. */
export const stepKey = (s: Pick<ResolvedStep, 'id' | 'sub'>) => (s.sub ? `${s.id}/${s.sub}` : s.id);

/**
 * Convierte los recorridos sugeridos en destinos reales. Omite los pasos que
 * aún no existen o están ocultos y descarta los recorridos que se quedan sin
 * pasos, de modo que la guía solo ofrece lo que se puede visitar.
 */
export function resolveRoutes(routes: GuideRoute[], registry: SectionRegistry): ResolvedRoute[] {
  return routes
    .map(route => ({
      ...route,
      steps: route.steps.map(path => registry.resolveStep(path)).filter((s): s is ResolvedStep => Boolean(s)),
    }))
    .filter(route => route.steps.length > 0);
}
