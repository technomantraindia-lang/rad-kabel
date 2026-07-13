import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initInfrastructureAnimations } from "../animations/infrastructureGsap";

export default function useInfrastructurePageAnimations(pageRef) {
  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const cleanup = initInfrastructureAnimations(root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      cleanup?.();
    };
  }, [pageRef]);
}
