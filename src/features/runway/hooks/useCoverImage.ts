import { useEffect, useState } from "react";
import { probeImage } from "../../../shared/lib/probeImage";

export type CoverStatus = "none"| "loading"|"ready"|"failed";

export function useCoverImage(url:string|null):CoverStatus{
    const [result,setResult]= useState<{readonly url:string; readonly ok :boolean}|null>(null)

    useEffect(()=>{
        if(!url){
            return
        }

        let cancelled = false;

        probeImage(url).then((ok)=>{
            if(!cancelled){
                setResult({url,ok})
            }
        })

        return ()=>{
            cancelled=true;
        }
    },[url])

    if(!url){
        return "none"
    }
    if(!result || result.url !==url){
        return "loading"
    }

    return result.ok?"ready":"failed"
}