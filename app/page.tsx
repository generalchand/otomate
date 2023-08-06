"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';
import { getwebhook, sendSlackMsg } from './slack/slack';
import later from '@breejs/later';
import { getredditdata } from './reddit/reddit';
export default function Home() {
  
  const inputRef=useRef<HTMLInputElement>(null!)
  const searchParams=useSearchParams();
  const code=searchParams.get("code")
  let [webhook,setWebhook]=useState("")
  
  //https://www.reddit.com/r/AskReddit/new/.json
  useEffect(()=>{
    async function fetchwebhook(){
        setWebhook(await getwebhook(code))
    }
     fetchwebhook()
  },[]) 
  let c=0;
  function fetchredditdata(){
    getredditdata(new URL("https://www.reddit.com/r/AskReddit/new/.json")).then(res=>{
      console.log(webhook)
      if(webhook)
      sendSlackMsg(new URL(webhook),`New post made by ${res["data"]["author_fullname"]} \n link: ${res["data"]["url"]} ${c} times`)
    })
    c++;
  }
  

  setInterval(fetchredditdata,12000)
    
  return (
    <>
      <input ref={inputRef} type="text" className="border-2" />
      <button onClick={()=>{
          console.log(inputRef.current.value)
          sendSlackMsg(new URL(webhook),inputRef.current.value)
      }}>Submit</button>
      <div>
        Posting latest askreddit data on webhook
      </div>
    </>
  )
}
