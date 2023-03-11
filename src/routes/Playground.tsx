import Amazing, { useAmazingRef } from "../components/Amazing";

export default () => {
  const startRef = useAmazingRef();
  return (
    <>
      <button
        onClick={() => {
          startRef.current?.();
        }}
      >
        start
      </button>
      <Amazing startRef={startRef}>🎉</Amazing>
    </>
  );
};
