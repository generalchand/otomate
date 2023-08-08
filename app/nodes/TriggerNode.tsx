import { useRef, useState } from "react";
import { Handle, Position } from "reactflow";


function RedditTrigger(props){
    return (
    <div>
        <label htmlFor="text">Endpoint:</label>
                    
        <input id="text" name="text" ref={props.inputRef} className="border-1 border-black" type="text" />
        <button type="submit" onClick={()=>{
            props.data.text=props.inputRef.current.value
            console.log('Clicked')
        }}>Enter</button>
    </div>
    )
}

export function TriggerNode({data}){
    const inputRef=useRef<HTMLInputElement>(null!)
    const [selected,setSelected]=useState('')
    const onSelect=(event)=>{
        console.log(event.target.value)
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
            </select>
            </div>
            {(()=>{
                switch(selected){
                    case 'reddit':
                        return <RedditTrigger inputRef={inputRef} data={data}/>
                }
            })()}
            <Handle type="source" position={Position.Bottom} id="a"/>
        </div>
    )
}