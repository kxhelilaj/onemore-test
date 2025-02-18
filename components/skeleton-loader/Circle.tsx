import { Animated, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SkeletonProps } from "@/types/skeleton";
import useSkeletonController from "@/hooks/useSkeletonController";

export default function Circle(props: SkeletonProps) {
  const animation = useSkeletonController();

  if (!animation) {
    return null;
  }

  return (
    <View
      style={[
        {
          width: props.radius! * 2,
          height: props.radius! * 2,
          borderRadius: props.radius,
          backgroundColor: "rgba(204, 204, 204, 0.5)",
          alignItems: "center",
          flexDirection: "row",
          overflow: "hidden",
        },
        props.style,
      ]}
    >
      <Animated.View
        style={{
          width: props.radius! * 2,
          height: props.radius! * 2,
          borderRadius: props.radius,
          alignItems: "center",
          flexDirection: "row",
          transform: [
            {
              translateX: animation.Animation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [
                  -(props.radius ?? 0) * 2 - 20,
                  0,
                  (props.radius ?? 0) * 2 + 20,
                ],
                extrapolate: "extend",
              }),
            },
          ],
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.5)", "transparent"]}
          start={[0, 0]}
          end={[1, 0]}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Animated.View>
    </View>
  );
}
export { Circle };
