# Declaración de Alcance, Límites y Verificabilidad

**Iniciativa:** ResonancIA — Reto del Rector 2026, *Con Voz Transformamos*
**Universidad de La Sabana**
**Caso de validación:** Asesoría Psicopedagógica
**Naturaleza del entregable:** MVP funcional con evidencia auditable

---

## 1. Por qué existe este documento

Una propuesta que pide confianza institucional para escuchar conversaciones humanas no puede
sostenerse sobre adjetivos. Puede sostenerse sobre dos cosas: **lo que se puede verificar** y
**lo que se declara con precisión que aún no se ha probado**.

Este documento hace ambas. Señala qué construimos y cómo cualquier tercero puede comprobarlo por
su cuenta, y señala con igual detalle los límites del MVP, las métricas que corregimos al
auditarnos y las preguntas que seguimos sin poder responder.

No es un anexo defensivo. Es la parte de la propuesta que consideramos más difícil de improvisar.

---

## 2. Principios de integridad del proceso

Estos principios no los definió el equipo técnico. Los definió la dueña del proceso —la
profesional que hoy atiende a los estudiantes en Asesoría Psicopedagógica— y gobiernan cualquier
decisión de diseño que los contradiga.

1. **Es sagrada la cercanía y la personalización del acompañamiento.**
2. **Es sagrado que el abordaje, aunque se enfoque en lo académico, sea integral.**
3. **Es sagrado cuidar la dignidad trascendente de la persona,** en articulación con el PEI.
4. **Es clave la conexión con otros recursos y rutas institucionales,** y también externas.
5. **Es sagrado que el estudiante firme consentimiento informado** o exista un mecanismo
   equivalente que blinde la interacción.
6. **Es sagrada la formación del equipo de psicólogas** que implementará la herramienta.
7. **Es sagrado que el criterio profesional medie** frente a lo que provea la herramienta.

A ellos se suman tres principios estructurales del diseño:

- **Cero juzgar, cero vigilancia, cero punitividad.** La información no se usa para calificar,
  sancionar ni perfilar negativamente a nadie. Es una restricción de diseño, no una promesa de
  buena conducta.
- **El dueño del proceso decide.** Qué se escucha, cómo se mide y cómo se realimenta lo define
  quien conoce y responde por el proceso, no el equipo técnico. Esto evita imponer criterios
  sobre áreas que pueden tener directrices propias.
- **La IA extrae y estructura; la persona interpreta y decide.** La capa de comprensión analítica
  es deliberadamente humana. No hay agentes ahí, y es por diseño: dejar que un modelo construya
  los criterios de interpretación sobre personas introduce sesgos que ninguna auditoría posterior
  corrige bien.

**Validación con la dueña del proceso:** la propuesta de cómo la IA podría impactar el
acompañamiento fue presentada a la profesional responsable de Asesoría Psicopedagógica, quien la
revisó y manifestó su acuerdo. El modelo de escucha se construyó a partir de su operación real,
no de una intuición técnica externa.

---

## 3. Qué construimos y probamos

### 3.1 Alcance efectivo

Desarrollamos **la malla agéntica completa** de las tres metodologías de la Tríada (escucha,
priorización, realimentación) y la ejecutamos de punta a punta sobre **2 casos completos**, con un
modelo de frontera. Sobre esa base construimos los tableros analíticos y el ciclo de
realimentación, para comprobar que las tres capas funcionan **en conjunto** y no solo por
separado.

La decisión de profundizar en dos casos en lugar de distribuir el esfuerzo fue deliberada:
preferimos entender un proceso hasta el fondo —con su dueña, sus dilemas éticos y su operación
real— antes que mostrar cinco superficialmente.

### 3.2 Evidencia verificable por terceros

| Qué afirmamos | Dónde está | Cómo se comprueba |
| :--- | :--- | :--- |
| Los agentes se ejecutaron realmente | `soporte_forense/02_RESPUESTAS_CRUDAS_SUBAGENTES.json` | Transcripciones crudas con `conversation_id`, conteo de pasos y llamadas a herramientas por subagente |
| Los prompts son los que efectivamente se enviaron | `soporte_forense/01_PROMPTS_OFICIALES.json` | Extraídos de las conversaciones, no redactados después |
| Los audios no fueron adulterados | Dossier del Escuchador Acústico | 4 huellas SHA-256 recalculables sobre los binarios |
| Los parámetros de audio son reales | Dossier del Escuchador Acústico | `ffprobe` reproduce duración, bytes, bitrate y muestreo |
| El ancla de voz identifica al profesional | [`VERIFICACION_ACUSTICA_INDEPENDIENTE.md`](VERIFICACION_ACUSTICA_INDEPENDIENTE.md) | Verificado por una técnica independiente en 2/2 sesiones |
| Cada hallazgo estructurado tiene respaldo textual | `INTERMEDIO/auditoria_forense_*.json` | Cada afirmación lleva cita verbatim y marca temporal en milisegundos, contrastable contra el audio |
| Los datos persisten con integridad relacional | `STAGING/staging_escucha.db` | Esquema DDL, UPSERT idempotente, vistas contractuales |

### 3.3 Motor de inferencia

Todo el procesamiento agéntico se ejecutó con **Gemini 3.8 Flash**, un modelo de frontera, a
través de un entorno de orquestación multiagente. Las conversaciones de esa ejecución son la
fuente de los soportes forenses.

### 3.4 Escalabilidad: el argumento de los legos

Los cinco casos de uso propuestos (estudiantes, profesores, administrativos, graduados, aliados)
se construyeron **con el mismo framework de escucha, analítica y realimentación**, y cada uno
resultó distinto: distintos detonantes, distintas fichas, distintas formas de abordaje, distintos
canales de retroalimentación. Esa diferencia es el argumento: el marco es agnóstico, no
uniformador.

Hacia adelante, casos como asesoría a becarios, entrevistas de admisión o tutorías académicas
**reutilizarían agentes y subagentes ya diseñados**. No se construye desde cero cada vez: se
recombina. Eso es lo que acelera la expansión y lo que convierte al proyecto en piezas
intercambiables antes que en una aplicación monolítica.

---

## 4. Decisiones metodológicas declaradas

Tres decisiones de diseño podrían malinterpretarse si no se explican. Las declaramos aquí antes
de que nadie las descubra.

### 4.1 Las pistas de audio son sintetizadas, no grabaciones reales

Los audios de las dos sesiones son voz sintetizada, construida a partir de guiones diseñados con
variabilidad realista. No se grabó a ninguna persona.

**Motor y voces:** el agente generador (`simulador-audio-acustico`, conversación
`044d3a88-ac13-4803-abbe-acafc30f42c6`) instaló y utilizó **`edge-tts`** con voces neuronales
colombianas: `es-CO-GonzaloNeural` (masculina) y `es-CO-SalomeNeural` (femenina), más
`es-MX-DaliaNeural` y `es-MX-JorgeNeural` en apoyo.

**Por qué:** probar una malla que procesa información sensible no puede hacerse exponiendo
conversaciones reales de estudiantes antes de tener consentimiento informado, custodia definida y
respaldo jurídico. La intención quedó registrada en el propio prompt de la corrida: *«crear la
simulación de 2 sesiones de audio de asesoría psicopedagógica con calidad broadcast y diálogos
verosímiles, protegiendo datos sensibles sin grabar estudiantes reales»*. Usar audio sintético fue
la única forma éticamente aceptable de validar el sistema en esta fase.

**Consecuencia adicional sobre la diarización:** las dos voces sintéticas son una masculina y una
femenina, con frecuencias fundamentales separadas por 90 y 102 Hz respectivamente. Es el escenario
más favorable posible para la atribución de hablante. El caso difícil que el diseño reivindica
—dos interlocutores del mismo registro vocal— **no fue puesto a prueba**.

**Consecuencia que asumimos:** el desempeño del agente frente a audio auténtico —ruido de sala,
voces solapadas, micrófono lejano— no está demostrado. Es la primera brecha que cierra un piloto
real.

### 4.2 El lote de 42 sesiones: 2 procesadas por la malla, 40 replicadas

De las 42 sesiones en Staging:

- **2 fueron procesadas íntegramente por la malla agéntica** (`SES_8F3A21C1`, `SES_9D4B57C2`):
  audio → diarización → extracción en tres ejes → auditoría forense → conciliación → persistencia.
- **40 fueron replicadas programáticamente** a partir del patrón de salida validado en esas dos,
  mediante los scripts `generate_3ejes_fichas.py` y `generate_auditoria_conciliacion.py`.

**Por qué:** una vez comprobado que la malla funciona sobre el caso completo, generar 40 audios
adicionales solo para repetir un resultado ya demostrado habría consumido el tiempo del MVP sin
aportar información nueva. Lo que necesitábamos del lote era **volumen para construir y probar la
capa analítica y el ciclo de realimentación**, que es donde el dataset sí hace falta.

**Consecuencia que asumimos:** cualquier cifra agregada sobre las 42 sesiones —incluido el
FactScore promedio— describe el patrón replicado, no 42 auditorías independientes. Las métricas
de calidad de extracción valen sobre N=2.

### 4.3 En la capa de comprensión no hay agentes

No es un vacío del MVP: es una decisión ética. Los modelos analíticos que interpretan la
información y priorizan casos los construye el equipo humano de Analítica junto con el dueño del
proceso, dentro del marco ético de la Universidad. Dejar que una IA defina autónomamente los
criterios con que se clasifica a una persona es exactamente el riesgo que este diseño evita.

---

## 5. Lo que no pudimos probar

### 5.1 Declarado por el equipo

1. **Operación autónoma en un ecosistema aislado.** No probamos la malla corriendo de forma
   completamente automática en un entorno desplegado e independiente. Requiere infraestructura y
   recursos que exceden el alcance del MVP.
2. **Volumen y autenticidad conversacional.** No probamos con más casos de asesoría ni con
   conversaciones 100 % reales, que es lo que permitiría calibrar finamente agentes y subagentes.
3. **Validación de los otros cuatro casos de uso.** Las metodologías de profesores,
   administrativos, graduados y aliados están diseñadas con el mismo framework, pero **no han
   sido validadas con sus áreas responsables** ni aplicadas sobre datos.
4. **Realimentación y analítica en operación real.** El diseño de las analíticas en producción y
   la ejecución del ciclo de realimentación con usuarios reales quedan fuera del MVP.

### 5.2 Identificado al auditarnos

5. **Robustez ante hablantes del mismo registro vocal.** La diarización guiada por ancla funcionó
   sin ambigüedad en las dos sesiones, pero ambas tenían voces bien separadas. El caso difícil que
   el diseño reivindica —dos interlocutores del mismo género y rango— está diseñado, no probado.
6. **La rama de acondicionamiento acústico nunca se ejerció.** Al ser audio sintético sin ruido,
   el filtrado neuronal ante SNR bajo no llegó a activarse.
7. **No existe línea base medida del proceso actual.** Las cifras de redistribución del tiempo de
   la sesión son una proyección del rediseño, no una medición sobre sesiones reales cronometradas.
8. **Validación jurídica pendiente.** El diseño de consentimiento, custodia, anonimización y
   retención se construyó sobre la Ley 1090 de 2006 y la Ley 1581 de 2012, pero **no ha sido
   revisado por la Dirección Jurídica ni por Seguridad de TI.**
9. **Gobernanza y sostenibilidad posteriores no resueltas.** Quién opera, financia y mantiene el
   sistema después del reto es una decisión institucional que esta propuesta no presume.
10. **Hallazgos abiertos de la prueba de estrés.** Nuestra propia auditoría detectó 10 fallas en
    el diseño —3 de ellas bloqueantes a nivel de esquema de base de datos, y una paradoja por la
    cual la fórmula de priorización podía invisibilizar a un estudiante becario en crisis.
    Están documentados; su cierre debe verificarse antes de cualquier despliegue.

---

## 6. Correcciones aplicadas tras la auditoría independiente

Al recalcular las métricas desde los archivos originales, cuatro afirmaciones no se sostuvieron y
quedan corregidas. El detalle está en
[`VERIFICACION_ACUSTICA_INDEPENDIENTE.md`](VERIFICACION_ACUSTICA_INDEPENDIENTE.md).

| Afirmación previa | Estado |
| :--- | :--- |
| Pitch de 215.2 / 115.8 / 128.4 / 224.6 Hz | **Corregido** a 191.9 / 101.8 / 99.8 / 201.4 Hz |
| Similitud coseno ECAPA-TDNN 0.9421 / 0.9514 | **Reclasificada** como criterio de diseño, no medición |
| Tasa de error de diarización DER = 0.00 % | **Retirada** — no hay anotación de referencia contra la cual calcularla |
| SNR de 24.8 / 23.9 dB y estado `BYPASS_SNR_OPTIMO` | **Retirados** — el audio es sintético y carece de piso de ruido medible |

Publicamos estas correcciones porque el valor de un sistema que promete no alucinar depende
enteramente de que su documentación tampoco lo haga.

---

## 7. Cómo verificar esta propuesta sin creernos nada

```bash
# 1. Integridad de los audios
certutil -hashfile "Casos-de-uso/Asesoria-Psicopedagogica/Simulacion/Escucha/PISTA AUDIO/SES_8F3A21C1_PA.mp3" SHA256

# 2. Parámetros reales del audio
ffprobe -v quiet -print_format json -show_format -show_streams "Casos-de-uso/Asesoria-Psicopedagogica/Simulacion/Escucha/PISTA AUDIO/SES_8F3A21C1_PA.mp3"

# 3. Verificación acústica completa (pitch, atribución de hablante, piso de ruido)
python Dossier/verificacion_acustica_independiente.py

# 4. Trazabilidad de las corridas agénticas (prompts y respuestas crudas)
#    Casos-de-uso/Asesoria-Psicopedagogica/Simulacion/Realimentacion/soporte_forense/

# 5. Contraste de cualquier hallazgo contra su cita textual y marca temporal
#    INTERMEDIO/auditoria_forense_SES_8F3A21C1.json  ->  escuchar el audio en ese milisegundo
```

El punto 5 es el que importa: **cualquier afirmación que el sistema haya estructurado puede
rastrearse hasta el segundo exacto de la conversación en que se dijo.** Si no puede rastrearse, no
debería estar ahí.

---

## 8. Qué sigue

| Prioridad | Acción | Responsable propuesto |
| :--- | :--- | :--- |
| 1 | Piloto con audio real y consentimiento informado | Bienestar + Asesoría Psicopedagógica |
| 2 | Revisión de consentimiento, custodia y retención | Dirección Jurídica + Seguridad de TI |
| 3 | Cierre verificado de los 10 hallazgos de la prueba de estrés | Equipo técnico |
| 4 | Validación de los 4 casos restantes con sus áreas dueñas | Alumni, Desarrollo Humano, Desarrollo Profesoral, Proyección Social |
| 5 | Línea base medida del proceso actual | Analítica + dueño del proceso |
| 6 | Definición de gobernanza, operación y sostenibilidad | Decisión institucional |

---

*Este documento se mantiene junto a la evidencia que lo respalda. Si alguna afirmación aquí
contenida deja de ser exacta, la corrección se registra en esta misma página.*
