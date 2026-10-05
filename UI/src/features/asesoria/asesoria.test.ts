import { describe, expect, it } from 'vitest';
import { process, purposeVerbs, processActs, processStages } from '../../content/ficha/asesoria';
import { splitPurpose } from './PurposePath';

describe('propósitos de la asesoría', () => {
  it('cada propósito empieza con su verbo', () => {
    process.purpose.forEach((item, i) => expect(splitPurpose(item, purposeVerbs[i]).verb, item).toBe(purposeVerbs[i]));
  });
  it('hay un verbo por propósito', () => {
    expect(purposeVerbs).toHaveLength(process.purpose.length);
  });
});

describe('las diez etapas en tres actos', () => {
  it('cada etapa pertenece a un solo acto y no queda ninguna fuera', () => {
    const inActs = processActs.flatMap(a => a.stages).sort((a, b) => a - b);
    expect(inActs).toEqual(processStages.map(s => s.n));
  });
});
