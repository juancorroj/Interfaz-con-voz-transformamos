# Verificación Acústica Independiente de las Pistas de Audio

**Ecosistema:** ResonancIA — Universidad de La Sabana
**Alcance:** Las 4 pistas de audio de las 2 sesiones procesadas de punta a punta por la malla agéntica de escucha.
**Script reproducible:** [`verificacion_acustica_independiente.py`](verificacion_acustica_independiente.py)
**Resultados crudos:** [`verificacion_acustica_resultados.json`](verificacion_acustica_resultados.json)
**Dependencias:** `numpy` y `ffmpeg` en PATH. Nada más.

---

## 1. Por qué existe este documento

El *Dossier de Evidencia Técnica del Agente Escuchador Acústico* reporta un conjunto de métricas
acústicas. Algunas provienen de herramientas deterministas y son reproducibles por cualquiera;
otras fueron descritas por el agente durante su ejecución y no quedaron respaldadas por un
cálculo persistido.

Este documento separa unas de otras **calculándolas de nuevo desde los archivos originales**, sin
intervención humana y con un script que cualquier auditor puede ejecutar. Donde el resultado
confirma lo reportado, se deja constancia. Donde no, se corrige.

Reproducir todo el análisis:

```
python Dossier/verificacion_acustica_independiente.py
```

---

## 2. Cadena de custodia: verificada

Huellas SHA-256 recalculadas sobre los binarios originales y contrastadas contra las declaradas
en el dossier.

| Archivo | SHA-256 recalculado | ¿Coincide? |
| :--- | :--- | :---: |
| `SES_8F3A21C1_PA.mp3` | `8c5e5dde3047b4ad8fddec7faf1aa9273419c45a2962e987fc6119b83863eb57` | Sí |
| `SES_8F3A21C1_PB.mp3` | `6afffd9f64182537292b9dfcce9b5358e80fe071b4664b39ef4e3297c6442799` | Sí |
| `SES_9D4B57C2_PA.mp3` | `cc6b206c4e2d16cb271e9c0d2859617a43283bfa823586ee098a9fa7550b019f` | Sí |
| `SES_9D4B57C2_PB.mp3` | `a4d6c3e40e9f7f865ffa7f092951768b3cb9a9befadad336d3b56c2bc16167c6` | Sí |

Parámetros de contenedor recalculados con `ffprobe`:

| Archivo | Duración | Bytes | Bitrate contenedor | Muestreo | Canales | ¿Coincide? |
| :--- | ---: | ---: | ---: | ---: | :---: | :---: |
| `SES_8F3A21C1_PA.mp3` | 824.184 s | 4 945 340 | 48 002 bps | 24 000 Hz | 1 | Sí |
| `SES_8F3A21C1_PB.mp3` | 119.928 s | 719 568 | 48 000 bps | 24 000 Hz | 1 | Sí |
| `SES_9D4B57C2_PA.mp3` | 604.224 s | 3 625 580 | 48 003 bps | 24 000 Hz | 1 | Sí |
| `SES_9D4B57C2_PB.mp3` | 112.872 s | 677 232 | 48 000 bps | 24 000 Hz | 1 | Sí |

**Resultado: 12 de 12 afirmaciones de custodia reproducidas exactamente**, incluida la diferencia
entre bitrate de contenedor (48 002 / 48 003) y de stream (48 000), que es un detalle que solo
aparece cuando la medición es real.

---

## 3. Atribución de hablante por ancla: la afirmación operativa se sostiene

El diseño del agente sostiene que la Pista B —el monólogo en solitario del profesional— permite
desambiguar quién es quién en el diálogo de la Pista A. El dossier original sustenta esa
afirmación con una similitud coseno sobre embeddings ECAPA-TDNN, que **no es reproducible desde
este repositorio** (no existe la dependencia ni el vector persistido).

Para verificar la afirmación por una vía independiente, se sustituyó el timbre por la frecuencia
fundamental: se estimó F0 por autocorrelación normalizada, se separó el diálogo en dos grupos con
k-means unidimensional, y se contrastó la mediana de F0 del ancla contra ambos grupos.

### Sesión 1 — `SES_8F3A21C1` (Mateo / asesora simulada)

| Medición | Valor |
| :--- | ---: |
| Grupo F0 bajo (diálogo) | 101.8 Hz — 15 867 tramas |
| Grupo F0 alto (diálogo) | 191.9 Hz — 33 451 tramas |
| Separación entre grupos | 90.1 Hz |
| Mediana F0 del ancla (Pista B) | 172.0 Hz |
| Distancia del ancla al grupo alto | **19.8 Hz** |
| Distancia del ancla al grupo bajo | 70.3 Hz |

**Atribución: el ancla pertenece al grupo F0 alto, con margen de 50.4 Hz.**
El profesional es el hablante de F0 alto; el estudiante, el de F0 bajo. Sin ambigüedad.

### Sesión 2 — `SES_9D4B57C2` (Valentina / asesor simulado)

| Medición | Valor |
| :--- | ---: |
| Grupo F0 bajo (diálogo) | 99.8 Hz — 18 474 tramas |
| Grupo F0 alto (diálogo) | 201.4 Hz — 15 391 tramas |
| Separación entre grupos | 101.6 Hz |
| Mediana F0 del ancla (Pista B) | 92.5 Hz |
| Distancia del ancla al grupo bajo | **7.3 Hz** |
| Distancia del ancla al grupo alto | 108.9 Hz |

**Atribución: el ancla pertenece al grupo F0 bajo, con margen de 101.6 Hz.**
El profesional es el hablante de F0 bajo; la estudiante, la de F0 alto. Sin ambigüedad.

### Lectura

En las dos sesiones, la pista de ancla se parece a **uno** de los dos hablantes del diálogo y no
al otro, y la asignación de roles resultante es la correcta. Esa es la afirmación operativa que
sostiene la diarización guiada por ancla, y queda **reproducida por una vía independiente y con
una técnica distinta** a la del agente.

Dos aclaraciones necesarias sobre el alcance de esta verificación:

1. **F0 no es timbre.** Este método funciona aquí porque en ambas sesiones los interlocutores
   tienen registros vocales bien separados (90 y 102 Hz de diferencia). No sustituye a un
   embedding de locutor y **no demuestra la robustez frente a dos hablantes del mismo género**,
   que es precisamente el caso difícil que el dossier original reivindica.
2. Por lo tanto, la garantía de inmunidad ante hablantes de rango vocal similar **sigue sin estar
   probada**. Está diseñada, no demostrada.

---

## 4. Métricas que no se sostienen y quedan corregidas

### 4.1 Valores de pitch

| Métrica | Dossier original | Medición independiente |
| :--- | ---: | ---: |
| Sesión 1 — hablante profesional | 215.2 Hz | **191.9 Hz** |
| Sesión 1 — hablante estudiante | 115.8 Hz | **101.8 Hz** |
| Sesión 2 — hablante profesional | 128.4 Hz | **99.8 Hz** |
| Sesión 2 — hablante estudiante | 224.6 Hz | **201.4 Hz** |

El **orden y la magnitud relativa coinciden** en los cuatro casos; los valores absolutos no. Se
adoptan los medidos.

### 4.2 Similitud coseno ECAPA-TDNN

Los valores `0.9421 / 0.2215` y `0.9514 / 0.1832` **no son reproducibles**: no hay en el
repositorio dependencia de extracción de embeddings ni vector de 192 dimensiones persistido. Se
reclasifican como **criterio de diseño del agente**, no como medición. La afirmación que sí queda
sustentada es la del apartado 3.

### 4.3 Tasa de error de diarización (DER)

`DER = 0.00%` **se retira**. El DER se calcula contra una anotación de referencia humana
independiente, que no existe para estas sesiones. La formulación correcta es:

> Atribución de roles verificada sobre la totalidad de los turnos de las 2 sesiones, sin errores
> de asignación observados. No se calculó DER formal por no disponer de anotación de referencia
> independiente.

### 4.4 SNR — y un hallazgo sobre la naturaleza del audio

Los valores `24.8 dB` y `23.9 dB` no solo no son reproducibles: **son incompatibles con los
archivos**. El análisis del piso de ruido arroja:

| Pista de diálogo | Tramas con energía exactamente cero | Tramas bajo −80 dBFS | Percentil 10 de energía |
| :--- | ---: | ---: | ---: |
| `SES_8F3A21C1_PA.mp3` | 10.7 % | 17.2 % | silencio digital |
| `SES_9D4B57C2_PA.mp3` | 11.5 % | 17.8 % | silencio digital |

Una grabación de micrófono **nunca** contiene tramas de energía exactamente cero: siempre hay
ruido de sala, de preamplificador y de cuantización. Un 11 % de silencio digital absoluto indica
de forma concluyente que **las pistas son audio sintetizado (TTS), no grabaciones de sesiones
reales.**

Esto es coherente con el diseño del proyecto —las sesiones son casos simulados construidos
deliberadamente para probar la malla sin exponer información real de ninguna persona— y es una
decisión metodológicamente correcta. Pero tiene tres consecuencias que deben quedar escritas:

1. El SNR medido es efectivamente ilimitado. Cualquier cifra de SNR en este dossier debe
   retirarse, junto con el estado `BYPASS_SNR_OPTIMO`, que describe una decisión sobre un valor
   que no existe.
2. La rama de acondicionamiento acústico del pipeline (DeepFilterNet ante SNR < 12 dB)
   **nunca se ejerció**. Está diseñada y no probada.
3. El desempeño del agente frente a audio real —ruido de sala, solapamiento de voces, muletillas,
   micrófono lejano— **no está demostrado**. Es la primera brecha a cerrar en un piloto con
   audio auténtico y consentimiento informado.

---

## 5. Resumen para el auditor

| Afirmación | Estado |
| :--- | :--- |
| Integridad y no adulteración de los 4 audios (SHA-256) | **Verificada** — 4/4 |
| Parámetros de contenedor (duración, bytes, bitrate, muestreo) | **Verificada** — 8/8 |
| Bytes de los `NormalizedSessionDocument` persistidos | **Verificada** — 2/2 |
| El ancla identifica a uno de los dos hablantes y no al otro | **Verificada** por vía independiente en 2/2 sesiones |
| Asignación correcta de roles profesional / estudiante | **Verificada** en 2/2 sesiones |
| Valores absolutos de pitch | **Corregidos** |
| Similitud coseno ECAPA-TDNN | **Reclasificada** como criterio de diseño |
| DER = 0.00 % | **Retirada** |
| SNR = 24.8 / 23.9 dB y `BYPASS_SNR_OPTIMO` | **Retiradas** — el audio es sintético |
| Robustez ante hablantes del mismo registro vocal | **No probada** |
| Robustez ante audio real con ruido de sala | **No probada** |

---

*Documento generado a partir de la ejecución de `verificacion_acustica_independiente.py` sobre los
archivos originales del repositorio. Cualquier tercero puede reproducir la totalidad de estos
resultados con `numpy` y `ffmpeg`.*
