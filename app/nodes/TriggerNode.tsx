import { useRef, useState } from "react";
import { Handle, Position } from "reactflow";

function RedditTrigger(props) {
  return (
    <div className="flex flex-col gap-6 ">
      <label htmlFor="text" className="flex gap-4 items-center">
        Endpoint:
        <input
            
          id="text"
          name="text"
          ref={props.inputRef}
          className="max-w-[200px] bg-white border border-gray-300 text-gray-700 py-2 px-4 focus:outline-none focus:border-blue-500"
          type="text"
        />
      </label>

      <div className="flex justify-center">
        <button
          className=" w-[100px] py-2 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-200 focus:outline-none focus:ring focus:ring-slate-300 '"
          type="submit"
          onClick={() => {
            props.data.text = props.inputRef.current.value;
            console.log("Clicked");
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export function TriggerNode({ data }) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [selected, setSelected] = useState("");
  const onSelect = (event) => {
    console.log(event.target.value);
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
        </select>
      </div>
      {(() => {
        switch (selected) {
          case "reddit":
            return <RedditTrigger inputRef={inputRef} data={data} />;
        }
      })()}
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
