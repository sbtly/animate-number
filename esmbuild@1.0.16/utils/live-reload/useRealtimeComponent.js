var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/utils/live-reload/useRealtimeComponent.ts
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { initLiveReload } from "./bootstrap.js";
function useRealtimeComponent(originalComponent, componentName) {
  const [, setForceRerender] = useState(0);
  const updateCount = useRef(0);
  const updatedInstance = useRef(null);
  useLayoutEffect(() => {
    const onRebuild = (event) => __async(this, null, function* () {
      console.log(`[framer-live-esm] Build complete, refreshing ${componentName}`);
      const response = yield import(`http://127.0.0.1:8000/${componentName}.js?${updateCount.current}`);
      updateCount.current++;
      updatedInstance.current = response[componentName];
      setForceRerender(updateCount.current);
    });
    const setupHandler = (retryCount = 0) => {
      if (!window.framerRealtimeSocket) {
        setTimeout(() => setupHandler(retryCount + 1), retryCount + 1 * 500);
        return;
      }
      window.framerRealtimeSocket.on("build", onRebuild);
    };
    setupHandler();
    return () => {
      if (window.framerRealtimeSocket) {
        window.framerRealtimeSocket.off("build", onRebuild);
      }
    };
  }, [componentName]);
  useEffect(() => {
    initLiveReload();
  }, []);
  return updatedInstance.current || originalComponent;
}
export {
  useRealtimeComponent
};
