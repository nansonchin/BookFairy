import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useLooksState } from "../../context/LooksContext";
import { readBackground } from "../../../../shared/lib/backgroundLocation";
import { findLook } from "../../domain/drop";
import { useCallback, useEffect } from "react";
import { DropDetail } from "../DropDetail/DropDetail";

export function DropRoute(){
    const {id} = useParams();
    const state = useLooksState();
    const location = useLocation();
    const navigate = useNavigate();
    const hasBackground = readBackground(location)!==null;

    const look = state.status ==="ready"? findLook(state.looks,id):null

    const close = useCallback(()=>{
        if(hasBackground){
            navigate(-1)
        }else{
            navigate({
                pathname:"/drops",search:location.search
            })
        }
    },[hasBackground,navigate,location.search])

    useEffect(()=>{
        if(!look){
            return;
        }
        const previous = document.title;
        document.title =`${look.book.title} ${look.drop.city} | The Book Fairies`
        return()=>{
            document.title= previous;
        }
    },[look])

    if(state.status === "ready" && !look) return (
        <Navigate to ="/drops" replace/>
    )

    return <DropDetail look={look} onClose={close}/>
}