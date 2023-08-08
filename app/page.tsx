"use client"
import { useCallback, useMemo, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, OnNodesChange,Node,Edge, addEdge} from 'reactflow';
import 'reactflow/dist/style.css';
import { TriggerNode } from './nodes/TriggerNode';
import { ActionNode } from './nodes/ActionNode';

const initialEdges:Edge[] = [ /* { id: '1-2', source: '1', target: '2', label: '',type:'straight' } */ ];

const initialNodes:Node[] = [
 /*  {
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
  }, */
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

  const addNode=(type:string)=>{
    setNodes((nds)=>{
      let node={
        id: `${nds.length+1}`,
        data: {
          text:undefined
         },
        position: { x: 0, y: 0 },
        type: type,
      }
      return [...nds,node]
    })
  }
 
    
  return (
    <>
    <div className='flex flex-row bg-gray-100' style={{height:'100vh'}}>

    <div style={{flex:0.7}}>
            <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            style={{width:'100%',height:'100%'}}
            >
             {/*  <Background /> */}
              <Controls />
            </ReactFlow>
      </div>
      <div className='bg-white ' style={{flex:0.3}}>
        <div  style={{margin:'20px',fontSize:'2rem'}}>
        Tools
        </div> 
        <div className='hover:bg-slate-100' style={{padding:'20px',fontSize:'1.2rem'}}>
        <button onClick={()=>{addNode('trigger')}}>Trigger</button> 
        </div>
        <div className='hover:bg-slate-100' style={{padding:'20px',fontSize:'1.2rem'}}>
          <button onClick={()=>{addNode('action')}}>Actions</button>
        </div>
      </div>
    </div>
      
    </>
  )
}
