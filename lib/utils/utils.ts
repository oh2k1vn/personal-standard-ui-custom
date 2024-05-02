export function applyRootStyles() {
  const body = document.querySelector("body") as HTMLBodyElement;
  const root = document.querySelector(`#container`) as HTMLDivElement;
  if (root) {
    const p = 24;
    const h = window.innerHeight;
    const s = (h - p) / h;
    body.style.backgroundColor = "#000";
    root.style.overflow = "hidden";
    root.style.willChange = "transform";
    root.style.transition =
      "transform 200ms ease-in-out, border-radius 200ms linear";
    root.style.transform = `translateY(calc(env(safe-area-inset-top) + ${
      p / 2
    }px)) scale(${s})`;
    root.style.borderTopRightRadius = "10px";
    root.style.borderTopLeftRadius = "10px";
  }
}

export function cleanupRootStyles() {
  const body = document.querySelector("body") as HTMLBodyElement;
  const root = document.querySelector(`#container`) as HTMLDivElement;

  function onTransitionEnd() {
    root.style.removeProperty("overflow");
    root.style.removeProperty("will-change");
    root.style.removeProperty("transition");
    body.style.removeProperty("background-color");
    root.removeEventListener("transitionend", onTransitionEnd);
  }

  if (root) {
    // Start animating back
    root.style.removeProperty("border-top-right-radius");
    root.style.removeProperty("border-top-left-radius");
    root.style.removeProperty("transform");

    // Remove temp properties after animation is finished
    root.addEventListener("transitionend", onTransitionEnd);
  }
}
