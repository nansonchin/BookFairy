import type { Look } from "./runwaySchema";

export function publicPhoto(look:Pick<Look,"status"|"photo">):NonNullable<Look["photo"]>|null{
    return look.status === "found" || look.status ==="waiting" ? (look.photo??null) :null;
}
