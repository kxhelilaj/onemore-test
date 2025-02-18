import { Rect } from "@/components/skeleton-loader/Rect";
import SkeletonProvider from "@/providers/SkeletonProvider";
import useWorkoutFeedApi from "@/services/useWorkoutFeedApi";
import { IWorkout } from "@/types/DTO/workot-feed";
import { ISkeletonController } from "@/types/skeleton";
import { difficultyLevels, formatDuration } from "@/utils";
import { lazy, useRef, useState } from "react";
import { FlatList, Dimensions, View, ViewToken } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const VideoScreen = lazy(() =>
  // @ts-ignore
  import("@/components/video-stories/StoryListItem").then((module) => {
    return { default: module.default };
  }),
);

const Story = () => {
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState("");
  const { useGetWorkouts } = useWorkoutFeedApi();
  const { data, isLoading } = useGetWorkouts();
  const skeletonRef = useRef<ISkeletonController | null>(null);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<IWorkout>[];
  }) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].item.id);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <SkeletonProvider
      ref={(ref: ISkeletonController) => {
        if (ref) {
          skeletonRef.current = ref;
          if (isLoading) ref.start();
        }
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        {isLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Rect width={width - 20} height={600} radius={10} />
            <Rect
              style={{ marginTop: 10 }}
              width={width - 20}
              height={600}
              radius={10}
            />
          </View>
        )}
        <FlatList
          data={data}
          style={{ flex: 1 }}
          keyExtractor={(item) => item.id.toString()}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={({ item }) => (
            <VideoScreen
              id={item.id}
              currentId={currentViewableItemIndex}
              videoSource={item.routines.map((routine) => ({
                story_video: routine.video.playlist_url,
              }))}
              workoutDuration={formatDuration(item.total_duration)}
              difficulty={difficultyLevels[item.difficulty] || "Unknown"}
              profileImage={item.user.profile_photo_url}
              profileName={item.name}
            />
          )}
        />
      </SafeAreaView>
    </SkeletonProvider>
  );
};

export default Story;
