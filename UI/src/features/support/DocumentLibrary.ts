/** Reemplazo que se aplica al texto de un documento antes de mostrarlo. */
export interface Redaction {
  pattern: RegExp;
  replacement: string;
}

/**
 * Acceso a los documentos del Dossier que se pueden leer completos. Los textos se cargan bajo demanda
 * (no pesan en la carga inicial) y se les aplican las omisiones acordadas antes de mostrarlos.
 */
export class DocumentLibrary {
  private readonly cache = new Map<string, Promise<string>>();

  constructor(
    private readonly loaders: Readonly<Record<string, () => Promise<string>>>,
    private readonly files: Readonly<Record<string, string>>,
    private readonly redactions: readonly Redaction[] = [],
  ) {}

  has(id: string): boolean {
    return id in this.loaders;
  }

  /** Id del documento al que apunta un enlace relativo como `../Dossier/INDICE.md#seccion`, si se puede leer aquí. */
  idForHref(href: string): string | undefined {
    const name = href.split('#')[0].split('/').pop()?.toLowerCase();
    return Object.entries(this.files).find(([id, file]) => this.has(id) && file.toLowerCase() === name)?.[0];
  }

  load(id: string): Promise<string> {
    const loader = this.loaders[id];
    if (!loader) return Promise.reject(new Error(`Documento no publicado: ${id}`));
    let pending = this.cache.get(id);
    if (!pending) {
      pending = loader().then(text => this.redact(text));
      this.cache.set(id, pending);
      pending.catch(() => this.cache.delete(id));
    }
    return pending;
  }

  redact(text: string): string {
    return this.redactions.reduce((acc, r) => acc.replace(r.pattern, r.replacement), text);
  }
}
