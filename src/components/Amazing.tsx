import { MutableRefObject, useRef } from "react";
import { animated, useSpring, useSpringRef } from "react-spring";

const useAnimation = () => {
  const springRef = useSpringRef();
  const [styles, api] = useSpring(() => ({
    springRef: springRef,
    from: {
      y: 0,
      rotate: 0,
      scale: 1,
      width: "4rem",
      height: "4rem",
      origin: "50% 50%",
    },
  }));

  const start = () => {
    api.update({
      to: async (next, cancel) => {
        await next({ y: -500, rotate: 360, scale: 1.5 });
        await next({ rotate: 0, immediate: true });
        await next({ y: 200, scale: 1.85 });
        await next({ y: 200, scale: 1.5 });
        await next({ y: 200, scale: 1.85 });
        await next({ y: 200, scale: 1.85 });
        await next({ rotate: 0, immediate: true, scale: 0.7 });
      },
    });
    api.start();
  };
  return { styles, start };
};

const Amazing = ({
  startRef,
  children,
}: {
  startRef: MutableRefObject<() => void>;
  children: React.ReactNode;
}) => {
  const { styles, start } = useAnimation();
  startRef.current = start;
  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          margin: "auto",
          height: "5rem",
          lineHeight: "5rem",
          border: "1px solid hotpink",
          bottom: "-5rem",
          width: "5rem",
          fontSize: "5rem",
        }}
      >
        <animated.div style={styles}>{children}</animated.div>
      </div>
    </>
  );
};

export const useAmazingRef = () => {
  return useRef<() => void>(() => {});
};

export default Amazing;
