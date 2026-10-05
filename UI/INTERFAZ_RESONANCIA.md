# Interfaz ResonancIA

Portal de presentación y exploración en `Repo/UI`. Conserva la estética oscura y la galaxia, con un recorrido centrado en las personas.

## Ejecutar

Desde `Repo/UI`:

```powershell
npm ci
npm run dev -- --host 127.0.0.1
```

Abrir la dirección indicada por Vite (normalmente http://127.0.0.1:3000). Compilar: `npm run build`.

## Presentar

En la navegación, elegir **Pitch**. Son ocho escenas alineadas con el guion de video actualizado en `Pitch/Pitch_Maestro_ResonancIA_5Minutos.md`. Las pautas suman cinco minutos; la duración de la locución requiere ensayo humano. Se puede avanzar con las flechas del teclado, seleccionar escenas, consultar notas o reproducir la pauta automática.

**Modo grabación** oculta la navegación y los controles de presentación; no graba video. Escape devuelve los controles. Para un avance automático durante la captura, iniciar antes **Reproducir pauta**. También hay una opción de pantalla completa. La barra lateral se puede contraer sin perder el logo ni los accesos.

## Vistas y fuentes

La web se organiza en siete grupos del menú. El registro único está en `src/app/sections.ts`; agregar una página es registrarla ahí. El contenido que proviene de la ficha técnica vive en `src/content/ficha/`, y los componentes solo lo pintan.

| Grupo | Páginas | Fuente principal |
|---|---|---|
| Presentar | **Pitch**: ocho escenas, notas de locución y modo grabación (sin cambios) | `Pitch/Pitch_Maestro_ResonancIA_5Minutos.md` |
| Empezar | **Bienvenida y guía**: entrada con galaxia y cifras, ¿Qué es ResonancIA?, por dónde empezar, mapa de la web tipo metro y alcance con la leyenda de sellos (absorbió a Panorama; `#/inicio` redirige) | Ficha (Descripción) |
| Conocer | **La solución**, **Beneficios** (4 pestañas), **Lo que nos hace distintos**, **Preguntas frecuentes** (27) | Ficha (B.1 a B.3) |
| Caso Asesoría | **Asesoría Psicopedagógica** con siete pestañas: Resumen, Proceso, Malla de agentes, Catálogo, Memoria viva, Panel del profesional, Validación | `Casos-de-uso/Asesoria-Psicopedagogica`, `src/data/agents.json` |
| Otros públicos | **Casos de uso por público**: Panorama y una pestaña por público (Estudiantes, Graduados, Profesores, Administrativos, Aliados) | `Casos-de-uso/MATRIZ_REUTILIZACION_AGENTES.md` |
| Gobierno | **Ética y marco legal**, **Implementación**, **Costos** (cifras de la ficha y simulador con escenarios guardados y comparación) | Ficha, `Implementacion/` |
| Anexos | **Soporte técnico** (resumen del Dossier y lectura de sus `.md`) y **Equipo** (se abre desde el pie del menú) | `Dossier/`, ficha (Equipo) |

Detalles que conviene saber:

- Todas las páginas tienen URL por hash (`#/costos`, `#/publicos/profesores`, `#/preguntas?q=...`, `#/soporte?doc=hallazgos`). Las rutas antiguas (`#/malla`, `#/agentes`, `#/memoria`, `#/operacion`) siguen funcionando y llevan a la pestaña correspondiente de Asesoría.
- Los sellos son tres y significan lo mismo en toda la web: *Ejecutado y validado* (solo Asesoría), *Diseñado, no ejecutado* y *Ejemplo ficticio*.
- El simulador de costos reproduce el modelo de `Implementacion/modelo_costos_2026.py`; las pruebas comparan sus resultados con `modelo_costos_2026_resultados.json`. Los escenarios guardados usan su propia clave de `localStorage`, distinta de la del panel.
- El lector de Markdown de Soporte técnico no es una librería: es un analizador propio (`src/ui/markdown`) que nunca inserta HTML. Lee `.md` de `Dossier/` bajo demanda; por eso `vite.config.ts` permite el acceso a la carpeta superior. Solo se leen completos los documentos revisados; los dos dossiers extensos se resumen.
- El Recorrido guiado anterior (`GuidedExperience`) sigue en el código, oculto del menú; su contenido quedó cubierto por Proceso, Memoria viva, Beneficios y Casos de uso por público.
- Las páginas se descargan al visitarlas (carga bajo demanda). La primera carga trae solo el marco, la Bienvenida y el Panorama.

Pruebas: `npm test` ejecuta las pruebas de registro de secciones, rutas, contenido de la ficha, modelo de costos, escenarios, analizador de Markdown y cobertura de la ficha.

## Estado y límites

`src/services/useDemoCases.ts` persiste únicamente el ejemplo ficticio en la clave `RESONANCIA_PRESENTACION_FICTICIA_V2` de localStorage. No reutiliza las historias del panel anterior. Al cambiar un acuerdo a pendiente se reabre el seguimiento simulado. Los textos históricos de los encuentros permanecen como antecedentes; los estados actuales se muestran en los acuerdos.

La aplicación no graba audio, ejecuta agentes, autentica usuarios, manda comunicaciones ni emite certificados. La selección de rol cambia una vista; no es control real de acceso. No cargar datos reales. El estado de autorización se usa solo para habilitar un ejemplo estático y se reinicia al salir del recorrido.

Pendientes: procedimiento de autorización; captura, almacenamiento y conservación; política de acceso y cambio de responsable; controles de servidor; canales e integraciones; validación de escenarios y criterios analíticos con cada área; ensayo cronometrado.

Ver `CAMBIOS_REUNION_22_SEPT.md` y `CAMBIOS_INMERSION_25_SEPT.md` para los registros anteriores, y `CAMBIOS_UPGRADE_UI.md` para la reorganización por fases.
