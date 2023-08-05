"use server"
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