import { useEffect, useState } from "react"
import { getwebhook } from "./slack"
import { useSearchParams } from "next/navigation";
import { slackCronJob } from "./slack.cron";

export function SlackComponent(props){
    const searchParams=useSearchParams();
    const code=searchParams.get("code")
    let [webhook,setWebhook]=useState("")
    useEffect(()=>{
        async function fetchwebhook(){
            if(code)
            setWebhook(await getwebhook(code))
        }
        fetchwebhook()
    },[])
    if(props.data.text){
        slackCronJob(webhook,props.data.text)
    }
    return(
        <>
        <div>Endpoint: {props.data.text}</div>
        {(code==undefined)?<a href="https://slack.com/oauth/v2/authorize?client_id=4356450523381.5719716288896&scope=incoming-webhook&user_scope="><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
        : <div>Authenticated!</div>}
        </>
        
    )
}