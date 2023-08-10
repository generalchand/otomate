
import { useRef, useState } from "react"
import { Handle, Position } from "reactflow"
import OpenAiComponent from "../integration/openAi/openAi"
import Ai21Component from "../integration/ai21/ai21"

export function LlmNode({data}){
    const inputRef=useRef<HTMLInputElement>(null!)
    const [mailBody, setMailBody] = useState("");
    const [selected,setSelected]=useState('')
    const onSelect=(event)=>{
        console.log(event.target.value)
        setSelected(event.target.value)
    }
    return(
        <div className="flex flex-col border-2 border-black w-96 h-40 bg-white">
            <Handle type="target" position={Position.Top}/>
            LLM
            <div>
            Models:
            <select name="" id="" onChange={onSelect} defaultValue="none">
                <option value="none">None</option>
                <option value="openAi">OpenAi</option>
                <option value="ai21">Ai21</option>
            </select>
            <br />
            <label htmlFor="mail">Mail</label>
            <textarea name="mail" id="mail" cols={30} rows={2} onChange={(e) => {setMailBody(e.target.value)}} value={mailBody}></textarea>
            </div>
            {(()=>{
                switch(selected){
                    case 'openAi':
                        return <OpenAiComponent data={data} mailBody={mailBody}/>
                    case 'ai21':
                        return <Ai21Component data={data} mailBody={mailBody}/>
                }
            })()}
            <Handle type="source" position={Position.Bottom} id="a"/>
        </div>
    )
}
