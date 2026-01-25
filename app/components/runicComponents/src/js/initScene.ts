// import { loadImage, times, vevet } from '@anton.bobrov/vevet-init';
// import { WebglManager } from './webgl/Manager';
// import { Items } from './Items';

// const managerContainer = document.getElementById('scene') as HTMLElement;

// const manager = new WebglManager(managerContainer, {
//   cameraProps: { fov: 50, perspective: 800 },
//   rendererProps: {
//     dpr: vevet.viewport.lowerDesktopDpr,
//     antialias: false,
//   },
// });

// manager.play();

// const imageSrcs = times((index) => `${index}.png`, 24); // 24
// let loadCount = 0;

// function handleLoaded() {
//   loadCount += 1;

//   manager.container.setAttribute(
//     'data-is-loaded',
//     `${loadCount / (imageSrcs.length + 1)}`,
//   );
// }

// const loaders = imageSrcs.map((image) => loadImage(image));
// loaders.forEach((loader) => {
//   loader.then(() => handleLoaded()).catch(() => {});
// });

// Promise.all(loaders)
//   .then((images) => {
//     // eslint-disable-next-line no-new
//     new Items({ manager, images });

//     handleLoaded();
//   })
//   .catch(() => {});





// // initScene.ts
import { loadImage, times, vevet } from "@anton.bobrov/vevet-init";
import { WebglManager } from "./webgl/Manager";
import { Items } from "./Items";

let manager: WebglManager | null = null;
let items: Items | null = null;
let destroyed = false;

let loaders: Promise<HTMLImageElement>[] = [];
let imageSrcs: string[] = [];

export function initScene() {
  // ✅ prevent double init on back/forward navigation
  if (manager) return;

  destroyed = false;

  const managerContainer = document.getElementById("scene") as HTMLElement | null;
  if (!managerContainer) return;

  manager = new WebglManager(managerContainer, {
    cameraProps: { fov: 50, perspective: 800 },
    rendererProps: {
      dpr: vevet.viewport.lowerDesktopDpr,
      antialias: false,
    },
  });

  manager.play();

  imageSrcs = times((index) => `${index}.png`, 24);
  let loadCount = 0;

  function handleLoaded() {
    if (!manager || destroyed) return;
    loadCount += 1;

    manager.container.setAttribute(
      "data-is-loaded",
      `${loadCount / (imageSrcs.length + 1)}`
    );
  }

  loaders = imageSrcs.map((image) => loadImage(image));
  loaders.forEach((loader) => {
    loader.then(() => handleLoaded()).catch(() => {});
  });

  Promise.all(loaders)
    .then((images) => {
      if (!manager || destroyed) return;
      items = new Items({ manager, images });
      handleLoaded();
    })
    .catch(() => {});
}

export function destroyScene() {
  destroyed = true;

  // If Items has a destroy/dispose method, call it
  // (check your Items class)
  // @ts-ignore
  items?.destroy?.();
  // @ts-ignore
  items?.dispose?.();
  items = null;

  if (manager) {
    // Stop RAF / rendering (depends on your WebglManager API)
    // Try these common method names:
    // @ts-ignore
    manager.pause?.();
    // @ts-ignore
    manager.stop?.();

    // Many managers expose renderer / scene / camera. If yours does, dispose:
    const anyManager = manager as any;

    try {
      // Dispose renderer & lose context (if possible)
      if (anyManager.renderer?.dispose) anyManager.renderer.dispose();
      if (anyManager.renderer?.getContext) {
        const gl = anyManager.renderer.getContext();
        const lose = gl?.getExtension?.("WEBGL_lose_context");
        lose?.loseContext?.();
      }
    } catch {}

    // Remove canvas if manager appended one
    try {
      const canvas: HTMLCanvasElement | undefined =
        anyManager.renderer?.domElement || anyManager.canvas;
      canvas?.parentElement?.removeChild(canvas);
    } catch {}

    // If manager has destroy/dispose:
    // @ts-ignore
    manager.destroy?.();
    // @ts-ignore
    manager.dispose?.();

    manager = null;
  }

  loaders = [];
  imageSrcs = [];
}
