export function RedditTrigger(props) {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <label htmlFor="text">
        Endpoint:{" "}
        <input
          id="text"
          name="text"
          ref={props.inputRef}
          className="w-[250px] bg-white border border-gray-300 text-gray-700 py-2 px-4 focus:outline-none focus:border-blue-500"
          type="text"
        />
      </label>

      <button
      style={{background:' linear-gradient(180deg, #E1E0FB 11.46%, #E1ECF7 61.98%)' }} className=' py-2 px-4'
        type="submit"
        onClick={() => {
          props.data.text = props.inputRef.current.value;
          props.data.triggertype = "reddit";
          console.log("Clicked");
        }}
      >
        Enter
      </button>
    </div>
  );
}
