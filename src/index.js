import { useRef, useCallback } from "react";

const useRefCallback = (callback, keepInit = false) => {
  const callbackRef = useRef(callback);
  if (!keepInit) {
    callbackRef.current = callback;
  }
  return useCallback((...args) => {
    return callbackRef.current && callbackRef.current(...args);
  }, []);
};

export default useRefCallback;
