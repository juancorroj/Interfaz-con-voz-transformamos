// ==============================================================================
// RENDERIZADOR SVG (salida: cadena de texto)
// ==============================================================================
// Traduce primitivas a SVG y nada más: no decide posiciones ni colores. Es el
// renderizador que usa el mockup del pitch y el que serviría para exportar una
// lámina a diapositiva o a documento.
// ==============================================================================

import type { IRenderizador } from '../dominio/contratos.js';
import type {
  EscenaDiagrama,
  Primitiva,
  PrimitivaCirculo,
  PrimitivaGrupo,
  PrimitivaRect,
  PrimitivaRuta,
  PrimitivaTexto,
} from '../escena/primitivas.js';

const ANCLAJES = { inicio: 'start', medio: 'middle', fin: 'end' } as const;

const FAMILIA_TIPOGRAFICA =
  '-apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif';

export function escaparXml(valor: string): string {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class RenderizadorSvg implements IRenderizador<string> {
  renderizar(escena: EscenaDiagrama): string {
    const cuerpo = escena.primitivas.map((p) => this.primitiva(p)).join('');
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${escena.ancho} ${escena.alto}"` +
      ` width="100%" preserveAspectRatio="xMidYMin meet" role="img"` +
      ` aria-label="${escaparXml(escena.descripcionAccesible)}"` +
      ` style="display:block;width:100%;height:auto;font-family:${FAMILIA_TIPOGRAFICA}">` +
      cuerpo +
      '</svg>'
    );
  }

  private primitiva(primitiva: Primitiva): string {
    switch (primitiva.tipo) {
      case 'grupo':
        return this.grupo(primitiva);
      case 'rect':
        return this.rect(primitiva);
      case 'circulo':
        return this.circulo(primitiva);
      case 'ruta':
        return this.ruta(primitiva);
      case 'texto':
        return this.texto(primitiva);
    }
  }

  private grupo(p: PrimitivaGrupo): string {
    const datos = Object.entries(p.datos ?? {})
      .map(([clave, valor]) => atributo(clave, valor))
      .join('');
    return `<g${datos}>${p.hijos.map((hijo) => this.primitiva(hijo)).join('')}</g>`;
  }

  private rect(p: PrimitivaRect): string {
    return (
      `<rect x="${p.x}" y="${p.y}" width="${p.ancho}" height="${p.alto}" rx="${p.radio}"` +
      atributo('fill', p.relleno ?? 'none') +
      atributo('stroke', p.borde) +
      atributo('stroke-width', p.grosorBorde) +
      atributo('stroke-dasharray', p.guiones) +
      atributo('opacity', p.opacidad) +
      ' />'
    );
  }

  private circulo(p: PrimitivaCirculo): string {
    return (
      `<circle cx="${p.cx}" cy="${p.cy}" r="${p.radio}"` +
      atributo('fill', p.relleno ?? 'none') +
      atributo('stroke', p.borde) +
      atributo('stroke-width', p.grosorBorde) +
      atributo('opacity', p.opacidad) +
      ' />'
    );
  }

  private ruta(p: PrimitivaRuta): string {
    return (
      `<path d="${p.d}"` +
      atributo('fill', p.relleno ?? 'none') +
      atributo('stroke', p.color) +
      atributo('stroke-width', p.grosor) +
      atributo('stroke-dasharray', p.guiones) +
      atributo('opacity', p.opacidad) +
      ' stroke-linecap="round" stroke-linejoin="round" />'
    );
  }

  private texto(p: PrimitivaTexto): string {
    const tspans = p.lineas
      .map(
        (linea, indice) =>
          `<tspan x="${p.x}" dy="${indice === 0 ? 0 : p.alturaLinea}">${escaparXml(linea)}</tspan>`,
      )
      .join('');

    return (
      `<text x="${p.x}" y="${p.y}" font-size="${p.tamano}" font-weight="${p.peso}"` +
      ` fill="${p.color}" text-anchor="${ANCLAJES[p.anclaje]}"` +
      atributo('letter-spacing', p.espaciadoLetras) +
      atributo('opacity', p.opacidad) +
      (p.rotacion ? ` transform="rotate(${p.rotacion} ${p.x} ${p.y})"` : '') +
      `>${tspans}</text>`
    );
  }
}

function atributo(nombre: string, valor: string | number | undefined): string {
  if (valor === undefined || valor === null || valor === '') return '';
  return ` ${nombre}="${typeof valor === 'string' ? escaparXml(valor) : valor}"`;
}
