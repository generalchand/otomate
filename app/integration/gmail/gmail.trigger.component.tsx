export function GmailTrigger(props){

    return (
    <div>
        <label htmlFor="email">Email:</label>            
        <input id="email" name="email" ref={props.emailInputRef} className="border-1 border-black" type="email" />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" ref={props.passwordInputRef} className="border-1 border-black" />
        <button type="submit" onClick={()=>{
            props.data.email=props.emailInputRef.current.value
            props.data.password=props.passwordInputRef.current.value
            props.data.triggertype='gmail'
            console.log('Clicked')
        }}>Enter</button>
    </div>
    )
}