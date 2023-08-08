"use client"
import { useCallback, useMemo, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, OnNodesChange,Node,Edge, addEdge} from 'reactflow';
import 'reactflow/dist/style.css';
import { TriggerNode } from './nodes/TriggerNode';
import { ActionNode } from './nodes/ActionNode';

const initialEdges:Edge[] = [ /* { id: '1-2', source: '1', target: '2', label: '',type:'straight' } */ ];

const initialNodes:Node[] = [
  {
    id: '1',
    data: {
      text:undefined
     },
    position: { x: 500, y: 50 },
    type: 'trigger',
  },
  {
    id: '2',
    data: { 
      text:undefined 
    },
    position: { x: 500, y: 500 },
    type: 'action'
  },
];

export default function Home() {

  const [nodes,setNodes]=useState<Node[]>(initialNodes)
  const [edges,setEdges]=useState<Edge[]>(initialEdges)
  const onNodesChange:OnNodesChange = useCallback( (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
  const onEdgesChange = useCallback( (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );

  
  const onConnect = (params: any) => {
    
    let node=nodes.find(n=>n.id===params.source)
    if(node.type==='trigger')
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
    'trigger':TriggerNode,
    'action':ActionNode
  }),[])
 
    
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
    
    
    </>
  )
}
