import { useState } from "react";
import type { Look } from "../../domain/runwaySchema";
import { publicPhoto } from "../../domain/photo";
import "./DropPhoto.scss"
type DropPhotoProps = {
  readonly look: Pick<Look, "drop" | "status" | "photo">;
};

export function DropPhoto({ look }: DropPhotoProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const photo = publicPhoto(look);
  if (!photo || failedUrl === photo.url) {
    return null;
  }

  return (
    <figure className="drop-photo">
      <img
        className="drop-photo__img"
        src={photo.url}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailedUrl(photo.url)}
      />
      <figcaption className="drop-photo__caption">
        Left at {look.drop.place}, {look.drop.city}
        {photo.credit && 
        <>
            Photo By {photo.credit}
        </>
        }
      </figcaption>
    </figure>
  );
}
