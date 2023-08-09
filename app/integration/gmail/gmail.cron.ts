import { sendSlackMsg } from "../slack/slack"
import { getgmailinbox } from "./gmail"

export function gmailCronJob(webhook:string,user:string,password:string){
    const imapConfig = {
        user: user,
        password: password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
    };
    let prevdata;
    function sendslackmsg(){
        if(webhook)
        getgmailinbox(imapConfig).then((res:any)=>{
            console.log(webhook,res)
            if(prevdata!==JSON.stringify(res))
            {
                sendSlackMsg(new URL(webhook),`New Email from ${res.from.text} with the subject ${res.subject}`)
                prevdata=JSON.stringify(res)
            }
        })
        
    }
    setInterval(sendslackmsg,6000)
  }