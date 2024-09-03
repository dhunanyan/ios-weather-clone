import * as React from "react";
import {
  Animated,
  FlatList,
  PanResponderInstance,
  Pressable,
  Text,
} from "react-native";

import { MenuPressable, SearchBar } from "@/components";
import { LocationsType } from "@/types";

import Entypo from "@expo/vector-icons/Entypo";

import { styles } from "./styles";

export type MenuScreenPropsType = {
  locations: LocationsType;
  translateXValue: Animated.AnimatedInterpolation<string | number>;
  onGoBackPress: () => void;
  panResponder: PanResponderInstance;
};

export const MenuScreen = ({
  locations,
  translateXValue,
  onGoBackPress,
  panResponder,
}: MenuScreenPropsType) => {
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: translateXValue }] },
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable onPress={onGoBackPress} style={styles.pressable}>
        <Entypo name="chevron-left" size={24} style={styles.icon} />
        <Text style={styles.title}>Weather</Text>
      </Pressable>
      <SearchBar />

      <FlatList
        style={styles.flatList}
        data={locations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <MenuPressable location={item} />}
      />
    </Animated.View>
  );
};
