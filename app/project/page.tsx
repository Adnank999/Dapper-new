"use client";

import ProjectShowcase from "./components/project-showcase-1/ProjectShowcase";
import RunicClient from "./components/RunicClient";
import { useEffect, useRef } from "react";

// export default function Page() {
//   const showcaseRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const getRunicTargets = (): EventTarget[] => {
//       const targets: EventTarget[] = [window, document, document.body];

//       const scene = document.querySelector("#scene");
//       if (scene) targets.push(scene);

//       const sceneClass = document.querySelector(".scene");
//       if (sceneClass) targets.push(sceneClass);

//       const scrollLine = document.querySelector(".scroll-line");
//       if (scrollLine) targets.push(scrollLine);

//       return targets;
//     };

//     const onWheel = (e: WheelEvent) => {
//       const root = showcaseRef.current;
//       if (!root) return;

//       // ✅ safest: check via composedPath first
//       const path = typeof e.composedPath === "function" ? e.composedPath() : [];
//       const isInside =
//         path.length > 0
//           ? path.includes(root)
//           : e.target instanceof Node
//             ? root.contains(e.target)
//             : false;

//       if (!isInside) return;

//       e.preventDefault();

//       const evt = new WheelEvent("wheel", {
//         deltaX: e.deltaX,
//         deltaY: e.deltaY,
//         deltaZ: e.deltaZ,
//         deltaMode: e.deltaMode,
//         clientX: e.clientX,
//         clientY: e.clientY,
//         ctrlKey: e.ctrlKey,
//         shiftKey: e.shiftKey,
//         altKey: e.altKey,
//         metaKey: e.metaKey,
//         bubbles: true,
//         cancelable: true,
//       });

//       for (const t of getRunicTargets()) {
//         if ("dispatchEvent" in (t as any)) (t as any).dispatchEvent(evt);
//       }
//     };

//     window.addEventListener("wheel", onWheel, {
//       passive: false,
//       capture: true,
//     });
//     return () =>
//       window.removeEventListener("wheel", onWheel, { capture: true } as any);
//   }, []);

//   return (
//     <main className="relative">
//       <RunicClient />

//       {/* <div className="fixed inset-0 z-10 flex items-center justify-end pointer-events-none ">
//         <div
//           ref={showcaseRef}
//           className="pointer-events-auto w-full max-w-6xl px-6 md:px-12"
//         >
//           <ProjectShowcase />
//         </div>
//       </div> */}

//       <div className="fixed inset-0 z-10 flex items-center justify-end pointer-events-none">
//   <div
//     ref={showcaseRef}
//     className="pointer-events-auto w-full max-w-6xl px-6 md:px-12"
//   >
//     <div className="h-[80vh] overflow-y-auto overscroll-contain no-scrollbar">
//       <ProjectShowcase />
//     </div>
//   </div>
// </div>

//     </main>
//   );
// }
export default function Page() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const showcaseScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getRunicTargets = (): EventTarget[] => {
      const targets: EventTarget[] = [window, document, document.body];

      const scene = document.querySelector("#scene");
      if (scene) targets.push(scene);

      const sceneClass = document.querySelector(".scene");
      if (sceneClass) targets.push(sceneClass);

      const scrollLine = document.querySelector(".scroll-line");
      if (scrollLine) targets.push(scrollLine);

      return targets;
    };

    const onWheel = (e: WheelEvent) => {
      const root = showcaseRef.current;
      if (!root) return;

      // Is the wheel event happening anywhere inside the showcase overlay?
      const path = typeof e.composedPath === "function" ? e.composedPath() : [];

      const isInsideRoot =
        path.length > 0
          ? path.includes(root)
          : e.target instanceof Node
            ? root.contains(e.target)
            : false;

      if (!isInsideRoot) return;

      const scroller = showcaseScrollRef.current;

      // Is the wheel event happening inside the internal scroll container?
      const insideScroller =
        !!scroller &&
        (path.length > 0
          ? path.includes(scroller)
          : e.target instanceof Node
            ? scroller.contains(e.target)
            : false);

      // If outside the internal scroller but still inside overlay,
      // prevent default so the browser doesn't try to scroll the page.
      // If inside the scroller, do NOT preventDefault so the scroller scrolls normally.
      if (!insideScroller) {
        e.preventDefault();
      }

      // Forward wheel to Runic so background reacts in BOTH cases
      const evt = new WheelEvent("wheel", {
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        deltaZ: e.deltaZ,
        deltaMode: e.deltaMode,
        clientX: e.clientX,
        clientY: e.clientY,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
        bubbles: true,
        cancelable: true,
      });

      for (const t of getRunicTargets()) {
        if ("dispatchEvent" in (t as any)) (t as any).dispatchEvent(evt);
      }
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    return () =>
      window.removeEventListener("wheel", onWheel, { capture: true } as any);
  }, []);

  return (
    <main className="relative">
      <RunicClient />

      <div className="fixed inset-0 z-10 flex items-center justify-end pointer-events-none mt-10">
        <div
          ref={showcaseRef}
          className="pointer-events-auto w-full max-w-6xl px-6 md:px-12"
        >
          <div
            ref={showcaseScrollRef}
            className="h-[80vh] overflow-y-auto overscroll-contain no-scrollbar"
          >
            <ProjectShowcase />
          </div>
        </div>
      </div>
    </main>
  );
}
