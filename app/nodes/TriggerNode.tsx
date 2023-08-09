import { useRef, useState } from "react";
import { Handle, Position } from "reactflow";

function RedditTrigger(props) {
  return (
    <div className="flex flex-col gap-6">
      <label htmlFor="text">
        Endpoint:
        <input
          id="text"
          name="text"
          ref={props.inputRef}
          className="border-1 border-violet-500 focus:border-violet-500"
          type="text"
        />
      </label>

      <div className="flex justify-center">
          <button
            className=" max-w-[100px] text-slate-50 w-full py-2 px-4 bg-violet-500 hover:bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md"
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
    <div className="flex flex-col border-2 text-[1.2em]   border-violet-500 p-2 rounded-md w-96 h-96 bg-slate-100 items-center gap-3 drop-shadow-md">
      <div className="font-semibold">Trigger</div>
      <div>
        App:
        <select className="w-48 ml-2" name="" id="" onChange={onSelect} defaultValue="none">
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
