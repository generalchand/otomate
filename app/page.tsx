"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';
import { getdata, sendSlackdata } from './util';

export default function Home() {
  
  const inputRef=useRef<HTMLInputElement>(null!)
  const searchParams=useSearchParams();
  const code=searchParams.get("code")
  let [webhook,setWebhook]=useState("")
  useEffect(()=>{
    async function fetchdata(){
        setWebhook(await getdata(code))
    }
     fetchdata()
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
