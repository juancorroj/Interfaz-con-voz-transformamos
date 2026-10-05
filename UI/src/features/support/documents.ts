import { supportDocuments } from '../../content/ficha/soporte';
import { DocumentLibrary } from './DocumentLibrary';

/**
 * Documentos del Dossier que se leen completos en la web. Los dos dossiers extensos no están aquí
 * a propósito (ver `summaryReason` en el contenido): contienen prompts, salidas crudas y rutas locales.
 * Copias públicas autocontenidas; las omisiones se aplican también en los archivos fuente.
 */
const loaders = {
  declaracion: () => import('../../content/support-documents/DECLARACION_DE_ALCANCE_LIMITES_Y_VERIFICABILIDAD.md?raw').then(m => m.default),
  verificacion: () => import('../../content/support-documents/VERIFICACION_ACUSTICA_INDEPENDIENTE.md?raw').then(m => m.default),
  hallazgos: () => import('../../content/support-documents/REGISTRO_CIERRE_HALLAZGOS_STRESS_TEST.md?raw').then(m => m.default),
  indice: () => import('../../content/support-documents/INDICE.md?raw').then(m => m.default),
};

const files = Object.fromEntries(supportDocuments.map(d => [d.id, d.file.split('/').pop() as string]));

/** Nombres de las personas que hicieron de profesional en las sesiones simuladas: no se muestran. */
export const documentLibrary = new DocumentLibrary(loaders, files, [
  { pattern: /Asesora Liliam Ch[ií]a/g, replacement: 'asesora simulada' },
  { pattern: /Asesor Andr[eé]s Forero/g, replacement: 'asesor simulado' },
]);
