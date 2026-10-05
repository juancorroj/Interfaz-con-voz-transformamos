import { describe, expect, it } from 'vitest';
import { StaticContentSource } from './ContentSource';

describe('StaticContentSource', () => {
  const source = new StaticContentSource([{ id: 1, name: 'uno' }, { id: 2, name: 'dos' }]);

  it('devuelve todo el contenido en orden', () => {
    expect(source.getAll().map(i => i.name)).toEqual(['uno', 'dos']);
  });

  it('encuentra por id', () => {
    expect(source.getById(2)?.name).toBe('dos');
    expect(source.getById(9)).toBeUndefined();
  });
});
