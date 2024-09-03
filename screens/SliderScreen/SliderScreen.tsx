import * as React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
} from "react-native";
import { Footer, Sections } from "@/components";

import { COLORS, IMAGES } from "@/config";
import { styles } from "./styles";

import { LocationsType } from "@/types";

export type SliderScreenPropsType = {
  locations: LocationsType;
  onMenuIconPress: () => void;
};

export const SliderScreen = ({
  locations,
  onMenuIconPress,
}: SliderScreenPropsType) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  return (
    <Animated.View style={styles.animatedContainer}>
      <ImageBackground
        source={IMAGES.background}
        resizeMode="cover"
        style={styles.imageBackground}
      />
      <StatusBar backgroundColor={COLORS.dark.background} />
      <FlatList
        data={locations}
        renderItem={({ item }) => <Sections location={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
      />
      <Footer
        buttons={locations.map((slide) => slide.id)}
        onMenuIconPress={onMenuIconPress}
        scrollX={scrollX}
      />
    </Animated.View>
  );
};
