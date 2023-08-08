import { useSearchParams } from "next/navigation";

export default function SlackAuth(){
    const searchParams=useSearchParams();
    const code=searchParams.get("code")
    return (
        <div>bruh</div>
    )
}