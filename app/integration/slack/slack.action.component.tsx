import { useEffect, useState } from "react"
import { getwebhook } from "./slack"
import { useSearchParams } from "next/navigation";
import { redditCronJob } from "../reddit/reddit.cron";
import { gmailCronJob } from "../gmail/gmail.cron";

export function SlackComponent(props){
    const code=localStorage.getItem("slackCode")
    let [webhook,setWebhook]=useState("")
    console.log(code)
    useEffect(()=>{
        async function fetchwebhook(){
            if(code)
            setWebhook(await getwebhook(code))
        }
        fetchwebhook()
    },[])
    console.log("bruh ",props.data)
    switch(props.data.triggertype){
        case 'reddit':
                console.log("reddit is called")
                if(props.data.text){
                redditCronJob(webhook,props.data.text)
                props.data.text=undefined
                }
                //props.data.triggertype=undefined
        break;
        case 'gmail':
            if(props.data.email && props.data.password){
                console.log("gmail is called",props.data.text)
                gmailCronJob(webhook,props.data.email,props.data.password,props.data).then(()=>{
                   
                })
                
                //props.data.triggertype=undefined
            }
    }
   
    return(
        <div className="flex gap-3 items-center">
        <div >Endpoint: {props.data.text}</div>
        {(code==undefined)?<a className="hover:scale-110" href="https://slack.com/oauth/v2/authorize?client_id=4356450523381.5719716288896&scope=incoming-webhook&user_scope=" target="_blank"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
        : <div>Authenticated!</div>}
        </div>
        
    )
}