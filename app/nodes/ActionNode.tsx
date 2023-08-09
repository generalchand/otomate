"use client"
import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { SlackComponent } from "../integration/slack/slack.action.component";



export function ActionNode({data}){
    
    const [selected,setSelected]=useState('')
    const onSelect=(event)=>{
        setSelected(event.target.value)
    }
    
    return(
        <div className="flex flex-col border-2 text-[1.2em] bg-white   w-96 h-96  items-start gap-3 drop-shadow-xl ">
        <Handle type="target" position={Position.Top}/>
        <div  style={{background:' linear-gradient(180deg, #E1E0FB 11.46%, #E1ECF7 61.98%)' }} className=" font-semibold border-2  p-4 min-w-full text-center">Action</div>
        <div className="flex flex-col gap-2 items-center">

            <div className="text-[1.2rem] flex flex-col gap-4  ml-5">
                <div className="flex gap-4 items-center">
                    App:
                    <select  className="max-w-[200px] bg-white border border-gray-300 text-gray-700 py-2 px-4 focus:outline-none focus:border-blue-500" name="" id="" defaultValue="none" onChange={onSelect}>
                    <option value="none">None</option>
                    <option value="slack">Slack</option>
                                   </select>
                </div>
            
              
            {(()=>{
                switch(selected){
                    case 'slack':
                        return <SlackComponent data={data} />
                }
            })()}
            </div>
        </div>
        </div>
        
    )
}