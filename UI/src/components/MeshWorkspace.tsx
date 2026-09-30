import { useState } from 'react';
import { Network, MessagesSquare } from 'lucide-react';
import { AgentMesh } from './AgentMesh';
import { ConversationOffice } from './ConversationOffice';

export function MeshWorkspace({ onInspect }: { onInspect: (id: string) => void }) {
  const [view, setView] = useState('office');
  return <><div className="co-view-switch" role="group" aria-label="Vista de la malla"><button className={view==='office'?'selected':''} aria-pressed={view==='office'} onClick={()=>setView('office')}><MessagesSquare size={17}/>Detrás de la conversación</button><button className={view==='mesh'?'selected':''} aria-pressed={view==='mesh'} onClick={()=>setView('mesh')}><Network size={17}/>Malla de agentes</button></div>{view==='office'?<ConversationOffice onInspect={onInspect}/>:<AgentMesh onInspect={onInspect}/>}</>;
}
