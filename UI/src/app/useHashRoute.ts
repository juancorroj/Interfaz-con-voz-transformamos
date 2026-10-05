import { useCallback, useEffect, useState } from 'react';
import type { HashRouter, Route, RouteTarget } from './HashRouter';

/**
 * Mantiene la ruta actual sincronizada con `location.hash`: el botón Atrás,
 * los enlaces compartidos y la navegación del menú pasan por el mismo camino.
 * Si el hash es una ruta antigua o desconocida, se reescribe a su forma
 * canónica sin añadir una entrada al historial.
 */
export function useHashRoute(router: HashRouter): [Route, (target: RouteTarget) => void] {
  const [route, setRoute] = useState<Route>(() => router.parse(window.location.hash));

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      const next = router.parse(hash);
      const canonical = router.format(next);
      if (hash && hash !== canonical) window.history.replaceState(null, '', canonical);
      setRoute(next);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [router]);

  const navigate = useCallback((target: RouteTarget) => {
    const next = router.format(target);
    if (window.location.hash === next) setRoute(router.parse(next));
    else window.location.hash = next;
  }, [router]);

  return [route, navigate];
}
