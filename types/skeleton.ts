import { StyleProp, ViewProps, ViewStyle } from "react-native";
import { Animated } from "react-native";

export interface SkeletonProps extends ViewProps {
  radius?: number;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export interface ISkeletonController {
  Animation: Animated.Value;
  start: () => void;
  stop: () => void;
}
