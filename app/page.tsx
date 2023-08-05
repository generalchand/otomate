"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';
import { sendSlackdata } from './util';
import { CLIENT_ID, CLIENT_SECRET } from './secret';

export default function Home() {
  
  const inputRef=useRef<HTMLInputElement>(null!)
  const searchParams=useSearchParams();
  const code=searchParams.get("code")
  let [webhook,setWebhook]=useState("")
  useEffect(()=>{
    async function getdata(){
      const res=await fetch('https://slack.com/api/oauth.v2.access',{
        body:`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
        headers : {
          "Content-Type": 'application/x-www-form-urlencoded',
          },
          method: "POST",
      })
      const data=await res.json()
      setWebhook(data["incoming_webhook"]["url"])

      //console.log((await res.json())["incoming_webhook"])
    }
     getdata()
  },[]) 
  console.log(webhook)
  console.log(code)


  return (
    <>
      <input ref={inputRef} type="text" className="border-2" />
      <button onClick={()=>{
          console.log(inputRef.current.value)
          sendSlackdata(new URL(webhook),inputRef.current.value)
      }}>Submit</button>
    </>
  )
}
