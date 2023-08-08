import { sendSlackMsg } from "./slack";
import { getredditdata } from "../reddit/reddit";



export function slackCronJob(webhook:string,endpoint:string){
  
  function fetchredditdata(){
    if(endpoint)
    getredditdata(new URL(endpoint)).then(res=>{
      console.log(webhook)
      if(webhook)
      sendSlackMsg(new URL(webhook),`New post made by ${res["data"]["author_fullname"]} \n link: ${res["data"]["url"]}`)
    })
  }
  

  setInterval(fetchredditdata,12000)
}
