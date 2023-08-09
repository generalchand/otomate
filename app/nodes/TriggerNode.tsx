import { useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import {RedditTrigger} from "@/app/integration/reddit/reddit.trigger.component"
import { gmailCronJob } from "../integration/gmail/gmail.cron";
import { GmailTrigger } from "../integration/gmail/gmail.trigger.component";


export function TriggerNode({ data }) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const passwordRef=useRef<HTMLInputElement>(null!)
  const [selected, setSelected] = useState("");
  const onSelect = (event) => {
    setSelected(event.target.value);
  };
  return (
    <div className="flex flex-col border-2 text-[1.2em]   w-96 h-96 bg-white items-center gap-3 drop-shadow-xl">
      <div style={{background:' linear-gradient(180deg, #E1E0FB 11.46%, #E1ECF7 61.98%)' }} className="font-semibold p-4 min-w-full text-center">Trigger</div>
      <div className="flex gap-4 items-center">
        App:
        <select
          className="w-[250px] bg-white border border-gray-300 text-gray-700 py-2 px-4 focus:outline-none focus:border-blue-500"
          name=""
          id=""
          onChange={onSelect}
          defaultValue="none"
        >
          <option value="none">None</option>
          <option value="reddit">Reddit</option>
           <option value="gmail">Gmail</option>
        </select>
      </div>
      {(() => {
        switch (selected) {
          case "reddit":
            return <RedditTrigger inputRef={inputRef} data={data} />;
           case 'gmail':
            return <GmailTrigger emailInputRef={inputRef} passwordInputRef={passwordRef} data={data}/>
        }
      })()}
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
