// ==============================================================================
// LAYOUT DE LÍNEA DE TIEMPO CON DOS CARRILES
// ==============================================================================
// La idea que sostiene todo el diagrama:
//
//   · El eje vertical es TIEMPO REAL. En la fase de la sesión, un bloque de 25
//     minutos mide más del doble que uno de 10. No hay que leer los números
//     para ver dónde se va el tiempo.
//   · Hay dos carriles. Izquierda: lo que hace una persona. Derecha: lo que
//     queda en el sistema. En el proceso actual el carril derecho está casi
//     vacío, y eso dice más que cualquier viñeta.
//
// SRP: aquí solo hay geometría. Ni colores (los pide al tema), ni SVG (emite
// primitivas), ni contenido (lo recibe en el modelo).
// ==============================================================================

import type {
  IConexion,
  IEstrategiaLayout,
  IFaseProceso,
  IMedidorTexto,
  IModeloProceso,
  INodoBifurcacion,
  INodoDiagrama,
  IProveedorTema,
  OpcionesLayout,
} from '../dominio/contratos.js';
import {
  bordeDerecho,
  bordeInferior,
  centroVertical,
  type Caja,
  type IdNodo,
  type Pista,
} from '../dominio/tipos.js';
import type { EscenaDiagrama, Primitiva } from '../escena/primitivas.js';
import { MedidorTextoAproximado } from './MedidorTextoAproximado.js';
import { Metricas } from './Metricas.js';

/** Bandejas de pintado: el orden de concatenación define la profundidad. */
interface Lienzo {
  readonly fondo: Primitiva[];
  readonly conexiones: Primitiva[];
  readonly tarjetas: Primitiva[];
}

interface ContenidoMedido {
  readonly lineasTitulo: string[];
  readonly lineasDetalle: string[];
  readonly lineasRamas: string[][];
  readonly altoRamas: number;
  readonly alto: number;
}

export class LayoutLineaDeTiempo implements IEstrategiaLayout {
  readonly nombre = 'linea-de-tiempo';
  private readonly m: Metricas;

  constructor(
    private readonly tema: IProveedorTema,
    opciones: OpcionesLayout = {},
    private readonly medidor: IMedidorTexto = new MedidorTextoAproximado(),
  ) {
    this.m = new Metricas(opciones);
  }

  calcular(modelo: IModeloProceso): EscenaDiagrama {
    const lienzo: Lienzo = { fondo: [], conexiones: [], tarjetas: [] };
    const cajas = new Map<IdNodo, Caja>();
    const centrosSpine: number[] = [];
    let numeroPaso = 0;

    let y = this.m.margenSuperior;
    y = this.trazarEncabezadoCarriles(y, lienzo);

    modelo.fases.forEach((fase, indice) => {
      if (indice > 0) y += this.m.gapFase;
      y = this.trazarEncabezadoFase(fase, y, lienzo);
      const resultado = this.trazarFase(fase, y, cajas, lienzo, numeroPaso);
      numeroPaso = resultado.numeroPaso;
      centrosSpine.push(...resultado.centrosSpine);
      y = resultado.y;
    });

    if (modelo.cierre) {
      y += this.m.gapFase;
      const caja = this.cajaDe(modelo.cierre, y, this.m.anchoDe('persona', true));
      this.trazarTarjeta(modelo.cierre, caja, lienzo, undefined);
      cajas.set(modelo.cierre.id, caja);
      y = bordeInferior(caja);
    }

    this.trazarEspina(centrosSpine, lienzo);
    for (const conexion of modelo.conexiones) {
      this.trazarRetorno(conexion, cajas, lienzo);
    }

    return {
      ancho: this.m.ancho,
      alto: y + this.m.margenInferior,
      descripcionAccesible: modelo.descripcionAccesible(),
      primitivas: [...lienzo.fondo, ...lienzo.conexiones, ...lienzo.tarjetas],
    };
  }

  // ------------------------------------------------------------- Encabezados

  private trazarEncabezadoCarriles(y: number, lienzo: Lienzo): number {
    const m = this.m;
    const e = this.tema.estiloEstructura();
    const lineaBase = y + m.tamCarril * 0.85;

    const etiqueta = (x: number, texto: string, clave: string): Primitiva => ({
      tipo: 'texto',
      clave,
      x,
      y: lineaBase,
      lineas: [texto],
      alturaLinea: m.tamCarril * 1.2,
      tamano: m.tamCarril,
      peso: 700,
      color: e.colorCarril,
      anclaje: 'inicio',
      espaciadoLetras: 1.1,
      opacidad: 0.85,
    });

    lienzo.fondo.push(etiqueta(m.personaX, 'LA PERSONA', 'carril-persona'));
    lienzo.fondo.push(etiqueta(m.sistemaX, 'EL SISTEMA', 'carril-sistema'));

    return y + m.altoEncabezadoCarriles;
  }

  private trazarEncabezadoFase(fase: IFaseProceso, y: number, lienzo: Lienzo): number {
    const m = this.m;
    const e = this.tema.estiloEstructura();
    const lineaBase = y + m.tamFase * 0.85;

    lienzo.fondo.push({
      tipo: 'texto',
      clave: `fase-${fase.id}`,
      x: m.ejeX - 6,
      y: lineaBase,
      lineas: [fase.nombre.toUpperCase()],
      alturaLinea: m.tamFase * 1.2,
      tamano: m.tamFase,
      peso: 700,
      color: e.colorFase,
      anclaje: 'inicio',
      espaciadoLetras: 0.9,
    });

    if (fase.meta) {
      lienzo.fondo.push({
        tipo: 'texto',
        clave: `fase-${fase.id}-meta`,
        x: m.sistemaX + m.anchoSistema,
        y: lineaBase,
        lineas: [fase.meta.toUpperCase()],
        alturaLinea: m.tamFase * 1.2,
        tamano: m.tamFase,
        peso: 600,
        color: e.colorMetaFase,
        anclaje: 'fin',
        espaciadoLetras: 0.6,
      });
    }

    return y + m.altoEncabezadoFase + m.gapEncabezado;
  }

  // -------------------------------------------------------------------- Fase

  private trazarFase(
    fase: IFaseProceso,
    yInicio: number,
    cajas: Map<IdNodo, Caja>,
    lienzo: Lienzo,
    numeroPasoInicial: number,
  ): { y: number; numeroPaso: number; centrosSpine: number[] } {
    const m = this.m;
    const centrosSpine: number[] = [];
    let numeroPaso = numeroPasoInicial;

    const principal = fase.carrilPrincipal;
    const secundario: Pista = principal === 'persona' ? 'sistema' : 'persona';

    /**
     * El carril principal se apila y marca el ritmo; el secundario se ancla a
     * él cuando lo pide y, si no, sigue su propio cursor.
     */
    const colocar = (carril: Pista, permitirAncla: boolean): number => {
      let cursor = yInicio;
      for (const nodo of fase.nodos.filter((n) => n.pista === carril)) {
        const anchoNodo = m.anchoDe(carril);
        const contenido = this.medirContenido(nodo, anchoNodo);
        const referencia =
          permitirAncla && nodo.alineadoCon ? cajas.get(nodo.alineadoCon) : undefined;
        const altoTemporal =
          fase.escalaTemporal && nodo.duracionMinutos
            ? nodo.duracionMinutos * m.pixelesPorMinuto
            : 0;

        const caja: Caja = referencia
          ? {
              x: m.xDe(carril),
              y: referencia.y,
              ancho: anchoNodo,
              alto: Math.max(referencia.alto, contenido.alto, altoTemporal),
            }
          : {
              x: m.xDe(carril),
              y: cursor,
              ancho: anchoNodo,
              alto: Math.max(contenido.alto, altoTemporal, m.altoMinimoTarjeta),
            };

        this.trazarTarjeta(nodo, caja, lienzo, contenido);
        cajas.set(nodo.id, caja);

        if (carril === 'persona') {
          numeroPaso += 1;
          this.trazarInsignia(numeroPaso, caja, nodo, lienzo);
          centrosSpine.push(centroVertical(caja));
        }
        if (referencia) this.trazarAmarre(referencia, caja, lienzo);

        cursor = Math.max(cursor, bordeInferior(caja) + m.gapNodo);
      }
      return Math.max(yInicio, cursor - m.gapNodo);
    };

    const yPrincipal = colocar(principal, false);
    const ySecundario = colocar(secundario, true);
    const yFin = Math.max(yPrincipal, ySecundario);
    this.trazarBandaFase(fase, yInicio, yFin, lienzo);

    return { y: yFin, numeroPaso, centrosSpine };
  }

  private trazarBandaFase(
    fase: IFaseProceso,
    yInicio: number,
    yFin: number,
    lienzo: Lienzo,
  ): void {
    const m = this.m;
    const e = this.tema.estiloEstructura();
    lienzo.fondo.unshift({
      tipo: 'rect',
      clave: `banda-${fase.id}`,
      x: m.ejeX - 12,
      y: yInicio - 8,
      ancho: m.sistemaX + m.anchoSistema - m.ejeX + 18,
      alto: yFin - yInicio + 16,
      radio: 14,
      relleno: fase.escalaTemporal ? e.bandaFase : 'none',
      borde: fase.escalaTemporal ? undefined : 'none',
    });
  }

  // --------------------------------------------------------------- Tarjetas

  private cajaDe(nodo: INodoDiagrama, y: number, ancho: number): Caja {
    const contenido = this.medirContenido(nodo, ancho);
    return {
      x: this.m.personaX,
      y,
      ancho,
      alto: Math.max(contenido.alto, this.m.altoMinimoTarjeta),
    };
  }

  private medirContenido(nodo: INodoDiagrama, anchoCaja: number): ContenidoMedido {
    const m = this.m;
    const escala = nodo.pista === 'sistema' ? 0.94 : 1;
    const anchoTexto = anchoCaja - m.padX * 2;

    const lineasTitulo = this.medidor.dividirEnLineas(
      nodo.titulo,
      // El chip de duración vive en la esquina superior derecha, sobre el título.
      nodo.duracionMinutos ? anchoTexto - 34 : anchoTexto,
      m.tamTitulo * escala,
      m.pesoTitulo,
    );
    const lineasDetalle = nodo.detalle
      ? this.medidor.dividirEnLineas(nodo.detalle, anchoTexto, m.tamDetalle * escala, 400)
      : [];

    const ramas = this.ramasDe(nodo);
    const anchoRama = (anchoTexto - m.gapRamas) / 2 - m.padX;
    const lineasRamas = ramas.map((rama) =>
      this.medidor.dividirEnLineas(rama.titulo, anchoRama, m.tamDetalle, 620),
    );
    const altoRamas =
      lineasRamas.length > 0
        ? m.gapTituloDetalle +
          8 +
          Math.max(...lineasRamas.map((l) => l.length)) * m.altoLineaDetalle +
          14
        : 0;

    const alto =
      m.padY * 2 +
      (nodo.meta ? m.altoMeta : 0) +
      lineasTitulo.length * m.altoLineaTitulo * escala +
      (lineasDetalle.length > 0
        ? m.gapTituloDetalle + lineasDetalle.length * m.altoLineaDetalle * escala
        : 0) +
      altoRamas;

    return { lineasTitulo, lineasDetalle, lineasRamas, altoRamas, alto };
  }

  private ramasDe(nodo: INodoDiagrama) {
    return nodo.variante === 'bifurcacion' ? (nodo as INodoBifurcacion).ramas : [];
  }

  private trazarTarjeta(
    nodo: INodoDiagrama,
    caja: Caja,
    lienzo: Lienzo,
    medido?: ContenidoMedido,
  ): void {
    const m = this.m;
    const estilo = this.tema.estiloNodo(nodo.variante, nodo.enfasis);
    const contenido = medido ?? this.medirContenido(nodo, caja.ancho);
    const escala = nodo.pista === 'sistema' ? 0.94 : 1;
    const hijos: Primitiva[] = [];

    hijos.push({
      tipo: 'rect',
      clave: `caja-${nodo.id}`,
      x: caja.x,
      y: caja.y,
      ancho: caja.ancho,
      alto: caja.alto,
      radio: m.radio,
      relleno: estilo.relleno,
      borde: estilo.borde,
      grosorBorde: estilo.grosorBorde,
      guiones: estilo.guiones,
    });

    // Filo de acento a la izquierda: da lectura de bloque, no de viñeta.
    hijos.push({
      tipo: 'rect',
      clave: `filo-${nodo.id}`,
      x: caja.x,
      y: caja.y + 9,
      ancho: 2.5,
      alto: Math.max(caja.alto - 18, 10),
      radio: 1.25,
      relleno: estilo.acento,
      opacidad: nodo.variante === 'etapa' ? 0.8 : 1,
    });

    // El contenido se centra verticalmente cuando el bloque es más alto que el
    // texto: un bloque de 25 minutos no debe dejar el título flotando arriba.
    const holgura = caja.alto - contenido.alto;
    let cursor = caja.y + m.padY + (holgura > 26 ? holgura / 2 - m.padY : 0);
    const xTexto = caja.x + m.padX;

    if (nodo.meta) {
      hijos.push({
        tipo: 'texto',
        clave: `meta-${nodo.id}`,
        x: xTexto,
        y: cursor + m.tamMeta * 0.86,
        lineas: [nodo.meta.toUpperCase()],
        alturaLinea: m.altoMeta,
        tamano: m.tamMeta,
        peso: 700,
        color: estilo.colorMeta,
        anclaje: 'inicio',
        espaciadoLetras: 0.8,
      });
      cursor += m.altoMeta;
    }

    if (nodo.duracionMinutos) {
      hijos.push(...this.chipDuracion(nodo, caja, cursor, estilo.acento));
    }

    hijos.push({
      tipo: 'texto',
      clave: `titulo-${nodo.id}`,
      x: xTexto,
      y: this.lineaBase(cursor, m.tamTitulo * escala, m.altoLineaTitulo * escala),
      lineas: contenido.lineasTitulo,
      alturaLinea: m.altoLineaTitulo * escala,
      tamano: m.tamTitulo * escala,
      peso: m.pesoTitulo,
      color: estilo.colorTitulo,
      anclaje: 'inicio',
    });
    cursor += contenido.lineasTitulo.length * m.altoLineaTitulo * escala;

    if (contenido.lineasDetalle.length > 0) {
      cursor += m.gapTituloDetalle;
      hijos.push({
        tipo: 'texto',
        clave: `detalle-${nodo.id}`,
        x: xTexto,
        y: this.lineaBase(cursor, m.tamDetalle * escala, m.altoLineaDetalle * escala),
        lineas: contenido.lineasDetalle,
        alturaLinea: m.altoLineaDetalle * escala,
        tamano: m.tamDetalle * escala,
        peso: 400,
        color: estilo.colorDetalle,
        anclaje: 'inicio',
      });
      cursor += contenido.lineasDetalle.length * m.altoLineaDetalle * escala;
    }

    if (contenido.lineasRamas.length > 0) {
      hijos.push(...this.trazarRamas(nodo, caja, cursor, contenido));
    }

    lienzo.tarjetas.push({
      tipo: 'grupo',
      clave: `nodo-${nodo.id}`,
      datos: {
        'data-nodo': nodo.id,
        'data-pista': nodo.pista,
        'data-variante': nodo.variante,
        'data-estado': 'pendiente',
        'data-y': Math.round(caja.y),
        'data-alto': Math.round(caja.alto),
        // Un nodo anclado no es un paso propio: durante la simulación hereda el
        // estado de la etapa a la que acompaña.
        ...(nodo.alineadoCon ? { 'data-alineado': nodo.alineadoCon } : {}),
      },
      hijos,
    });
  }

  /** Chip de minutos en la esquina superior derecha de la tarjeta. */
  private chipDuracion(
    nodo: INodoDiagrama,
    caja: Caja,
    cursor: number,
    acento: string,
  ): Primitiva[] {
    const m = this.m;
    const texto = `${nodo.duracionMinutos} min`;
    const ancho = this.medidor.anchoDe(texto, m.tamMeta, 700) + 14;
    const x = bordeDerecho(caja) - m.padX - ancho;
    const y = cursor - 2;

    return [
      {
        tipo: 'rect',
        clave: `chip-${nodo.id}`,
        x,
        y,
        ancho,
        alto: 15,
        radio: 7.5,
        relleno: 'rgba(255,255,255,0.05)',
        borde: acento,
        grosorBorde: 0.9,
        opacidad: 0.9,
      },
      {
        tipo: 'texto',
        clave: `chip-txt-${nodo.id}`,
        x: x + ancho / 2,
        y: y + 10.6,
        lineas: [texto],
        alturaLinea: m.tamMeta * 1.2,
        tamano: m.tamMeta,
        peso: 700,
        color: acento,
        anclaje: 'medio',
        espaciadoLetras: 0.3,
      },
    ];
  }

  /** Horquilla con los dos desenlaces posibles de una bifurcación. */
  private trazarRamas(
    nodo: INodoDiagrama,
    caja: Caja,
    cursor: number,
    contenido: ContenidoMedido,
  ): Primitiva[] {
    const m = this.m;
    const estilo = this.tema.estiloNodo(nodo.variante, nodo.enfasis);
    const anchoUtil = caja.ancho - m.padX * 2;
    const anchoRama = (anchoUtil - m.gapRamas) / 2;
    const yRamas = cursor + m.gapTituloDetalle + 8;
    const altoRama = contenido.altoRamas - m.gapTituloDetalle - 8;
    const primitivas: Primitiva[] = [];

    // La disyuntiva se lee mejor con una "o" entre los dos desenlaces que con
    // una horquilla: son alternativas, no una ramificación con orden.
    primitivas.push({
      tipo: 'texto',
      clave: `disyuntiva-${nodo.id}`,
      x: caja.x + caja.ancho / 2,
      y: yRamas + altoRama / 2 + m.tamDetalle * 0.36,
      lineas: ['o'],
      alturaLinea: m.altoLineaDetalle,
      tamano: m.tamDetalle,
      peso: 700,
      color: estilo.colorMeta,
      anclaje: 'medio',
    });

    contenido.lineasRamas.forEach((lineas, indice) => {
      const x = caja.x + m.padX + indice * (anchoRama + m.gapRamas);
      primitivas.push({
        tipo: 'rect',
        clave: `rama-${nodo.id}-${indice}`,
        x,
        y: yRamas,
        ancho: anchoRama,
        alto: altoRama,
        radio: 7,
        relleno: 'rgba(255,255,255,0.035)',
        borde: estilo.borde,
        grosorBorde: 0.9,
        guiones: '4 3',
      });
      primitivas.push({
        tipo: 'texto',
        clave: `rama-txt-${nodo.id}-${indice}`,
        x: x + anchoRama / 2,
        y: yRamas + altoRama / 2 - (lineas.length - 1) * (m.altoLineaDetalle / 2) + m.tamDetalle * 0.36,
        lineas,
        alturaLinea: m.altoLineaDetalle,
        tamano: m.tamDetalle,
        peso: 620,
        color: estilo.colorTitulo,
        anclaje: 'medio',
      });
    });

    return primitivas;
  }

  // ----------------------------------------------------------- Espina y ejes

  private trazarInsignia(
    numero: number,
    caja: Caja,
    nodo: INodoDiagrama,
    lienzo: Lienzo,
  ): void {
    const m = this.m;
    const estilo = this.tema.estiloNodo(nodo.variante, nodo.enfasis);
    const cy = centroVertical(caja);

    lienzo.fondo.push(
      {
        tipo: 'circulo',
        clave: `insignia-${nodo.id}`,
        cx: m.ejeX,
        cy,
        radio: 9,
        relleno: 'rgba(11,18,32,0.95)',
        borde: estilo.acento,
        grosorBorde: 1.4,
      },
      {
        tipo: 'texto',
        clave: `insignia-txt-${nodo.id}`,
        x: m.ejeX,
        y: cy + 3.2,
        lineas: [String(numero)],
        alturaLinea: 10,
        tamano: 9.2,
        peso: 700,
        color: estilo.acento,
        anclaje: 'medio',
      },
    );
  }

  /** Línea continua que une todas las insignias: la columna del tiempo. */
  private trazarEspina(centros: readonly number[], lienzo: Lienzo): void {
    if (centros.length < 2) return;
    const m = this.m;
    const e = this.tema.estiloEstructura();
    lienzo.fondo.unshift({
      tipo: 'ruta',
      clave: 'espina',
      d: `M ${m.ejeX} ${centros[0]} L ${m.ejeX} ${centros[centros.length - 1]}`,
      color: e.eje,
      grosor: 1.4,
    });
  }

  /** Amarre punteado entre una etapa humana y lo que el sistema hace a su lado. */
  private trazarAmarre(origen: Caja, destino: Caja, lienzo: Lienzo): void {
    const [izquierda, derecha] = origen.x <= destino.x ? [origen, destino] : [destino, origen];
    const y = Math.min(centroVertical(origen), origen.y + 26);
    lienzo.conexiones.push({
      tipo: 'ruta',
      clave: `amarre-${Math.round(destino.y)}-${Math.round(destino.x)}`,
      d: `M ${bordeDerecho(izquierda)} ${y} H ${derecha.x}`,
      color: this.tema.estiloEstructura().eje,
      grosor: 1,
      guiones: '3 3',
    });
  }

  private trazarRetorno(
    conexion: IConexion,
    cajas: ReadonlyMap<IdNodo, Caja>,
    lienzo: Lienzo,
  ): void {
    const origen = cajas.get(conexion.desde);
    const destino = cajas.get(conexion.hasta);
    if (!origen || !destino) return;

    const m = this.m;
    const estilo = this.tema.estiloConexion(conexion.tipo);
    const yOrigen = centroVertical(origen);
    const yDestino = destino.y + destino.alto * 0.7;
    const xEntrada = bordeDerecho(destino) + m.tamanoPunta;

    lienzo.conexiones.push({
      tipo: 'ruta',
      clave: `retorno-${conexion.desde}`,
      d:
        `M ${bordeDerecho(origen)} ${yOrigen} H ${m.carrilRetorno} ` +
        `V ${yDestino} H ${xEntrada}`,
      color: estilo.color,
      grosor: estilo.grosor,
      guiones: estilo.guiones,
    });

    const t = m.tamanoPunta;
    lienzo.conexiones.push({
      tipo: 'ruta',
      clave: `punta-retorno-${conexion.desde}`,
      d: `M ${xEntrada - t} ${yDestino} L ${xEntrada + t * 0.9} ${yDestino - t * 0.75} L ${xEntrada + t * 0.9} ${yDestino + t * 0.75} Z`,
      relleno: estilo.color,
      grosor: 0,
    });

    if (conexion.etiqueta) {
      lienzo.conexiones.push({
        tipo: 'texto',
        clave: `retorno-txt-${conexion.desde}`,
        x: m.carrilRetorno - 4,
        y: (yOrigen + yDestino) / 2,
        lineas: [conexion.etiqueta.toUpperCase()],
        alturaLinea: m.tamEtiqueta * 1.2,
        tamano: m.tamEtiqueta,
        peso: 700,
        color: estilo.color,
        anclaje: 'medio',
        espaciadoLetras: 0.7,
        rotacion: -90,
      });
    }
  }

  private lineaBase(topeCaja: number, tamano: number, alturaLinea: number): number {
    return topeCaja + tamano * 0.78 + (alturaLinea - tamano) * 0.5;
  }
}

/** Carriles disponibles; expuesto para pruebas y para otros layouts. */
export const CARRILES: readonly Pista[] = ['persona', 'sistema'];
