import { useState, useEffect, useRef } from "react";

export const useScrollControl = () => {
  const menuScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (menuScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = menuScrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    menuScrollRef.current?.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("resize", checkScroll);
      menuScrollRef.current?.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollMenu = (direction) => {
    if (menuScrollRef.current) {
      const scrollAmount = 200;
      menuScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return { menuScrollRef, canScrollLeft, canScrollRight, scrollMenu };
};
