"use server"

import { CLIENT_ID, CLIENT_SECRET } from "./secret";

/*  */
export async function sendSlackdata(webhook:URL,value:String){
  console.log(webhook,value)
    const res=await fetch(webhook,{
      headers:{
        'Content-Type':'application/json',
      },
      method: 'POST',
      body:JSON.stringify({text:value})
    })
    const data=await res.text();
    console.log(data)
}

export async function getdata(code:String){
  const res=await fetch('https://slack.com/api/oauth.v2.access',{
    body:`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
    headers : {
      "Content-Type": 'application/x-www-form-urlencoded',
      },
      method: "POST",
  })
  const data=await res.json()

  return data["incoming_webhook"]["url"]

  //console.log((await res.json())["incoming_webhook"])
}