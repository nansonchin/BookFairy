import type { ReactNode } from "react"
import { useLooks } from "../hooks/useLooks";
import { LooksContext } from "./LooksContext";

type LooksProviderProps={
    readonly children:ReactNode
}

export function LooksProvider({children}:LooksProviderProps){
    const state = useLooks();

    return  <LooksContext.Provider value={state}>
        {children}
    </LooksContext.Provider>
}