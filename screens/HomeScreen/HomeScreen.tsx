import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StatusBar,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Footer } from "@/components/Footer";
import { Sections } from "@/components/Sections";

import { LOCATIONS } from "@/data";
import { COLORS, FOOTER_HEIGHT, IMAGES } from "@/config";
import { LocationType } from "@/types";
import { styling } from "./styles";

export const HomeScreen = () => {
  const [activeSlideId, setActiveSlideId] = useState("london");
  const ref: React.LegacyRef<FlatList> = useRef(null);
  const { width, height } = Dimensions.get("window");

  const styles = styling(width, height);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<LocationType>[] }) => {
      if (viewableItems[0] === undefined) {
        return;
      }

      setActiveSlideId(viewableItems[0].item.id);
    },
    []
  );

  const handleButtonPress = (index: number) => {
    if (ref === null || ref.current === null) {
      return;
    }

    ref.current.scrollToIndex({ animated: true, index });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.dark.background} />
      <ImageBackground
        source={IMAGES.background}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <FlatList
          style={{ height: "100%" }}
          data={LOCATIONS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            height: height - FOOTER_HEIGHT,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Sections location={item.location} />}
          horizontal
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          ref={ref}
        />
        <Footer
          activeSlideId={activeSlideId}
          buttons={LOCATIONS.map((slide) => slide.id)}
          onButtonPress={handleButtonPress}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
