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
    <div className='flex flex-row bg-gray-100 justify-between' style={{height:'100vh'}}>

    <div className='grow'>
            <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            style={{width:'100%',height:'100%'}}
            className='bg-slate-200'
            connectionLineStyle={{stroke:'rgb(139,92,246)',strokeWidth:2}}
            >
             {/*  <Background /> */}
              <Controls />
            </ReactFlow>
      </div>
      <div className='bg-white p-6 mb-6' >
        <div  className='text-[2rem] mx-20 my-5 font-semibold '>
        Tools
        </div> 

        <div className='text-[1.2rem] flex flex-col gap-8  text-slate-50'>
          <div className='hover:bg-slate-100' >
          <button className='w-full py-2 px-4 bg-violet-500 hover:bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md' onClick={()=>{addNode('trigger')}}>Trigger</button>
          </div>
          <div className='hover:bg-slate-100'>
            <button className='w-full py-2 px-4 bg-violet-500 hover:bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md' onClick={()=>{addNode('action')}}>Actions</button>
          </div>
        </div>
      </div>
    </div>
      
    </>
  )
}
