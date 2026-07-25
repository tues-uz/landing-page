import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type HeaderMottoAnimationProps = {
  text: string;
  className?: string;
};

export function HeaderMottoAnimation({ text, className }: HeaderMottoAnimationProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const charsContainer = charsRef.current;
    if (!wrapper || !charsContainer) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    charsContainer.replaceChildren();
    if (reducedMotion) {
      charsContainer.textContent = text;
      charsContainer.className = "text-gold-gradient";
      return;
    }

    charsContainer.className = "";

    const letters = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.className = "inline-block origin-bottom-left will-change-transform text-gold-gradient";
      span.style.opacity = "0";
      charsContainer.appendChild(span);
      return span;
    });

    const ctx = gsap.context(() => {
      const hidden = {
        opacity: 0,
        y: 14,
        scale: 0.4,
        rotate: 0,
      };

      gsap
        .timeline({ repeat: -1, repeatDelay: 2.5 })
        .set(letters, hidden)
        .to(letters, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: () => gsap.utils.random(-5, 5),
          duration: 0.32,
          stagger: {
            each: 0.05,
            ease: "power1.inOut",
          },
          ease: "back.out(2)",
        });
    }, wrapper);

    return () => ctx.revert();
  }, [text]);

  return (
    <span ref={wrapperRef} className={cn("inline-block shrink-0 whitespace-nowrap", className)}>
      <span ref={charsRef} aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </span>
  );
}
