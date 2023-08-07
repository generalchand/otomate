import { Handle, Position } from "reactflow";

export function OutputNode({data}){
    return(
        <div>
            <Handle type="target" position={Position.Top}/>
            Output: {data.text}
        </div>
    )
}