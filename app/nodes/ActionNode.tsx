"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { getwebhook } from "../integration/slack/slack";
import { slackCronJob } from "../integration/slack/slack.cron";


export function ActionNode({data}){
    const searchParams=useSearchParams();
    const code=searchParams.get("code")
    let [webhook,setWebhook]=useState("")
    useEffect(()=>{
        async function fetchwebhook(){
            setWebhook(await getwebhook(code))
        }
        fetchwebhook()
    },[])
    if(data.text){
        
        slackCronJob(webhook,data.text)
    }
    return(
        <>
         <Handle type="target" position={Position.Top}/>
            <div className="border-2 border-black">
               
                Output: {data.text}
            </div>
        </>
        
    )
}