"use client"
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react';
import { getwebhook } from './integration/slack/slack'
import { cronjob } from './jobrunners/cronjob';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from 'reactflow';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'tiger lion' },draggable:true },
  { id: '2', position: { x: 100, y: 100 }, data: { label: '2' } ,draggable:true },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Home() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
  const inputRef=useRef<HTMLInputElement>(null!)
  const searchParams=useSearchParams();
  const code=searchParams.get("code")
  let [webhook,setWebhook]=useState("")
  
/*   useEffect(()=>{
    async function fetchwebhook(){
        setWebhook(await getwebhook(code))
    }
     fetchwebhook()
  },[])
    cronjob(webhook) */
    
  return (
    <>

<div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
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
