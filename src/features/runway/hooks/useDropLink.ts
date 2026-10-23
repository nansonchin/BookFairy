import { useCallback } from "react";
import { useLocation } from "react-router-dom";

export function useDropLink(){
    const location = useLocation();
    
    return useCallback(
        (id:string)=>({
            to:`/drops/${encodeURIComponent(id)}`,
            state:{background:location}
        }),
        [location]
    )
}