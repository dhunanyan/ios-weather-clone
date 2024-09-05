import React from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from "react-native";

import { HeaderSection } from "./HeaderSection";
import { AlertSection } from "./AlertSection";
import { HourSection } from "./HourSection";
import { DaySection } from "./DaySection";

import { SECTIONS } from "@/types";
import type { LocationType } from "@/types";

import { styling } from "./styles";
import {
  ANIMATIONS,
  fadeInAnimatedValues,
  fadeOutAnimateValues,
} from "./animtions";

export type SectionsPropsType = {
  location: LocationType;
};

const renderSectionItem = (type: string, location: LocationType) => {
  switch (type) {
    case SECTIONS.ALERT_SECTION:
      return <AlertSection location={location} />;
    case SECTIONS.HOUR_SECTION:
      return <HourSection location={location} />;
    case SECTIONS.DAY_SECTION:
      return <DaySection location={location} />;
  }
  return <Text>There is no such section</Text>;
};

export const Sections = ({ location }: SectionsPropsType) => {
  const { width } = Dimensions.get("window");
  const styles = styling(width);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const containerMaxHeight = React.useRef(
    new Animated.Value(ANIMATIONS.containerMaxHeight.start)
  ).current;
  const locationTranslateY = React.useRef(
    new Animated.Value(ANIMATIONS.locationTranslateY.start)
  ).current;
  const shortenDescriptionOpacity = React.useRef(
    new Animated.Value(ANIMATIONS.shortenDescriptionOpacity.start)
  ).current;
  const shortenDescriptionTransform = React.useRef(
    new Animated.Value(ANIMATIONS.shortenDescriptionTransform.start)
  ).current;
  const tempOpacity = React.useRef(
    new Animated.Value(ANIMATIONS.tempOpacity.start)
  ).current;
  const tempTransform = React.useRef(
    new Animated.Value(ANIMATIONS.tempTransform.start)
  ).current;
  const descriptionOpacity = React.useRef(
    new Animated.Value(ANIMATIONS.descriptionOpacity.start)
  ).current;
  const descriptionTransform = React.useRef(
    new Animated.Value(ANIMATIONS.descriptionTransform.start)
  ).current;

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    })(e);

    if ((scrollY as any)._value < 20) {
      fadeInAnimatedValues({
        containerMaxHeight,
        locationTranslateY,
        shortenDescriptionOpacity,
        shortenDescriptionTransform,
        tempOpacity,
        tempTransform,
        descriptionOpacity,
        descriptionTransform,
      });
      return;
    }

    fadeOutAnimateValues({
      containerMaxHeight,
      locationTranslateY,
      shortenDescriptionOpacity,
      shortenDescriptionTransform,
      tempOpacity,
      tempTransform,
      descriptionOpacity,
      descriptionTransform,
    });
  };

  const data = [
    SECTIONS.ALERT_SECTION,
    SECTIONS.HOUR_SECTION,
    SECTIONS.DAY_SECTION,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSection
        location={location}
        animatedValues={{
          containerMaxHeight,
          locationTranslateY,
          shortenDescriptionOpacity,
          shortenDescriptionTransform,
          tempOpacity,
          tempTransform,
          descriptionOpacity,
          descriptionTransform,
        }}
      />
      <FlatList
        scrollEventThrottle={5}
        style={styles.sectionList}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => renderSectionItem(item, location)}
        onScroll={handleOnScroll}
        showsVerticalScrollIndicator={false}
        snapToAlignment="center"
      />
    </SafeAreaView>
  );
};
