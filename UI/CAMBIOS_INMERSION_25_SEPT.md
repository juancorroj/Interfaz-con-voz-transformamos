# Cambios de interfaz · Inmersión Reto Rector

## Fuentes y alcance

Se priorizó el inicio de `Inmersión Reto Rector.docx`: navegación plegable conservando el logo, acceso dedicado al Pitch, presentación limpia para capturar video y visualización de la coordinación entre agentes. Se consultaron el mockup de `Pitch/Mockup`, el guion actualizado `Pitch/Pitch_Maestro_ResonancIA_5Minutos.md`, las especificaciones de Escucha y Realimentación y los modelos de los cinco públicos.

## Implementación

- Panorama recupera la composición original: galaxia, título y tres etapas. Conserva cifras explícitas de especificaciones y simulación.
- La barra lateral se contrae conservando el logo y accesos por icono.
- Pitch ofrece ocho escenas con la pauta de cinco minutos del formato video del guion, notas de locución, selección de escenas y avance por teclado.
- Modo grabación oculta navegación y controles. No captura video. Escape permite salir; las flechas permiten avanzar. Para avance automático, iniciar la pauta antes de entrar en este modo.
- La malla muestra los ocho agentes de Escucha y los ocho de Realimentación, con selección, especificación y animación ilustrativa. Se puede explorar independientemente del pitch.
- El catálogo se sincroniza desde los archivos actuales mediante `npm run sync:agents`. Incluye 16 especificaciones y cinco roles metodológicos; no ejecuta agentes.
- El panel profesional y su lógica de datos ficticios se mantienen sin modificaciones.

`AgentMesh.tsx` y `PitchStage.tsx` separan la malla y los diagramas de presentación. Las carpetas `Archify` y `Difflin` estaban vacías al revisar; no se incorporaron dependencias inferidas a partir de los nombres de la transcripción.

## Verificación

Compilación de producción con TypeScript y Vite. Navegación por las ocho escenas en navegador, inspector de especificaciones de Realimentación, acceso al panel profesional, entrada y salida del modo grabación, composición de escritorio (1440 × 900) y ausencia de desbordamiento horizontal del ciclo en vista estrecha (390 × 844).

## Límites

La pauta es para ensayar; la duración de la narración requiere una prueba humana. Los diagramas simplifican la topología documentada. El prototipo no graba, conecta sistemas institucionales ni envía comunicaciones. Las notas y etiquetas distinguen los principios propuestos de controles operativos implementados.
