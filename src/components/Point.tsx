import { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

export const Point = ({ children }: { children: React.ReactNode }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [styles, api] = useSpring(() => ({
    from: {
      opacity: 0,
      x: 0,
      rotate: 0,
      scale: 1,
      y: 0,
      display: "inline-block",
    },
  }));

  useEffect(() => {
    api.update({
      to: async (next, cancel) => {
        const bcr = nodeRef.current?.getBoundingClientRect();
        if (!bcr) {
          return;
        }
        const xTarget = (document.scrollingElement?.clientWidth || 100) / 2;
        const yTarget = (document.scrollingElement?.clientHeight || 100) / 2;
        await next({
          opacity: 1,
          y: (document.scrollingElement?.clientHeight || 200) - 200,
          x: xTarget - bcr?.left,
          immediate: true,
        });
        await next({
          opacity: 1,
          y: yTarget - bcr?.top,
          scale: 4,
          rotate: 360,
        });
        await next({ rotate: 0, immediate: true });
        await next({ x: 0, y: 0, scale: 1 });
      },
    });
    api.start();
  }, []);
  return (
    <animated.div style={styles} ref={nodeRef}>
      {children}
    </animated.div>
  );
};
