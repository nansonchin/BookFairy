import { createContext, useContext } from "react";
import type { LooksState } from "../hooks/useLooks";

export const LooksContext=createContext<LooksState|null>(null)

export function  useLooksState():LooksState{
    const state=useContext(LooksContext);
    
    if(state === null){
        throw new Error("useLooksState must be used inside <LooksProvider>")
    }

    return state;
}