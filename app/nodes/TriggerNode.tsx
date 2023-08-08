import { useRef } from "react";
import { Handle, Position } from "reactflow";

export function TriggerNode({data}){
    const inputRef=useRef<HTMLInputElement>(null!)
    return(
        <>
            <div className="border-2 border-black">
                <label htmlFor="text">Endpoint:</label>
                    
                <input id="text" name="text" ref={inputRef} className="border-1 border-black" type="text" />
                <button type="submit" onClick={()=>{
                    data.text=inputRef.current.value
                    console.log('Clicked')
                }}>Enter</button>
            </div>
            <Handle type="source" position={Position.Bottom} id="a"/>
        </>
    )
}