"use client"
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getwebhook } from './integration/slack/slack'
import { cronjob } from './jobrunners/cronjob';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, OnNodesChange,Node,Edge, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { TextInputNode } from './nodes/TextInputNode';

const initialEdges:Edge[] = [ { id: '1-2', source: '1', target: '2', label: '',type:'straight' } ];

const initialNodes:Node[] = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'textInput',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
    type: 'output'
  },
];

export default function Home() {

  const [nodes,setNodes]=useState<Node[]>(initialNodes)
  const [edges,setEdges]=useState<Edge[]>(initialEdges)

  const onNodesChange:OnNodesChange = useCallback( (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
  const onEdgesChange = useCallback( (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );
  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);
  const nodeTypes=useMemo(()=>({'textInput':TextInputNode}),[])
 /*  const inputRef=useRef<HTMLInputElement>(null!)
  const searchParams=useSearchParams();
  const code=searchParams.get("code")
  let [webhook,setWebhook]=useState("")
  
  useEffect(()=>{
    async function fetchwebhook(){
        setWebhook(await getwebhook(code))
    }
     fetchwebhook()
  },[])
    cronjob(webhook) */
    
  return (
    <>

<div style={{ height: '100vh',width:'100vw' }}>
      <ReactFlow 
      nodes={nodes} 
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
    
      {/* <input ref={inputRef} type="text" className="border-2" />
      <button onClick={()=>{
          console.log(inputRef.current.value)
          sendSlackMsg(new URL(webhook),inputRef.current.value)
      }}>Submit</button>
      <div>
        Posting latest askreddit data on webhook
      </div> */}
    </>
  )
}
