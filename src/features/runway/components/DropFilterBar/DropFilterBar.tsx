import type { DropFilters } from "../../domain/drop";
import type { DropStatus } from "../../domain/runwaySchema";
import "./DropFilterBar.scss"
const STATUS_OPTIONS: ReadonlyArray<{readonly value:DropStatus|null; readonly label:string}>=[
    {value:null,label:"All"},
    {value:"waiting",label:"Still waiting"},
    {value:"found",label:"Found"}
]

type DropFilterBarProps ={
    readonly filters:DropFilters;
    readonly countries:readonly string[];
    readonly total:number;
    readonly onChange:(next: DropFilters)=>void;
}

export function DropFilterBar({filters,countries,total,onChange}:DropFilterBarProps){
    return(
        <div className="drop-filter-bar" role="group" aria-label="Filter drops">
            <div className="drop-filter-bar__chips">
                {STATUS_OPTIONS.map((option)=>(
                    <button key={option.label} type="button" 
                    className="drop-filter-bar__chip"
                    aria-pressed={filters.status===option.value}
                    onClick={()=>onChange({...filters,status:option.value})}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <label className="drop-filter-bar__country">
                <span className="sr-only">
                    Country
                </span>
                <select value={filters.country?? ""} onChange={(event)=>onChange({...filters,country:event.target.value || null})}>
                    <option value="">All countries</option>
                    {
                        countries.map((country)=>(
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))
                    }
                </select>
            </label>
            <p className="drop-filter-bar__count" aria-live="polite">
                    {total} {total === 1? "drop":"drops"}
            </p>
        </div>
    )
}