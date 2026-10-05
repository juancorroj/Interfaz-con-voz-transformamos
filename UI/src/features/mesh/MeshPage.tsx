import { MeshWorkspace } from '../../components/MeshWorkspace';

export function MeshPage({ onInspect }: { onInspect: (id: string) => void }) {
  return <><div className="page-heading"><span className="eyebrow">TOPOLOGÍA DEL CASO PSICOPEDAGÓGICO</span><h2>Una orquesta de capacidades.</h2><p>Explora cómo se distribuye el trabajo entre el orquestador y los especialistas. Los nodos corresponden a las especificaciones actualizadas del repositorio.</p></div><MeshWorkspace onInspect={onInspect} /></>;
}
