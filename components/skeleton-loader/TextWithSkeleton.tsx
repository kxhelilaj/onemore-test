import { Rect } from "./Rect";
import { Text } from "react-native";

const TextWithSkeleton = ({
  style = {},
  text = "",
  width = 60,
  height = 19,
  radius = 15,
}) => {
  if (text == undefined) {
    return <Rect width={width} height={height} radius={radius}></Rect>;
  }
  return <Text style={style}>{text}</Text>;
};
export { TextWithSkeleton };
