import { useCallback } from "react";
import { Handle, Position } from "reactflow";

export function TextInputNode({data}){
    const onChange=useCallback((evt)=>{console.log(evt.target.value)},[])
    return(
        <>
            {/* <Handle type="target" position={Position.Top}/> */}
                <div className="border-2 border-black">
                    <label htmlFor="text">Endpoint:</label>
                    <input id="text" name="text" className="border-1 border-black" onChange={onChange} type="text" />
                </div>
                <Handle type="source" position={Position.Bottom} id="a"/>
        </>
    )
}