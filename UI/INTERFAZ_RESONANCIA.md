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

En la navegación, elegir **Pitch**, o **Abrir el pitch** desde Panorama. Son ocho escenas alineadas con el guion de video actualizado en `Pitch/Pitch_Maestro_ResonancIA_5Minutos.md`. Las pautas suman cinco minutos; la duración de la locución requiere ensayo humano. Se puede avanzar con las flechas del teclado, seleccionar escenas, consultar notas o reproducir la pauta automática.

**Modo grabación** oculta la navegación y los controles de presentación; no graba video. Escape devuelve los controles. Para un avance automático durante la captura, iniciar antes **Reproducir pauta**. También hay una opción de pantalla completa. La barra lateral se puede contraer sin perder el logo ni los accesos.

## Vistas y fuentes

- Panorama: composición original con galaxia, propósito y tres etapas.
- Pitch: ocho escenas para video, notas de locución y pauta de cinco minutos.
- Malla de agentes: diagramas interactivos de Escucha y Realimentación, selección de nodos, animación explicativa y acceso al documento de cada agente. La topología es simplificada, sin ejecución real.
- Catálogo de agentes: instantánea de 16 especificaciones del caso psicopedagógico y 5 roles de apoyo metodológico; no son cantidades universales ni ejecuciones en vivo. `src/data/agents.json` conserva textos de origen como documentación histórica, no garantías del producto. Actualizar con `npm run sync:agents` cuando cambien las especificaciones.
- Recorrido: guion de cinco capítulos con autorización demostrativa, diagrama de responsabilidades y ejemplos de beneficios.
- Memoria: Alex y Sam son personas completamente ficticias, definidas en `src/data/demoCases.ts`. Se distinguen expresión, observación y señal pendiente de valoración.
- Personas y públicos: cinco casos con seis pasos. Profesores adapta el caso documentado en `Agents-metodologia-priorización/testing/simulacion_docentes_formacion.md`, sin reutilizar sus cifras o garantías. Los demás escenarios adicionales son exploratorios.
- Panel del profesional: selección de vistas de demostración, búsqueda, acuerdos, borradores revisables, cierre simulado y restablecimiento. Los acuerdos comparten estado con Memoria. Los registros históricos y los componentes anteriores se conservan en el repositorio, pero no se importan desde el recorrido público.

## Estado y límites

`src/services/useDemoCases.ts` persiste únicamente el ejemplo ficticio en la clave `RESONANCIA_PRESENTACION_FICTICIA_V2` de localStorage. No reutiliza las historias del panel anterior. Al cambiar un acuerdo a pendiente se reabre el seguimiento simulado. Los textos históricos de los encuentros permanecen como antecedentes; los estados actuales se muestran en los acuerdos.

La aplicación no graba audio, ejecuta agentes, autentica usuarios, manda comunicaciones ni emite certificados. La selección de rol cambia una vista; no es control real de acceso. No cargar datos reales. El estado de autorización se usa solo para habilitar un ejemplo estático y se reinicia al salir del recorrido.

Pendientes: procedimiento de autorización; captura, almacenamiento y conservación; política de acceso y cambio de responsable; controles de servidor; canales e integraciones; validación de escenarios y criterios analíticos con cada área; ensayo cronometrado.

Ver `CAMBIOS_REUNION_22_SEPT.md` para el registro de tareas y verificaciones.
