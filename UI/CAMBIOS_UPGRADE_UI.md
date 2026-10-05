# Cambios de la reorganización de la interfaz (Upgrade-UI)

Registro de lo hecho por fases. El plan, las decisiones (D1 a D19) y la arquitectura están en `../Upgrade-UI/`. Cada fase tiene su commit.

## Lo que no cambió
- El **Pitch** (componentes, escenas, estilos y modo grabación). Se verificó en cada fase que el diff de sus ocho archivos estuviera vacío.
- Cómo funciona la app: no hay backend, los datos son ficticios y el único almacenamiento es `localStorage` (clave del panel sin cambios).
- `data/agents.json`, `data/demoCases.ts`, `data/audiences.ts`.

## Fases
| Fase | Commit | Qué entregó |
|---|---|---|
| 1a-1c | `53d4140`, `d5ebe02`, `c848c8a`, `54980e4` | Registro de secciones y shell; vistas movidas a `features/`; `motion`, `vitest`, enrutado por hash, tipos de contenido y tokens |
| 2 | `ac7da09` | Menú agrupado, miga de pan, Anterior/Siguiente, marca de Claude Code en el pie |
| 3 | `5177fbc` | Bienvenida y guía; Panorama renovado |
| 5 | `52a4e4e` | Hub del caso Asesoría con siete pestañas |
| 4 | `a00490a` | La solución y Beneficios |
| 4B | `e967f96` | Lo que nos hace distintos y Preguntas frecuentes |
| 7 | `20f62bf` | Ética y marco legal; Implementación |
| 8 | `7b5c0d8` | Costos con simulador, escenarios guardados y comparación |
| 6 | `41328ea` | Casos de uso por público |
| 9 | `88753ae` | Soporte técnico (lector de `.md` del Dossier) y Equipo |
| 10 | este cambio | Pulido y cierre (abajo) |

## Fase 10
- **Carga bajo demanda**: las páginas pasan a cargarse al visitarlas. El paquete principal bajó de 891 kB a 622 kB (de 283 kB a 204 kB comprimido). Lo que queda es React, `motion` y `agents.json` (295 kB), que usa el Panorama.
- **Accesibilidad**: se recorrieron las 24 rutas buscando botones o campos sin nombre, imágenes sin `alt`, `id` duplicados, saltos de nivel de título y desbordamiento horizontal. Se corrigieron los saltos de título en Costos, Implementación, Beneficios y el lector de documentos. Queda el Catálogo de agentes, cuyas tarjetas usan `h3` bajo el `h1` (estilo compartido con el Pitch; no se tocó).
- **Cobertura de la ficha**: la prueba `src/app/coverage.test.ts` recorre la tabla de trazabilidad ficha → interfaz y falla si una parte de la ficha se queda sin página.
- **Recorrido guiado (`GuidedExperience`)**: se mantiene oculto (D5). Sus cinco capítulos están cubiertos por Proceso, Memoria viva, Beneficios y Casos de uso por público.
- **Documentación**: `INTERFAZ_RESONANCIA.md` actualizado a la estructura actual.

## Pendientes y avisos
- `npm audit` reporta 5 vulnerabilidades altas, todas en la cadena de `tailwindcss` (`micromatch`, `braces`, `fast-glob`). Son de herramientas de compilación, no van en el paquete publicado, y arreglarlas con `--force` implica una actualización mayor de Tailwind. No se aplicó.
- La advertencia de tamaño de Vite persiste (622 kB). Bajarla más exige cargar `agents.json` bajo demanda.
- Documentos fuente con errores que la web ya corrige o evita: la matriz de reutilización y el índice del Dossier decían 89 especificaciones (son 87, ya corregido); el Registro de hallazgos suma "7 cerrados" (son 6 cerrados y 1 abordado en especificación; **sin corregir en el documento**).
- Los dos dossiers extensos (`DOSSIER_CERTIFICACION_FORENSE_Y_EVIDENCIAS.md`, `dossier_soporte_procesamiento_y_certificacion_forense.md`) tienen rutas locales y cifras ya retiradas; no se publican completos.
- El banco de 27 preguntas frecuentes espera revisión del equipo antes de presentarse.
