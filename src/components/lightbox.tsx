import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/data/projects";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

type View = { scale: number; x: number; y: number };
type Shift = { x: number; y: number; animate: boolean; opacity: number };

const restShift: Shift = { x: 0, y: 0, animate: false, opacity: 1 };

function clampScale(scale: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: ProjectImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const viewRef = useRef<View>({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    mode: "pinch" | "pan";
    dist: number;
    scale: number;
    x: number;
    y: number;
    px: number;
    py: number;
    t: number;
    axis: "x" | "y" | null;
    pull: number;
  } | null>(null);
  const lastTap = useRef(0);
  const multiTouch = useRef(false);
  const titleId = useId();
  const image = index === null ? null : images[index];
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const [shift, setShift] = useState<Shift>(restShift);
  const pendingEnter = useRef<number | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const commit = useCallback((next: View) => {
    const scale = clampScale(next.scale);
    const frame = frameRef.current;
    const img = imgRef.current;
    let x = next.x;
    let y = next.y;
    if (scale <= 1 || !frame || !img) {
      x = 0;
      y = 0;
    } else {
      const maxX = Math.max(0, (img.clientWidth * scale - frame.clientWidth) / 2);
      const maxY = Math.max(0, (img.clientHeight * scale - frame.clientHeight) / 2);
      x = Math.min(maxX, Math.max(-maxX, x));
      y = Math.min(maxY, Math.max(-maxY, y));
    }
    const settled = { scale: scale <= 1 ? 1 : scale, x, y };
    viewRef.current = settled;
    setView(settled);
  }, []);

  const zoomBy = useCallback((factor: number) => {
    const current = viewRef.current;
    commit({ ...current, scale: current.scale * factor });
  }, [commit]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index === null) {
      if (dialog.open) dialog.close();
      wasOpen.current = false;
      return;
    }
    if (!dialog.open) dialog.showModal();
    if (!wasOpen.current) closeRef.current?.focus({ preventScroll: true });
    wasOpen.current = true;
  }, [index]);

  useEffect(() => {
    viewRef.current = { scale: 1, x: 0, y: 0 };
    setView({ scale: 1, x: 0, y: 0 });
  }, [index]);

  useEffect(() => {
    if (index !== null) return;
    pendingEnter.current = null;
    setShift(restShift);
  }, [index]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  const open = index !== null;

  useLayoutEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const body = document.body;
    const html = document.documentElement;
    body.classList.add("lightbox-open");
    html.classList.add("lightbox-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const stopScroll = (event: Event) => {
      const target = event.target;
      if (target instanceof Node && frameRef.current?.contains(target)) return;
      event.preventDefault();
    };
    document.addEventListener("wheel", stopScroll, { passive: false });
    document.addEventListener("touchmove", stopScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", stopScroll);
      document.removeEventListener("touchmove", stopScroll);
      body.classList.remove("lightbox-open");
      html.classList.remove("lightbox-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || index === null) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const current = viewRef.current;
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      commit({ ...current, scale: current.scale * factor });
    };
    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, [index, commit]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndex(Math.min(images.length - 1, index + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndex(Math.max(0, index - 1));
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomBy(1.25);
      } else if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        zoomBy(1 / 1.25);
      } else if (event.key === " " || event.key === "PageDown" || event.key === "PageUp" || event.key === "Home" || event.key === "End") {
        const target = event.target;
        if (event.key === " " && target instanceof HTMLElement && target.closest("button")) return;
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onIndex, zoomBy]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || index === null) return;

    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("button")) return;
      frame.setPointerCapture(event.pointerId);
      pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      const current = viewRef.current;
      if (pointers.current.size >= 2) {
        multiTouch.current = true;
        const [a, b] = [...pointers.current.values()];
        gesture.current = {
          mode: "pinch",
          dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
          scale: current.scale,
          x: event.clientX,
          y: event.clientY,
          px: current.x,
          py: current.y,
          t: event.timeStamp,
          axis: null,
          pull: 0,
        };
        return;
      }
      gesture.current = {
        mode: "pan",
        dist: 0,
        scale: current.scale,
        x: event.clientX,
        y: event.clientY,
        px: current.x,
        py: current.y,
        t: event.timeStamp,
        axis: null,
        pull: 0,
      };
      if (reelRef.current && current.scale <= 1) reelRef.current.style.transition = "none";
    };

    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (!pointers.current.has(event.pointerId)) return;
      pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      const active = gesture.current;
      if (!active) return;
      if (pointers.current.size >= 2) {
        event.preventDefault();
        const [a, b] = [...pointers.current.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        commit({ ...viewRef.current, scale: active.scale * (dist / active.dist) });
        return;
      }
      if (active.mode === "pan" && viewRef.current.scale > 1) {
        commit({
          scale: viewRef.current.scale,
          x: active.px + (event.clientX - active.x),
          y: active.py + (event.clientY - active.y),
        });
        return;
      }
      if (active.mode === "pan" && active.scale <= 1 && pointers.current.size === 1 && reelRef.current) {
        const dx = event.clientX - active.x;
        const dy = event.clientY - active.y;
        if (!active.axis) {
          if (Math.hypot(dx, dy) < 8) return;
          active.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        }
        frame.classList.add("is-dragging");
        const reel = reelRef.current;
        reel.style.transition = "none";
        if (active.axis === "x") {
          const resist = (dx > 0 && index === 0) || (dx < 0 && index === images.length - 1);
          const x = resist ? dx * 0.34 : dx;
          active.pull = x;
          reel.style.opacity = "1";
          reel.style.transform = `translate3d(${x}px, 0px, 0)`;
        } else {
          const y = dy > 0 ? dy : dy * 0.22;
          active.pull = y;
          reel.style.opacity = dy > 0 ? String(Math.max(0.4, 1 - dy / 300)) : "1";
          reel.style.transform = `translate3d(0px, ${y}px, 0)`;
        }
      }
    };

    const onPointerUp = (event: globalThis.PointerEvent) => {
      const last = pointers.current.get(event.pointerId);
      const origin = gesture.current;
      const pinched = multiTouch.current;
      pointers.current.delete(event.pointerId);
      if (pointers.current.size === 0) {
        gesture.current = null;
        multiTouch.current = false;
      } else if (pointers.current.size < 2) {
        gesture.current = null;
      }
      const img = imgRef.current;
      if (!last || !origin || !img) {
        frame.classList.remove("is-dragging");
        return;
      }
      const dx = last.x - origin.x;
      const dy = last.y - origin.y;
      frame.classList.remove("is-dragging");
      if (!pinched && viewRef.current.scale <= 1 && origin.axis) {
        const elapsed = Math.max(event.timeStamp - origin.t, 16);
        if (origin.axis === "y") {
          const speed = dy / elapsed;
          if (dy > 78 || (speed > 0.55 && dy > 26)) {
            const from = origin.pull;
            setShift({ x: 0, y: from, animate: false, opacity: Math.max(0.4, 1 - Math.max(dy, 0) / 300) });
            requestAnimationFrame(() => {
              setShift({ x: 0, y: from + 240, animate: true, opacity: 0 });
            });
            window.setTimeout(() => onCloseRef.current(), 250);
            return;
          }
          setShift({ x: 0, y: origin.pull, animate: false, opacity: 1 });
          requestAnimationFrame(() => setShift({ x: 0, y: 0, animate: true, opacity: 1 }));
          return;
        }
        const speed = dx / elapsed;
        const next = dx < 0 ? index + 1 : index - 1;
        const going =
          next >= 0 &&
          next < images.length &&
          (Math.abs(dx) > 46 || (Math.abs(speed) > 0.45 && Math.abs(dx) > 14));
        if (going) {
          const travel = frame.clientWidth + 16;
          pendingEnter.current = next;
          setShift({ x: origin.pull, y: 0, animate: false, opacity: 1 });
          requestAnimationFrame(() => {
            setShift({ x: dx < 0 ? -travel : travel, y: 0, animate: true, opacity: 1 });
          });
          return;
        }
        setShift({ x: origin.pull, y: 0, animate: false, opacity: 1 });
        requestAnimationFrame(() => setShift({ ...restShift, animate: true }));
        return;
      }
      if (viewRef.current.scale <= 1) commit({ scale: 1, x: 0, y: 0 });
      if (event.pointerType !== "touch") return;
      if (Math.hypot(dx, dy) > 12) return;
      const now = Date.now();
      if (now - lastTap.current < 300) {
        lastTap.current = 0;
        const current = viewRef.current;
        commit(current.scale > 1 ? { scale: 1, x: 0, y: 0 } : { scale: 2.5, x: 0, y: 0 });
      } else {
        lastTap.current = now;
      }
    };

    const onDoubleClick = () => {
      const current = viewRef.current;
      commit(current.scale > 1 ? { scale: 1, x: 0, y: 0 } : { scale: 2.5, x: 0, y: 0 });
    };

    frame.addEventListener("pointerdown", onPointerDown);
    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerup", onPointerUp);
    frame.addEventListener("pointercancel", onPointerUp);
    frame.addEventListener("dblclick", onDoubleClick);
    const blockTouch = (event: TouchEvent) => event.preventDefault();
    frame.addEventListener("touchmove", blockTouch, { passive: false });
    return () => {
      frame.removeEventListener("pointerdown", onPointerDown);
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerup", onPointerUp);
      frame.removeEventListener("pointercancel", onPointerUp);
      frame.removeEventListener("dblclick", onDoubleClick);
      frame.removeEventListener("touchmove", blockTouch);
    };
  }, [index, images.length, onIndex, commit]);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      {image && index !== null ? (
        <div className="lightbox-inner">
          <div className="lightbox-bar">
            <p id={titleId} className="lightbox-count">
              {index + 1} / {images.length}
              <span className="sr-only">. {image.alt}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              className="icon-btn"
              onClick={onClose}
              aria-label="Close image"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div ref={frameRef} className="lightbox-stage">
            <div className={view.scale > 1 ? "lightbox-zoom is-zoomed" : "lightbox-zoom"}>
              <div
                ref={reelRef}
                className="lightbox-reel"
                onTransitionEnd={(event) => {
                  if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
                  const pending = pendingEnter.current;
                  if (pending === null) return;
                  pendingEnter.current = null;
                  onIndex(pending);
                  setShift(restShift);
                }}
                style={{
                  transform: `translate3d(${shift.x}px, ${shift.y}px, 0)`,
                  opacity: shift.opacity,
                  transition: shift.animate
                    ? "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease"
                    : "none",
                }}
              >
                {index > 0 ? (
                  <div key={images[index - 1].src} className="lightbox-slide lightbox-slide-prev" aria-hidden="true">
                    <img
                      src={images[index - 1].src}
                      alt=""
                      width={images[index - 1].width}
                      height={images[index - 1].height}
                      draggable={false}
                    />
                  </div>
                ) : null}
                <div key={image.src} className="lightbox-slide">
                  <img
                    ref={imgRef}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    draggable={false}
                    style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
                  />
                </div>
                {index < images.length - 1 ? (
                  <div key={images[index + 1].src} className="lightbox-slide lightbox-slide-next" aria-hidden="true">
                    <img
                      src={images[index + 1].src}
                      alt=""
                      width={images[index + 1].width}
                      height={images[index + 1].height}
                      draggable={false}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              className="icon-btn lightbox-nav lightbox-nav-prev"
              onClick={() => onIndex(index - 1)}
              disabled={index === 0}
              aria-label="Previous image"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-btn lightbox-nav lightbox-nav-next"
              onClick={() => onIndex(index + 1)}
              disabled={index === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
