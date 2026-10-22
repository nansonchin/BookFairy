import type { Look } from "./runwaySchema";

export type CoverSize ="S"|"M"|"L";

const OPEN_LIBBRARY_COVERS="https://covers.openlibrary.org/b/isbn";

export function coverUrlFor(book:Look["book"],size:CoverSize):string|null{
    if(book.coverUrl){
        return book.coverUrl
    }

    return book.isbn? `${OPEN_LIBBRARY_COVERS}/${book.isbn}-${size}.jpg?default=false`: null

}