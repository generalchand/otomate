"use server"
import later from "@breejs/later"
import { getredditdata } from "./reddit/reddit"
import { sendSlackMsg } from "./slack/slack"
let WEBHOOK=''
export async function sethook(webhook:string){
    WEBHOOK=webhook
}
export async function startredditcron(webhook){
    let redditdata={}
    let schedule=later.parse.recur().on(45).second()
    let timer=later.setInterval(fetchredditdata,schedule)
    function fetchredditdata(){
      getredditdata(new URL("https://www.reddit.com/r/AskReddit/new/.json")).then(res=>{
        if(webhook && res)
            sendSlackMsg(new URL(webhook),`New post on ask reddit \n link: ${JSON.stringify(res,null,4)}`)
      })
    }
}

startredditcron(WEBHOOK)