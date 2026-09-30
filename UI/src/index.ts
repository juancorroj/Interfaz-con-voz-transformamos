// ==============================================================================
// BARREL EXPORT: Módulos Reutilizables de Analítica y Priorización
// Permite importar directamente la librería en otros proyectos de Bienestar
// ==============================================================================

// 1. Interfaces y Contratos de Dominio
export * from './domain/interfaces';

// 2. Clases de Dominio OOP y Motores de Cálculo
export { StudentCase } from './domain/StudentCase';
export { ISRPPScore } from './domain/ISRPPScore';
export { MECOCadenceEngine } from './domain/MECOCadenceEngine';
export { CommitmentManager } from './domain/CommitmentManager';
export { SecurityContext } from './domain/SecurityContext';

// 3. Servicios y Persistencia
export { AnalyticsRepository } from './services/AnalyticsRepository';
export type { IAnalyticsRepository } from './services/AnalyticsRepository';

// 4. Componentes Visuales React
export { AdvisorDashboard } from './components/AdvisorDashboard';
export { ProgramDirectorDashboard } from './components/ProgramDirectorDashboard';
export { BienestarCentralDashboard } from './components/BienestarCentralDashboard';
export { RoleSelector } from './components/RoleSelector';
export { CommitmentsTable } from './components/CommitmentsTable';
export { CertificateModal } from './components/CertificateModal';
export { TeamsDraftModal } from './components/TeamsDraftModal';

// 5. Aplicación Contenedora
export { App } from './App';
