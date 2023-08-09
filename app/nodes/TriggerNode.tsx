import { useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import {RedditTrigger} from "@/app/integration/reddit/reddit.trigger.component"
import { gmailCronJob } from "../integration/gmail/gmail.cron";
import { GmailTrigger } from "../integration/gmail/gmail.trigger.component";

export function TriggerNode({data}){
    const inputRef=useRef<HTMLInputElement>(null!)
    const passwordRef=useRef<HTMLInputElement>(null!)
    const [selected,setSelected]=useState('')
    const onSelect=(event)=>{
        setSelected(event.target.value)
    }
    
    return(
        <div className="flex flex-col border-2 border-black w-96 h-40 bg-white">
            Trigger
            <div>
            App:
            <select name="" id="" onChange={onSelect} defaultValue="none">
                        <option value="none">None</option>
                        <option value="reddit">Reddit</option>
                        <option value="gmail">Gmail</option>
            </select>
            </div>
            {(()=>{
                switch(selected){
                    case 'reddit':
                        return <RedditTrigger inputRef={inputRef} data={data}/>
                    case 'gmail':
                        return <GmailTrigger emailInputRef={inputRef} passwordInputRef={passwordRef} data={data}/>
                }
            })()}
            <Handle type="source" position={Position.Bottom} id="a"/>
        </div>
    )
}