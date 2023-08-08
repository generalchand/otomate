"use client"
import { redirect, useSearchParams } from "next/navigation";

export default function SlackAuth(){
    const searchParams=useSearchParams();
    const code=searchParams.get("code")
    redirect(`/?code=${code}`)
    return (
        <div>bruh</div>
    )
}