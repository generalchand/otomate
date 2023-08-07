import { getredditdata } from "../integration/reddit/reddit"
import { sendSlackMsg } from "../integration/slack/slack"



export function cronjob(webhook:string,endpoint:string){
  let c=0;
  function fetchredditdata(){
    c++;
    if(endpoint)
    getredditdata(new URL(endpoint)).then(res=>{
      console.log(webhook)
      if(webhook)
      sendSlackMsg(new URL(webhook),`New post made by ${res["data"]["author_fullname"]} \n link: ${res["data"]["url"]} ${c} times`)
    })
  }
  

  setInterval(fetchredditdata,12000)
}
