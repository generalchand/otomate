import { sendSlackMsg } from "../slack/slack";
import { getredditdata } from "./reddit";



export function redditCronJob(webhook:string,endpoint:string){
  
  function sendslackmsg(){
    if(endpoint)
    getredditdata(new URL(endpoint)).then(res=>{
      console.log(webhook)
      if(webhook)
      sendSlackMsg(new URL(webhook),`New post made by ${res["data"]["author_fullname"]} \n link: ${res["data"]["url"]}`)
    })
  }
  

  setInterval(sendslackmsg,120000)
}
