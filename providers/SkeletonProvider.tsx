import { ISkeletonController } from "@/types/skeleton";
import { createContext, forwardRef, PropsWithChildren, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";

const SkeletonContext = createContext<ISkeletonController | null>(null);
export default forwardRef(function SkeletonRoot(
  { children }: PropsWithChildren,
  ref,
) {
  const animation = useRef(new Animated.Value(0)).current;
  const runningAnimations = useRef<Animated.CompositeAnimation | null>(null);
  const isRunning = useRef(false);

  const skeleton = useRef({
    Animation: animation,
    start: function () {
      if (isRunning.current == false) {
        runningAnimations.current = Animated.loop(
          Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: Platform.select({
              default: true,
              web: false,
            }),
            easing: Easing.ease,
          }),
        );
        runningAnimations.current.start();

        isRunning.current = true;
      }
    },
    stop: function () {
      animation.stopAnimation();
      animation.setValue(1);
      runningAnimations.current?.stop();
      isRunning.current = false;
    },
  });

  if (ref) {
    if (typeof ref === "function") {
      ref(skeleton.current);
    } else if (ref && "current" in ref) {
      ref.current = skeleton.current;
    }
  }

  return (
    <SkeletonContext.Provider value={skeleton.current}>
      {children}
    </SkeletonContext.Provider>
  );
});

export { SkeletonContext };
