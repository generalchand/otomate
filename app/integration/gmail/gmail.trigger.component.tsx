export function GmailTrigger(props) {
  return (
    <>
    <div className="flex flex-col gap-5">
      <label htmlFor="email">Email: <input
        id="email"
        name="email"
        ref={props.emailInputRef}
        className="max-w-[100%] bg-white border border-gray-300 text-gray-700 py-2 px-4 focus:outline-none focus:border-blue-500"
        type="email"
      /></label>
     
      <label htmlFor="password">Password: <input
      className="max-w-[260px] bg-white border border-gray-300 text-gray-700 py-2 px-4 focus:outline-none focus:border-blue-500"
        id="password"
        name="password"
        type="password"
        ref={props.passwordInputRef}
       
      /></label>
     
     
    </div>
     <button
     style={{background:' linear-gradient(180deg, #E1E0FB 11.46%, #E1ECF7 61.98%)', }} className=' py-2 px-4 '
       type="submit"
       onClick={() => {
         props.data.email = props.emailInputRef.current.value;
         props.data.password = props.passwordInputRef.current.value;
         props.data.triggertype = "gmail";
         console.log("Clicked");
       }}
     >
       Enter
     </button>
     </>
  );
}
