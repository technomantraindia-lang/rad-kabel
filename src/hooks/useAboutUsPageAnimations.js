import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initAboutUsAnimations } from "../animations/aboutUsGsap";

export default function useAboutUsPageAnimations(pageRef) {
  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const cleanup = initAboutUsAnimations(root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      cleanup?.();
    };
  }, [pageRef]);
}
