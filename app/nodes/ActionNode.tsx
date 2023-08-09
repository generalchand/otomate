"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { getwebhook } from "../integration/slack/slack";
import { slackCronJob } from "../integration/slack/slack.cron";
import { SlackComponent } from "../integration/slack/slack.action.component";



export function ActionNode({data}){
    
    const [selected,setSelected]=useState('')
    const onSelect=(event)=>{
        console.log(event.target.value)
        setSelected(event.target.value)
    }
    
    return(
        <div className="flex flex-col border-2 text-[1.2em]   border-violet-500 p-2 rounded-md w-96 h-96 bg-slate-100 items-center gap-3">
        <Handle type="target" position={Position.Top}/>
        <div className="font-semibold">Action</div>
        <div className="flex flex-col gap-2 items-center">

            <div className="text-[1.2rem]">
                App:
                <select className="w-48 ml-2" name="" id="" defaultValue="none" onChange={onSelect}>
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
        
    )
}