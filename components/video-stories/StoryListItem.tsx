import { useState, useRef, useEffect } from "react";
import { useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { IStoryItem } from "@/types/story";

export default function VideoScreen({
  workoutDuration,
  profileImage,
  videoSource,
  profileName,
  difficulty,
  currentId,
  id,
}: {
  workoutDuration: string;
  videoSource: IStoryItem[];
  profileImage: string;
  profileName: string;
  difficulty: string;
  currentId: string;
  id: string;
}) {
  const [content, setContent] = useState<IStoryItem[]>(
    videoSource.map((x) => ({
      ...x,
      finish: 0,
    })),
  );
  const [current, setCurrent] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  const player = useVideoPlayer(content[current].story_video, (player) => {
    player.loop = false;
    player.volume = 0;
  });

  useEffect(() => {
    if (id === currentId) {
      player.play();
    } else {
      player.pause();
    }
  }, [player, id, currentId]);

  useEventListener(player, "playingChange", () => {
    if (player.playing) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) switchVideo(1);
      });
    } else {
      progress.stopAnimation();
    }
  });

  function switchVideo(direction: number) {
    Animated.timing(progress, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
    setCurrent((prevIndex) => {
      const newIndex =
        (prevIndex + direction + videoSource.length) % videoSource.length;
      return newIndex;
    });

    setContent((prevContent) => {
      const newContent = [...prevContent];
      newContent[current].finish = 1;
      return newContent;
    });
    if (current === videoSource.length - 1) {
      setContent((prevContent) =>
        prevContent.map((x) => ({ ...x, finish: 0 })),
      );
    }
    if (direction === -1) {
      setContent((prevContent) => {
        const newContent = [...prevContent];
        newContent[current].finish = 0;
        return newContent;
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          nativeControls={false}
        />
        <View style={styles.overlay}>
          <View style={styles.pressableContainer}>
            <Pressable
              style={styles.leftPressable}
              onPress={() => switchVideo(-1)}
            />
            <Pressable
              style={styles.rightPressable}
              onPress={() => switchVideo(1)}
            />
          </View>
          <View style={styles.topContainer}>
            <View style={styles.animationBarContainer}>
              {videoSource.map((_, index) => (
                <View key={index} style={styles.animationBackground}>
                  <Animated.View
                    style={{
                      flex:
                        current === index ? progress : content[index].finish,
                      height: 2,
                      backgroundColor: "white",
                    }}
                  />
                </View>
              ))}
            </View>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{profileName}</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Feather name="clock" size={24} color="white" />
            <Text style={styles.bottomText}>{workoutDuration}</Text>
            <Text style={styles.bottomText}>{difficulty}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 9 / 16,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 15,
  },
  topContainer: {
    paddingTop: 20,
  },
  animationBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  animationBackground: {
    height: 2,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(117, 117, 117, 0.5)",
    marginHorizontal: 2,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    marginLeft: 5,
  },
  pressableContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftPressable: {
    width: "30%",
  },
  rightPressable: {
    width: "30%",
  },
});
