"use client"
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getwebhook } from './integration/slack/slack'
import { cronjob } from './jobrunners/cronjob';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, OnNodesChange,Node,Edge, addEdge} from 'reactflow';
import 'reactflow/dist/style.css';
import { TextInputNode } from './nodes/TextInputNode';
import { OutputNode } from './nodes/OutputNode';

const initialEdges:Edge[] = [ /* { id: '1-2', source: '1', target: '2', label: '',type:'straight' } */ ];

const initialNodes:Node[] = [
  {
    id: 'yomama',
    data: {
      text:''
     },
    position: { x: 0, y: 0 },
    type: 'textInput',
  },
  {
    id: '2',
    data: { text:'yomama' },
    position: { x: 100, y: 100 },
    type: 'logOutput'
  },
];

function updatenode(node:Node,outputnode:Node){
    
}

export default function Home() {

  const [nodes,setNodes]=useState<Node[]>(initialNodes)
  const [edges,setEdges]=useState<Edge[]>(initialEdges)
  const [elements,setElements]=useState([])
  const onNodesChange:OnNodesChange = useCallback( (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
  const onEdgesChange = useCallback( (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );

  let param;
  const onConnect = (params: any) => {
    param=params
    let node=nodes.find(n=>n.id===params.source)
    if(node.type==='textInput')
    {
      setEdges((eds) => addEdge(params, eds))
    }
  }

  useEffect(()=>{
    if(param){
      let node=nodes.find(n=>n.id===param.source)
      setNodes((nds)=>nds.map((n)=>{
        let outputnode=nodes.find(n=>n.id===param.target)
        if(n.id==outputnode.id){
          n.data={
            ...n.data,
            outputtext:node.data.text
          }
        }
        return n
      }))
    }
    
  },[onConnect])
  
  const nodeTypes=useMemo(()=>(
    {
    'textInput':TextInputNode,
    'logOutput':OutputNode
  }),[])
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
