import { supportDocuments } from '../../content/ficha/soporte';
import { DocumentLibrary } from './DocumentLibrary';

/**
 * Documentos del Dossier que se leen completos en la web. Los dos dossiers extensos no están aquí
 * a propósito (ver `summaryReason` en el contenido): contienen prompts, salidas crudas y rutas locales.
 * Las rutas son relativas a `UI/src/features/support/`.
 */
const loaders = {
  declaracion: () => import('../../../../Dossier/DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md?raw').then(m => m.default),
  verificacion: () => import('../../../../Dossier/VERIFICACION_ACUSTICA_INDEPENDIENTE.md?raw').then(m => m.default),
  hallazgos: () => import('../../../../Dossier/REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md?raw').then(m => m.default),
  indice: () => import('../../../../Dossier/INDICE.md?raw').then(m => m.default),
};

const files = Object.fromEntries(supportDocuments.map(d => [d.id, d.file.split('/').pop() as string]));

/** Nombres de las personas que hicieron de profesional en las sesiones simuladas: no se muestran. */
export const documentLibrary = new DocumentLibrary(loaders, files, [
  { pattern: /Asesora Liliam Ch[ií]a/g, replacement: 'asesora simulada' },
  { pattern: /Asesor Andr[eé]s Forero/g, replacement: 'asesor simulado' },
]);
