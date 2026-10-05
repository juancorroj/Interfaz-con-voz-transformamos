import { describe, expect, it } from 'vitest';
import { createSectionRegistry } from './sections';

/** Trazabilidad ficha → interfaz (Upgrade-UI/01-estructura.md §2.5): ninguna parte de la ficha puede quedar sin página. */
const trace: { ficha: string; pages: string[] }[] = [
  { ficha: 'A. Equipo', pages: ['equipo'] },
  { ficha: 'B. Descripción: premisa, tres momentos, ciclo, co-inteligencia, 3E/ABT', pages: ['solucion'] },
  { ficha: 'B. Descripción: dónde funciona y madurez', pages: ['asesoria/resumen', 'asesoria/proceso', 'asesoria/validacion'] },
  { ficha: 'B. Descripción: extensión a otros públicos', pages: ['publicos/panorama'] },
  { ficha: 'B. Beneficios', pages: ['beneficios/personas', 'beneficios/procesos', 'beneficios/universidad', 'beneficios/publicos'] },
  { ficha: 'B. Innovación y diferenciación', pages: ['distintos', 'preguntas'] },
  { ficha: 'B. Implementación, tiempos y condiciones', pages: ['implementacion'] },
  { ficha: 'B. Costos', pages: ['costos'] },
  { ficha: 'B. Marco legal y señal de riesgo', pages: ['etica'] },
  { ficha: 'Detalle técnico disponible', pages: ['asesoria/malla', 'asesoria/agentes', 'soporte'] },
  { ficha: 'Casos de uso disponibles', pages: ['publicos/estudiantes', 'publicos/graduados', 'publicos/profesores', 'publicos/administrativos', 'publicos/aliados'] },
];

describe('cobertura de la ficha', () => {
  const registry = createSectionRegistry();
  for (const row of trace) {
    it(`${row.ficha} tiene página`, () => {
      for (const page of row.pages) expect(registry.resolveStep(page), page).toBeDefined();
    });
  }
  it('toda sección visible es alcanzable desde el menú, el pie o la secuencia', () => {
    const inSequence = new Set(registry.visible().map(s => s.id));
    for (const s of registry.visible()) expect(inSequence.has(s.id)).toBe(true);
  });
});

describe('enlaces antiguos', () => {
  it('#/inicio (Panorama, fusionado con Bienvenida) lleva a Bienvenida', async () => {
    const { HashRouter } = await import('./HashRouter');
    const { HOME_SECTION_ID, legacyRouteAliases } = await import('./sections');
    const router = new HashRouter(createSectionRegistry(), HOME_SECTION_ID, legacyRouteAliases);
    expect(router.parse('#/inicio').sectionId).toBe('bienvenida');
  });
});

describe('pestañas del caso de Asesoría', () => {
  it('cada pestaña pertenece a un grupo y los grupos son contiguos', () => {
    const tabs = createSectionRegistry().byId('asesoria')?.subsections ?? [];
    expect(tabs.every(t => t.group)).toBe(true);
    const groups = tabs.map(t => t.group);
    expect(groups.filter((g, i) => g !== groups[i - 1])).toEqual(['Entender', 'Verlo en uso', 'Por dentro', 'Qué tan lejos llegó']);
  });
});
