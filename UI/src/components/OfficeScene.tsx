import { useEffect, useId, useState } from 'react';
import './office-scene.css';

type Desk = { name: string; role: string; color: string };
const positions = [[115,215],[450,285],[245,480],[450,520],[655,480],[790,215],[790,415],[655,650]];
const human = [260,660];
type Delivery = { from: number; to: number; label: string; delay: number; reply?: boolean };
const deliveries: Delivery[][] = [
  [{from:-1,to:0,label:'Conversación',delay:0}],
  [{from:0,to:1,label:'Contexto',delay:0},{from:1,to:2,label:'Estudio',delay:1.5},{from:1,to:3,label:'Beca',delay:2.2},{from:1,to:4,label:'Acuerdos',delay:2.9}],
  [{from:2,to:1,label:'Ficha académica',delay:1,reply:true},{from:3,to:1,label:'Contexto',delay:1.8,reply:true},{from:4,to:1,label:'Plan de trabajo',delay:2.6,reply:true}],
  [{from:1,to:5,label:'Verificar fuentes',delay:0},{from:5,to:1,label:'Evidencia revisada',delay:3,reply:true}],
  [{from:1,to:6,label:'Conectar voces',delay:0},{from:6,to:1,label:'Perspectivas',delay:3,reply:true}],
  [{from:1,to:7,label:'Preparar memoria',delay:0},{from:7,to:1,label:'Borrador listo',delay:3,reply:true}],
  [{from:7,to:8,label:'Memoria para revisar',delay:0,reply:true}],
];
const speeches = ['Recibo las voces','Equipo, repartamos tareas','Espero sus entregas','Revisemos la evidencia','Conservemos ambas voces','Preparemos el borrador','Ahora decide la persona'];
function point(index:number){return index===-1?[115,85]:index===8?human:positions[index];}
function curve(a:number[],b:number[],t:number){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t-Math.sin(Math.PI*t)*55];}

function Person({ color, x, y, tick, active, boss=false }: { color:string;x:number;y:number;tick:number;active:boolean;boss?:boolean }) {
  const bob=active?Math.sin(tick*8)*2:0;
  return <g transform={`translate(${x} ${y+bob})`} aria-hidden="true"><ellipse cy="30" rx="20" ry="6" fill="#07151e77"/><path d="M-12 13h9v17h-9m15-17h9v17H3" fill="#233345"/><rect x="-18" y="-8" width="36" height="27" rx="4" fill={color}/><path d="M-23-4v18m46-18v18" stroke={color} strokeWidth="8" strokeLinecap="round"/><rect x="-15" y="-37" width="30" height="31" rx="6" fill="#e2d5bb"/><path d="M-15-23v-14h30v14l-9-8-21 2" fill={boss?'#535074':'#334b53'}/><path d="M-8-21v4m16-4v4" stroke="#21313b" strokeWidth="3"/><path d="M-5-10h10" stroke="#7a6c6a" strokeWidth="2"/>{boss&&<><path d="M-5-7 0 9 5-7" fill="#e6decb"/><path d="m0-6 3 5-3 12-3-12z" fill="#55438a"/><rect x="-20" y="-47" width="40" height="7" rx="2" fill="#c0a7ec"/></>}</g>;
}

export function OfficeScene({ desks, active, completed, selected, step, playing, time, onSelect }: {desks:Desk[];active:number[];completed:number[];selected:number;step:number;playing:boolean;time:number;onSelect:(i:number)=>void}) {
  const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const gridId=useId().replace(/:/g,'');
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
  const routes=deliveries[step];
  const clock=reduced?2:time;
  return <div className="office-world"><div className="office-world-toolbar"><span><i className={playing?'live':''}/>{playing?'EL EQUIPO ESTÁ TRABAJANDO':'EXPLORA LA OFICINA'}</span><span>Selecciona un personaje</span></div><div className="office-world-scroll"><svg viewBox="0 0 900 780" className="office-world-svg" role="group" aria-label="Oficina animada del equipo de agentes">
    <defs><pattern id={gridId} width="45" height="45" patternUnits="userSpaceOnUse"><rect width="45" height="45" fill="#1b303a"/><path d="M45 0H0V45" fill="none" stroke="#2c424a" strokeWidth="1"/></pattern></defs>
    <rect x="8" y="8" width="884" height="752" rx="16" fill="#0e202c" stroke="#587077" strokeWidth="3"/>
    <rect x="22" y="74" width="856" height="670" fill={`url(#${gridId})`}/><path d="M22 74h856" stroke="#7e9692" strokeWidth="9"/>
    <text x="450" y="43" textAnchor="middle" fill="#c5e1d9" fontSize="15" letterSpacing="4">RESONANCIA · OFICINA DE ESCUCHA</text>
    {[70,715].map(x=><g key={x}><rect x={x} y="98" width="115" height="49" rx="3" fill="#648b98" stroke="#9ab1ad" strokeWidth="5"/><path d={`M${x+57} 100v45M${x+2} 121h111`} stroke="#a8c7bd" strokeWidth="3"/><path d={`M${x+5} 139l25-19 20 15 28-23 30 27`} stroke="#b5d4bf" fill="none" opacity=".4"/></g>)}
    <rect x="323" y="165" width="254" height="211" rx="24" fill="#433c613f" stroke="#796d99" strokeDasharray="5 6"/><text x="450" y="188" textAnchor="middle" fill="#bda8ef" fontSize="11" letterSpacing="2">MESA DE COORDINACIÓN</text>
    <path d="M167 360h565M160 573h582M550 578v120" stroke="#476258" strokeWidth="28" opacity=".22" fill="none"/>
    {[ [57,365],[843,582],[420,701] ].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}><path d="M-12 0h24l-4 23H-8z" fill="#8c725a"/><path d="M0 5v-35M0-10q-30-32-21-37Q7-36 0-10M0-20q25-32 26-14Q24-9 0-5" stroke="#72a88b" fill="#4b876c" strokeWidth="4"/></g>)}
    {routes.map((r,i)=>{const a=point(r.from),b=point(r.to);return <path key={i} d={`M${a[0]} ${a[1]-10} Q${(a[0]+b[0])/2} ${(a[1]+b[1])/2-100} ${b[0]} ${b[1]-10}`} fill="none" stroke={r.reply?'#92d1aa':'#bda8ef'} strokeWidth="2" strokeDasharray="5 9" opacity=".4"/>;})}
    {desks.map((d,i)=>{const [x,y]=positions[i],isActive=active.includes(i)||i===1&&step>0&&step<6;const done=completed.includes(i);const walk=isActive&&playing&&!reduced?Math.sin(clock*1.8)*8:0;return <g key={d.name} role="button" tabIndex={0} aria-pressed={selected===i} aria-label={`${d.name}: ${isActive?'Trabajando':done?'Entregado':'En espera'}`} className={`office-person ${selected===i?'chosen':''}`} onClick={()=>onSelect(i)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(i);}}}>
      <rect className="office-hit" x={x-74} y={y-66} width="148" height="155" rx="10" fill="transparent" stroke={selected===i?d.color:'transparent'} strokeWidth="2"/>
      <ellipse cx={x} cy={y+32} rx={i===1?78:62} ry="24" fill={isActive?`${d.color}25`:'#0b202677'}/>
      <Person x={x+walk} y={y-12} color={d.color} boss={i===1} tick={clock} active={isActive&&playing&&!reduced}/>
      <rect x={x-(i===1?69:55)} y={y+13} width={i===1?138:110} height="35" rx="4" fill={i===1?'#8b789e':'#7b8372'} stroke={i===1?'#bb9dd5':'#a5ad95'} strokeWidth="3"/>
      <path d={`M${x-47} ${y+49}v13m94-13v13`} stroke="#526b69" strokeWidth="6"/>
      <rect x={x-39} y={y-3} width="38" height="27" rx="2" fill="#122c37" stroke="#a3bcb0" strokeWidth="3"/>
      {[0,1,2].map(line=><path key={line} d={`M${x-34} ${y+4+line*6}h${isActive?18+Math.sin(clock*5+line)*6:12}`} stroke={d.color} strokeWidth="2" opacity={isActive?1:.35}/>)}
      <rect x={x+20} y={y+22} width="20" height="13" fill="#d5d2b6" transform={`rotate(-8 ${x+30} ${y+27})`}/><rect x={x+48} y={y+15} width="11" height="14" fill="#d9ceb3" rx="2"/>
      <text x={x} y={y+79} textAnchor="middle" fill={d.color} fontSize="14" fontWeight="600">{d.name}</text>
      <circle cx={x+57} cy={y-35} r="7" fill={isActive?d.color:done?'#84c7a4':'#52676d'}/>{done&&!isActive&&<path d={`m${x+53} ${y-35} 3 3 5-6`} fill="none" stroke="#173d33" strokeWidth="2"/>}
    </g>;})}
    <g transform="translate(260 660)"><rect x="-104" y="-65" width="208" height="147" rx="10" fill={step===6?'#294b3b':'#22383b'} stroke={step===6?'#a8d7b4':'#527268'} strokeWidth="2"/><Person x={0} y={-10} color="#add1ac" tick={clock} active={step===6&&playing&&!reduced}/><rect x="-68" y="17" width="136" height="25" fill="#809783" stroke="#a5bba1" strokeWidth="3"/><text y="64" textAnchor="middle" fill="#c3dfc4" fontSize="13">Revisión humana</text></g>
    <g transform="translate(450 119)"><rect x="-140" y="-25" width="280" height="40" rx="8" fill="#e3dbec"/><path d="m-8 15 8 10 8-10" fill="#e3dbec"/><text textAnchor="middle" fill="#403751" fontSize="13">{speeches[step]}</text></g>
    {routes.map((r,i)=>{const duration=2.1,local=clock-r.delay;const t=reduced?.5:Math.max(0,Math.min(1,local/duration));const a=point(r.from),b=point(r.to),[x,y]=curve(a,b,t);const arrived=t===1;const show=reduced||local>=0;return show&&<g key={i} className="office-packet" transform={`translate(${x} ${y-55})`} aria-hidden="true" opacity={arrived?.75:1}>
      {arrived&&<circle r={13+Math.min(Math.max(local-duration,0),.5)*18} fill="none" stroke="#bcf0c8" strokeWidth="2" opacity={Math.max(0,1-(local-duration)*2)}/>}
      <rect x="-14" y="-10" width="28" height="20" rx="2" fill={r.reply?'#a8deb9':'#d1b7f1'} stroke="#20313f" strokeWidth="2"/><path d="m-13-8 13 10 13-10" fill="none" stroke="#3f4961" strokeWidth="2"/>
      {!arrived&&<><rect x="-67" y="-34" width="134" height="19" rx="4" fill="#0a1b25e8"/><text y="-21" textAnchor="middle" fill="#dce8e2" fontSize="10">{r.label}</text></>}
    </g>;})}
    <g transform="translate(550 720)"><rect width="275" height="24" rx="5" fill="#10232d"/><circle cx="15" cy="12" r="4" fill="#d1b7f1"/><text x="26" y="16" fill="#a9b9c7" fontSize="10">Tarea</text><circle cx="92" cy="12" r="4" fill="#a8deb9"/><text x="103" y="16" fill="#a9b9c7" fontSize="10">Entrega</text><text x="166" y="16" fill="#a9b9c7" fontSize="10">Paso {step+1} / 7</text></g>
  </svg></div><p className="office-world-hint">El orquestador coordina los paquetes. Los especialistas preparan la información. El profesional revisa y decide.</p></div>;
}
