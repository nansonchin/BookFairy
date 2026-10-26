import { useEffect } from "react"

const BASE = "The Book Fairies"

export function usePageTitle(title?:string):void{
    useEffect(()=>{
        document.title=title?`${title} | ${BASE}`:BASE;
        return  ()=>{
            document.title=BASE
        }
    },[title])
}