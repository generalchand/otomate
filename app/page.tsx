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
  let [prevdata,setprevdata]=useState("")
  let [redditdata,setRedditData]=useState("")
  let schedule=later.parse.recur().after(120).second()
  
  //https://www.reddit.com/r/AskReddit/new/.json
  useEffect(()=>{
    async function fetchwebhook(){
        setWebhook(await getwebhook(code))
    }
     fetchwebhook()
  },[]) 
  let timer=later.setInterval(fetchredditdata,schedule)
  async function fetchredditdata(){
    setprevdata(redditdata)
    setRedditData(await getredditdata(new URL("https://www.reddit.com/r/AskReddit/new/.json")))
  }
    sendSlackMsg(new URL(webhook),`New post made by ${redditdata["data"]["author_fullname"]} \n link: ${redditdata["data"]["url"]}`)


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
