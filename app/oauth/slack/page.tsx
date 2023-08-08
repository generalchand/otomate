"use client"
import { redirect, useSearchParams } from "next/navigation";

export default function SlackAuth(){
    const searchParams=useSearchParams();
    const code=searchParams.get("code")
    localStorage.setItem("slackCode",code)
    return (
        <div>
            <div>You have successfully add Slack!</div>
            <div>You can now close this tab</div>
        </div>
    )
}