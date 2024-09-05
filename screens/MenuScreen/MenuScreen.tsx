import * as React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponderInstance,
  Pressable,
  Text,
} from "react-native";

import { MenuPressable, SearchBar } from "@/components";
import { LocationsType, LocationType } from "@/types";

import Entypo from "@expo/vector-icons/Entypo";

import { styling } from "./styles";

export type MenuScreenPropsType = {
  locations: LocationsType;
  translateXValue: Animated.AnimatedInterpolation<string | number>;
  panResponder: PanResponderInstance;
  onGoBackPress: () => void;
  refetchLocations: () => Promise<void>;
  setLocation: (newLocation: LocationType) => void;
};

export const MenuScreen = ({
  locations,
  translateXValue,
  panResponder,
  onGoBackPress,
  refetchLocations,
  setLocation,
}: MenuScreenPropsType) => {
  const { height } = Dimensions.get("window");
  const styles = styling(height);

  const innerContainerTranslateY = React.useRef(new Animated.Value(0)).current;
  const pressableOpacity = React.useRef(new Animated.Value(1)).current;
  const overflowOpacity = React.useRef(new Animated.Value(0)).current;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: translateXValue }] },
      ]}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={[
          styles.innerContainer,
          { transform: [{ translateY: innerContainerTranslateY }] },
        ]}
      >
        <Animated.View
          style={[
            styles.pressableContainer,
            styles.paddingHorizontal,
            { opacity: pressableOpacity },
          ]}
        >
          <Pressable onPress={onGoBackPress} style={styles.pressable}>
            <Entypo name="chevron-left" size={24} style={styles.icon} />
            <Text style={styles.title}>Weather</Text>
          </Pressable>
        </Animated.View>
        <SearchBar
          setLocation={setLocation}
          menuScreenOverflowOpacity={overflowOpacity}
          menuScreenPressableOpacity={pressableOpacity}
          menuScreenInnerContainerTranslateY={innerContainerTranslateY}
        />
        <FlatList
          style={styles.flatList}
          data={locations}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MenuPressable
              location={item}
              refetchLocations={refetchLocations}
            />
          )}
        />
        <Animated.View style={[styles.overlay, { opacity: overflowOpacity }]} />
      </Animated.View>
    </Animated.View>
  );
};
