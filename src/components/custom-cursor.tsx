"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      requestAnimationFrame(animate);
    };

    const handleMouseEnterLink = () => {
      if (dotRef.current) {
        dotRef.current.style.width = "12px";
        dotRef.current.style.height = "12px";
        dotRef.current.style.background = "#ffffff";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "#6FAEFF80";
      }
    };

    const handleMouseLeaveLink = () => {
      if (dotRef.current) {
        dotRef.current.style.width = "8px";
        dotRef.current.style.height = "8px";
        dotRef.current.style.background = "#6FAEFF";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "#6FAEFF40";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterLink);
      el.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll("a, button");
      newLinks.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterLink);
        el.removeEventListener("mouseleave", handleMouseLeaveLink);
        el.addEventListener("mouseenter", handleMouseEnterLink);
        el.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
