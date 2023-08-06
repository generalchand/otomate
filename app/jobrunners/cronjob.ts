import { getredditdata } from "../integration/reddit/reddit"
import { sendSlackMsg } from "../integration/slack/slack"



export function cronjob(webhook:string){
  function fetchredditdata(){
    getredditdata(new URL("https://www.reddit.com/r/AskReddit/new/.json")).then(res=>{
      console.log(webhook)
      if(webhook)
      sendSlackMsg(new URL(webhook),`New post made by ${res["data"]["author_fullname"]} \n link: ${res["data"]["url"]}`)
    })
  }
  

  setInterval(fetchredditdata,12000)
}
