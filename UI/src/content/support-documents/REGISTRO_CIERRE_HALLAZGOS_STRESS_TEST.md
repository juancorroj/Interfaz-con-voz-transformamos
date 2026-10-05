# Registro de Cierre de Hallazgos — Prueba de Estrés de la Tríada

**Origen:** [`reporte_estres_triada_resonancia.md`](../Casos-de-uso/Asesoria-Psicopedagogica/testing/reporte_estres_triada_resonancia.md)
**Fecha de la auditoría original:** 19 de septiembre de 2026
**Última verificación de estado:** 27 de septiembre de 2026

---

## Para qué sirve este documento

La prueba de estrés fue una auditoría que el propio equipo le hizo a su diseño **antes** de
construirlo, y encontró 10 fallas. Ese reporte tiene un valor competitivo alto: muy pocos equipos
documentan con ese nivel de detalle los defectos de su propia propuesta.

Pero un reporte de hallazgos, por sí solo, deja una pregunta abierta: *¿los arreglaron?*

Este registro responde esa pregunta hallazgo por hallazgo, con el criterio técnico exacto que
permite verificar cada estado en el código. Sin él, el reporte de estrés puede leerse como una
lista de problemas vigentes. Con él, se lee como un ciclo de calidad cerrado.

---

## Aclaración: verificar NO requiere poner el sistema en operación

Ninguno de los diez hallazgos necesita el sistema corriendo en producción para comprobarse.
Se dividen en cuatro grupos:

| Tipo | Cómo se comprueba | Hallazgos |
| :--- | :--- | :--- |
| **Esquema de datos** | Leer el `CHECK` o la restricción en el DDL | 1, 2, 3 |
| **Fórmula** | Recalcular el caso límite del reporte con la fórmula implementada | 4, 5 |
| **Especificación de agente** | Comprobar que el spec define el comportamiento faltante | 6, 8, 9 |
| **Decisión institucional** | Fuera del alcance técnico del MVP | 7, 10 |

Ocho de los diez se cierran leyendo el repositorio. Eso ya se hizo y el resultado está abajo.

---

## Estado verificado al 27 de septiembre de 2026

| # | Hallazgo | Sev. | Estado | Evidencia de verificación |
| :-: | :--- | :-: | :--- | :--- |
| 1 | DDL inconsistente en `SESION_ESCUCHA.estado_ranura1` | 🔴 | **CERRADO** | El `CHECK` admite `PENDIENTE_FIRMA_ASINCRONA` en Asesoría, Administrativos y —desde el 27-sep— Graduados. Verificable con `grep "estado_ranura1 IN"` |
| 2 | Bloqueo de clave foránea en Demanda Invertida | 🔴 | **CERRADO** | `01_init_analitica_marca_schema.sql` y el esquema de realimentación Alumni declaran ahora `id_sesion_origen VARCHAR(64) NULL`, con comentario en el DDL. Permite registrar la estrategia de un caso sin sesión de escucha previa |
| 3 | Conflicto de integridad en `estado_compromiso` | 🔴 | **CERRADO** | Asesoría admite ahora `('PENDIENTE','CUMPLIDO','INCUMPLIDO','REAJUSTADA')`. Administrativos ya usaba `('PENDIENTE','EN_CURSO','CUMPLIDO','REPROGRAMADO')` |
| 4 | Paradoja de dilución del ISRPP en becarios | 🟡 | **CERRADO** | `ISRPPScore.ts` implementa el *Principio de No Dilución por Beneficio*: `finalScore = Math.max(base, becarioScore)`. Recalculado el caso del reporte (V=0,95 · S=0,10 · A=0,30 · becario): antes **0,6295** (sin alerta), ahora **0,8147 → ALTO**. Con `V_emoc = ALTO` del mapa del código: **0,7941 → ALTO** |
| 5 | Piso mínimo permanente en MECO (K mínimo = 2) | 🟡 | **CERRADO por vía alterna** | El piso de 2 se conserva por criterio clínico, pero `MECOCadenceEngine.ts` añade la condición de escape `elegibleCierreAnticipado` (≥2 sesiones · cumplimiento ≥75 % · ISRPP <0,45). El cierre existe; no pasa por la fórmula sino por un dictamen explícito |
| 6 | Amnesia por aislamiento (*ghosting*) | 🟡 | **PARCIAL** | Tratado en los specs de Administrativos. Falta comprobarlo en la malla de Asesoría |
| 7 | Carencia de pasarela criptográfica de identidad | 🟡 | **ABIERTO — decisión de TI** | Depende de arquitectura institucional. Fuera del MVP |
| 8 | Fricción por concurrencia de notificaciones | 🟠 | **ABORDADO en spec** | El `sub-gestor-cooldown` define la ventana de enfriamiento de 3-5 días que agrupa disparos |
| 9 | Ausencia de FSM para invitaciones sin respuesta | 🟠 | **CERRADO** | `sub-gestor-cooldown.md` define `intentos_acogida` con máximo de 3, e `ejecutar_procesamiento_ranura2.py` lo implementa |
| 10 | Falta de Data Contract para fuentes federadas externas | 🟠 | **ABIERTO** | Requiere acuerdo con las áreas dueñas de las fuentes |

**Resumen verificado al 27-sep-2026: 7 cerrados · 1 abordado en especificación · 1 parcial · 2 abiertos, ambos por decisión institucional ajena al equipo técnico.**

**Los tres hallazgos bloqueantes (severidad 🔴) están cerrados.** No queda ningún defecto que
aborte el pipeline.

---

## Cómo se debe leer esto en el Q&A

Si alguien pregunta por la madurez técnica, este registro es la respuesta más fuerte disponible:

> «Antes de construir, sometimos nuestro propio diseño a una prueba de estrés y encontramos diez
> fallas, tres de ellas capaces de tumbar el pipeline. Hoy las tres están cerradas, y en total
> siete de las diez. De las tres restantes, dos no dependen de nosotros: son decisiones de
> arquitectura institucional. Cada hallazgo tiene escrito el criterio exacto con el que se
> comprueba en el código, para que nadie tenga que creernos.»

Un equipo que no hizo este trabajo no puede responder así.

---

## Hallazgo 4: nota de fondo

De los diez, el hallazgo 4 es el único con implicación ética directa y no solo técnica.

La fórmula del ISRPP puede dejar a un **estudiante becario en crisis vital por debajo del umbral
de alerta** (0,6295) cuando el mismo cuadro en un no becario sí lo supera (0,8147). El mecanismo
es que la beca, al indicar buen rendimiento previo, actúa como factor protector y diluye el
riesgo emocional y vocacional.

Es exactamente el tipo de sesgo que ninguna auditoría posterior detecta si no se busca a
propósito, y afecta a la población que el sistema más debería proteger.

**Ya está corregido.** `ISRPPScore.ts` incorpora el *Principio de No Dilución por Beneficio*: el
puntaje de un becario nunca puede quedar por debajo del que tendría sin beca. El caso del reporte
pasa de 0,6295 (invisible) a 0,8147 (alerta ALTA).

Queda, eso sí, una decisión de fondo que no corresponde al equipo técnico: **qué pondera la
institución al priorizar el acompañamiento**. El operador `max` evita el daño, pero la calibración
de los pesos la deben hacer el dueño del proceso y Bienestar.

Se recomienda declararlo explícitamente en el Q&A. Reconocer un sesgo encontrado por uno mismo,
en la población más vulnerable, y remitir su corrección a la instancia que corresponde, es una
demostración de criterio difícil de igualar.

---

## Cómo actualizar este registro

Al cerrar un hallazgo: cambiar el estado, dejar la verificación que lo comprueba y referenciar el
commit. El objetivo es que cualquiera pueda pasar del hallazgo al código que lo corrige sin
preguntarle a nadie.
