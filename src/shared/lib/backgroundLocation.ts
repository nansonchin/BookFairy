import type {Location} from "react-router-dom"


// challenges

type BackgroundState = {readonly background?: Location};

export function readBackground(location:Location):Location|null{
    const state = location.state as BackgroundState|null
    return state?.background??null
}