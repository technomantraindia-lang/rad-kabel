import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initMarketingPageAnimations } from "../animations/marketingPagesGsap";

export default function useMarketingPageAnimations(pageRef) {
  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const cleanup = initMarketingPageAnimations(root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      cleanup?.();
    };
  }, [pageRef]);
}
