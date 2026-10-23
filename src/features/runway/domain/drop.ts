import {DROP_STATUSES, type DropStatus, type Look } from "./runwaySchema"

export type DropFilters={
    readonly status: DropStatus |null;
    readonly country:string|null;
}

export const NO_FILTERS:DropFilters={status:null,country:null}

export function sortNewestFirst(looks:readonly Look[]):Look[]{
    return [...looks].sort((a,b)=>b.drop.date.localeCompare(a.drop.date)||b.number - a.number)
}

export function filterDrops(looks:readonly Look[],filters:DropFilters):Look[]{
    return looks.filter(
        (look)=>(filters.status === null || look.status === filters.status) && (filters.country === null || look.drop.country === filters.country)
    )
}

export function listCountries(looks:readonly Look[]):string[]{
    return [...new Set(looks.map((look)=>look.drop.country))].sort((a,b)=>a.localeCompare(b))
}

export function findLook(looks:readonly Look[], id:string|undefined):Look|null{
    return id? (looks.find((look)=>look.id === id)?? null) : null
}

export function parseFunction(params:URLSearchParams,knownCountries:readonly string[]):DropFilters{
    const status = params.get("status")
    const country = params.get("country")

    return{
        status:DROP_STATUSES.find((value)=>value === status)?? null,
        country:knownCountries.find((value)=>value === country) ?? null,
    }
}

export function filtersToParams(filters:DropFilters):URLSearchParams{
    const params = new URLSearchParams();

    if(filters.status!==null) params.set("status",filters.status);
    if(filters.country!==null) params.set("country",filters.country)

        return params;
}