import { useLayoutEffect, useState } from "react";

const useInfinite = (initial, coef, delta) => {
    const [margin, setMargin] = useState(initial);
    useLayoutEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = winScroll / height;
            if (scrolled > (coef || 0.87)) {
                setMargin(margin + (delta || 4));
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [coef, delta, margin]);

    return [margin];
};

export default useInfinite;
