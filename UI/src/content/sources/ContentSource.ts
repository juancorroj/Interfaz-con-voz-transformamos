/** Contrato de lectura de contenido: las páginas dependen de esto, no del archivo que lo guarda. */
export interface ContentSource<T> {
  getAll(): readonly T[];
}

/** Contenido que se resuelve en tiempo de compilación, en orden de declaración. */
export class StaticContentSource<T extends { id: string | number }> implements ContentSource<T> {
  constructor(private readonly items: readonly T[]) {}

  getAll(): readonly T[] {
    return this.items;
  }

  getById(id: T['id']): T | undefined {
    return this.items.find(item => item.id === id);
  }
}
