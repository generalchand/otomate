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
        <div className="flex flex-col border-2 border-black w-96 h-40">
        <Handle type="target" position={Position.Top}/>
        Action
        <div className="">

            <div>
                App:
                <select name="" id="" defaultValue="none" onChange={onSelect}>
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