import { sendSlackMsg } from "../slack/slack"
import { getgmailinbox } from "./gmail"

export function gmailCronJob(webhook: string, user: string, password: string, textobj: any) {
    return new Promise<void>((resolve, reject) => {
        const imapConfig = {
            user: user,
            password: password,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false }
        };

        let prevdata;

        function sendslackmsg() {
            if (webhook) {
                getgmailinbox(imapConfig).then((res: any) => {
                    console.log(webhook, res.subject);
                    textobj.sourcenode.data={
                        ...textobj.sourcenode.data,
                        text:res
                    }
                    //textobj.sourcenode.data.text = res;
                    if (prevdata !== JSON.stringify(res)) {
                        sendSlackMsg(new URL(webhook), `New Email from ${res.from.text} with the subject ${localStorage.getItem("type")?res.subject:localStorage.getItem("type")}`);
                        prevdata = JSON.stringify(res);
                    }
                   
                    resolve(); // Resolve the promise without passing a value
                }).catch(reject); // Reject the promise if there's an error
            }
        }

        setInterval(sendslackmsg, 6000);
    });
}

