"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, OnNodesChange,Node,Edge, addEdge} from 'reactflow';
import 'reactflow/dist/style.css';
import { TextInputNode } from './nodes/TextInputNode';
import { OutputNode } from './nodes/OutputNode';

const initialEdges:Edge[] = [ /* { id: '1-2', source: '1', target: '2', label: '',type:'straight' } */ ];

const initialNodes:Node[] = [
  {
    id: '1',
    data: {
      text:undefined
     },
    position: { x: 0, y: 0 },
    type: 'textInput',
  },
  {
    id: '2',
    data: { 
      text:undefined 
    },
    position: { x: 100, y: 100 },
    type: 'logOutput'
  },
];

function updatenode(node:Node,outputnode:Node){
    
}

export default function Home() {

  const [nodes,setNodes]=useState<Node[]>(initialNodes)
  const [edges,setEdges]=useState<Edge[]>(initialEdges)
  const [params,setParams]=useState()
  const onNodesChange:OnNodesChange = useCallback( (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
  const onEdgesChange = useCallback( (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );

  let param;
  const onConnect = (params: any) => {
    setParams(params)
    let node=nodes.find(n=>n.id===params.source)
    if(node.type==='textInput')
    {
      setNodes((nds)=>nds.map((n)=>{
        let outputnode=nodes.find(n=>n.id===params?.target)
        if(n.id==outputnode.id){
          n.data={
            ...n.data,
            text:node.data.text
          }
        }
        return n
      }))
      setEdges((eds) => addEdge(params, eds))
    }
  }
  console.log(nodes)
  
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
