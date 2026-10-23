import { Link } from "react-router-dom";
import type { Look } from "../../domain/runwaySchema";
import { useDropLink } from "../../hooks/useDropLink";
import { BookCover } from "../BookCover/BookCover";
import { formatDropDate } from "../../domain/format";
import { StatusPill } from "../StatusPill/StatusPill";
import "./DropCard.scss"
type DropCardProps ={
    readonly look :Look;
}

export function  DropCard({look}:DropCardProps){
    const dropLink = useDropLink();

    return(
        <Link {...dropLink(look.id)} className="drop-card" data-drop-id={look.id}>
            <BookCover look={look} size="M" />
            <span className="drop-card__city">{look.drop.city}</span>
            <span className="drop-card__date">{formatDropDate(look.drop.date)}</span>
            <StatusPill status={look.status}/>
        </Link>
    )
}