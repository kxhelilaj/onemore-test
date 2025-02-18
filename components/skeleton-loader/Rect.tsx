import { Animated, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SkeletonProps } from "@/types/skeleton";
import useSkeletonController from "@/hooks/useSkeletonController";

function Rect(props: SkeletonProps) {
  const animation = useSkeletonController();
  if (!animation) {
    return null;
  }

  return (
    <View
      style={[
        {
          width: props.width,
          height: props.height,
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
        style={[
          {
            width: "100%",
            height: "100%",
            borderRadius: props.radius,
            alignItems: "center",
            flexDirection: "row",
            transform: [
              {
                translateX: animation.Animation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [-(props.width ?? 0), 0, props.width ?? 0],
                  extrapolate: "extend",
                }),
              },
            ],
          },
          props.style,
        ]}
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
export { Rect };
