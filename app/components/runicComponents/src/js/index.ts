
// import { Preloader } from './Preloader';
// import './initScene';

// const preloaderContainer = document.getElementById('preloader') as HTMLElement;

// // eslint-disable-next-line no-new
// new Preloader({
//   container: preloaderContainer,
// });


// // index.ts
import { Preloader } from "./Preloader";
import { initScene, destroyScene } from "./initScene";

let preloader: Preloader | null = null;
let inited = false;

export function initRunic() {
  if (inited) return;
  inited = true;

  const preloaderContainer = document.getElementById("preloader") as HTMLElement | null;
  if (preloaderContainer && !preloader) {
    preloader = new Preloader({ container: preloaderContainer });
  }

  initScene();
}

export function destroyRunic() {
  destroyScene();

  // @ts-ignore
  preloader?.destroy?.();
  preloader = null;

  inited = false;
}
