import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initTechnologyAnimations } from "../animations/technologyGsap";

export default function useTechnologyPageAnimations(pageRef) {
  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    document.body.classList.add("is-technology-page");

    const cleanup = initTechnologyAnimations(root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      document.body.classList.remove("is-technology-page");
      cleanup?.();
    };
  }, [pageRef]);
}
