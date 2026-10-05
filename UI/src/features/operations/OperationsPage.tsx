import OperationalApp from '../../OperationalApp';
import type { DemoCase } from '../../data/demoCases';
import { OperationsGuide } from './OperationsGuide';

interface OperationsPageProps {
  cases: DemoCase[];
  update: React.ComponentProps<typeof OperationalApp>['update'];
  reset: () => void;
}

export function OperationsPage({ cases, update, reset }: OperationsPageProps) {
  return <><div className="page-heading"><span className="eyebrow">ESPACIO DE ACOMPAÑAMIENTO</span><h2>El contexto al servicio de las personas.</h2><p>Personas simuladas para revisar acuerdos y propuestas de contacto. El profesional conserva la decisión; las otras vistas muestran ejemplos para responsables de programa o área.</p></div><OperationsGuide /><div className="operational-container"><OperationalApp cases={cases} update={update} reset={reset} /></div></>;
}
