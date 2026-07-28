import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initContactUsAnimations } from "../animations/contactUsGsap";

export default function useContactUsPageAnimations(pageRef) {
  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const cleanup = initContactUsAnimations(root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      cleanup?.();
    };
  }, [pageRef]);
}
