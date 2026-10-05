# Dossier de Evidencia — Índice de Consulta

**ResonancIA** · Reto del Rector 2026 · Universidad de La Sabana

Este índice está pensado para consulta rápida durante las preguntas. Cada fila responde a una
pregunta previsible.

---

## Si preguntan…

| Pregunta | Documento | Sección |
| :--- | :--- | :--- |
| **«¿Esto realmente funciona o es una maqueta?»** | [`soporte_forense/02_RESPUESTAS_CRUDAS_CONVERSACIONES.json`](soporte_forense/02_RESPUESTAS_CRUDAS_CONVERSACIONES.json) | 24 conversaciones con id, pasos y llamadas a herramientas |
| **«¿Cómo sé que la IA no inventó nada?»** | [`DOSSIER_CERTIFICACION_FORENSE_Y_EVIDENCIAS.md`](DOSSIER_CERTIFICACION_FORENSE_Y_EVIDENCIAS.md) | §1 y §5 — cada hallazgo con cita verbatim y milisegundo |
| **«¿Los audios son auténticos?»** | [`VERIFICACION_ACUSTICA_INDEPENDIENTE.md`](VERIFICACION_ACUSTICA_INDEPENDIENTE.md) | §2 — 12/12 afirmaciones de custodia reproducidas |
| **«¿Cómo distinguen quién habla?»** | [`VERIFICACION_ACUSTICA_INDEPENDIENTE.md`](VERIFICACION_ACUSTICA_INDEPENDIENTE.md) | §3 — verificado por vía independiente en 2/2 |
| **«¿Grabaron estudiantes reales?»** | [`DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md`](DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md) | §4.1 — no. Audio sintético, y por qué |
| **«¿Son 42 sesiones reales?»** | [`DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md`](DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md) | §4.2 — 2 punta a punta, 40 replicadas. Por qué |
| **«¿Qué NO probaron?»** | [`DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md`](DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md) | §5 — diez límites declarados |
| **«¿Encontraron fallas en su propio diseño?»** | [`REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md`](REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md) | 10 hallazgos · 7 cerrados · 3/3 bloqueantes resueltos |
| **«¿Esto no discrimina a algún grupo?»** | [`REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md`](REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md) | Hallazgo 4 — sesgo contra becarios, detectado y corregido |
| **«¿Cuánto cuesta?»** | [`../Implementacion/ESTUDIO_COSTOS_2026.md`](../Implementacion/ESTUDIO_COSTOS_2026.md) | 12 arquitecturas · proyección a 50.000 sesiones/año |
| **«¿Es escalable a otros públicos?»** | [`../Casos-de-uso/MATRIZ_REUTILIZACION_AGENTES.md`](../Casos-de-uso/MATRIZ_REUTILIZACION_AGENTES.md) | 87 especificaciones · 42-61 % reutilizable por malla nueva |
| **«¿Y el consentimiento del estudiante?»** | [`../Casos-de-uso/Asesoria-Psicopedagogica/GUION_CONSENTIMIENTO_INFORMADO.md`](../Casos-de-uso/Asesoria-Psicopedagogica/GUION_CONSENTIMIENTO_INFORMADO.md) | Borrador completo + 6 decisiones abiertas |
| **«¿El área dueña del proceso está de acuerdo?»** | [`DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md`](DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md) | §2 — los 7 principios que definió la dueña del proceso |

---

## Verificación en cuatro comandos

Cualquiera puede comprobar las afirmaciones centrales sin creernos nada:

```bash
# 1. Los audios no fueron alterados
certutil -hashfile "Casos-de-uso/Asesoria-Psicopedagogica/Simulacion/Escucha/PISTA AUDIO/SES_8F3A21C1_PA.mp3" SHA256

# 2. Parámetros reales del audio
ffprobe -v quiet -print_format json -show_format "Casos-de-uso/Asesoria-Psicopedagogica/Simulacion/Escucha/PISTA AUDIO/SES_8F3A21C1_PA.mp3"

# 3. Verificación acústica completa (custodia, pitch, atribución de hablante)
python Dossier/verificacion_acustica_independiente.py

# 4. Modelo de costos
python Implementacion/modelo_costos_2026.py
```

Y la comprobación que más importa: tomar cualquier hallazgo de
`INTERMEDIO/auditoria_forense_SES_8F3A21C1.json`, leer su `cita_textual_verbatim` y su
`timestamp_inicio_ms`, y escuchar el audio en ese milisegundo exacto.

---

## Contenido de la carpeta

| Archivo | Qué es |
| :--- | :--- |
| `INDICE.md` | Este documento |
| `DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md` | **Empezar por aquí.** Qué se probó, qué no, y cómo verificarlo |
| `DOSSIER_CERTIFICACION_FORENSE_Y_EVIDENCIAS.md` | Certificación de la malla de escucha y del Staging |
| `dossier_soporte_procesamiento_y_certificacion_forense.md` | Certificación del agente escuchador acústico |
| `REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md` | Los 10 hallazgos de la autoauditoría y su estado |
| `VERIFICACION_ACUSTICA_INDEPENDIENTE.md` | Recálculo independiente de las métricas acústicas |
| `verificacion_acustica_independiente.py` | Script reproducible (numpy + ffmpeg) |
| `verificacion_acustica_resultados.json` | Salida cruda del script |
| `soporte_forense/` | Prompts, respuestas crudas, logs y capturas de las corridas agénticas |

---

## Una nota sobre este dossier

Varias cifras que aparecían en versiones anteriores fueron **retiradas o corregidas** al someterlas
a verificación independiente: valores de pitch, similitud de coseno, tasa de error de diarización,
SNR y duración total del audio. Las correcciones están registradas en
[`VERIFICACION_ACUSTICA_INDEPENDIENTE.md`](VERIFICACION_ACUSTICA_INDEPENDIENTE.md) §4 y en
[`DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md`](DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md) §6.

Se dejan a la vista a propósito. El valor de un sistema que promete no alucinar depende
enteramente de que su documentación tampoco lo haga.
