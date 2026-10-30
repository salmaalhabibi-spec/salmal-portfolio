import { useState } from "react";
import type { CSSProperties } from "react";
import type { GalleryGroup, ProjectImage } from "@/data/projects";
import { Lightbox } from "@/components/lightbox";

export function ProjectGallery({ groups }: { groups: GalleryGroup[] }) {
  const images: ProjectImage[] = groups.flatMap((group) => group.images);
  const [index, setIndex] = useState<number | null>(null);
  let cursor = 0;

  return (
    <div className="gallery">
      {groups.map((group) => {
        const start = cursor;
        cursor += group.images.length;
        const columns = group.images.map((image) => `${image.width / image.height}fr`).join(" ");
        const style =
          group.layout === "row" ? ({ "--cols": columns } as CSSProperties) : undefined;
        return (
          <section key={group.id} className="gallery-block" aria-labelledby={group.label ? group.id : undefined}>
            {group.label ? (
              <h2 id={group.id} className="gallery-label">
                {group.label}
              </h2>
            ) : null}
            <div className={group.layout === "portrait" ? "frame-portrait" : group.layout === "full" ? "frame-full" : "frame-row"} style={style}>
              {group.images.map((image, imageIndex) => (
                <button
                  key={image.src}
                  type="button"
                  className="shot"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setIndex(start + imageIndex)}
                >
                  <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading={start + imageIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </section>
        );
      })}
      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </div>
  );
}
