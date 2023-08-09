export function RedditTrigger(props){
    return (
    <div>
        <label htmlFor="text">Endpoint:</label>
                    
        <input id="text" name="text" ref={props.inputRef} className="border-1 border-black" type="text" />
        <button type="submit" onClick={()=>{
            props.data.text=props.inputRef.current.value
            props.data.triggertype='reddit'
            console.log('Clicked')
        }}>Enter</button>
    </div>
    )
}