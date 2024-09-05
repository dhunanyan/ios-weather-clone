import { AnimatedValuesType } from "@/types";
import { Animated } from "react-native";

export const ANIMATIONS = {
  containerMaxHeight: { start: 250, end: 50 },
  locationTranslateY: { start: 25, end: 0 },
  shortenDescriptionOpacity: { start: 0, end: 1 },
  shortenDescriptionTransform: { start: 15, end: 0 },
  tempOpacity: { start: 1, end: 0 },
  tempTransform: { start: 20, end: -5 },
  descriptionOpacity: { start: 1, end: 0 },
  descriptionTransform: { start: 15, end: -20 },
};

export const fadeInAnimatedValues = ({
  containerMaxHeight,
  locationTranslateY,
  shortenDescriptionOpacity,
  shortenDescriptionTransform,
  tempOpacity,
  tempTransform,
  descriptionOpacity,
  descriptionTransform,
}: AnimatedValuesType) => {
  Animated.parallel([
    Animated.timing(containerMaxHeight, {
      toValue: ANIMATIONS.containerMaxHeight.start,
      duration: 80,
      useNativeDriver: false,
    }),
    Animated.timing(descriptionOpacity, {
      toValue: ANIMATIONS.descriptionOpacity.start,
      duration: 80,
      useNativeDriver: false,
    }),
    Animated.timing(descriptionTransform, {
      toValue: ANIMATIONS.descriptionTransform.start,
      duration: 60,
      useNativeDriver: false,
    }),
  ]).start(() => {
    Animated.parallel([
      Animated.timing(tempOpacity, {
        toValue: ANIMATIONS.tempOpacity.start,
        duration: 80,
        useNativeDriver: false,
      }),
      Animated.timing(tempTransform, {
        toValue: ANIMATIONS.tempTransform.start,
        duration: 60,
        useNativeDriver: false,
      }),
    ]).start(() => {
      Animated.timing(locationTranslateY, {
        toValue: ANIMATIONS.locationTranslateY.start,
        duration: 50,
        useNativeDriver: false,
      }).start(() => {
        Animated.parallel([
          Animated.timing(shortenDescriptionTransform, {
            toValue: ANIMATIONS.shortenDescriptionTransform.start,
            duration: 50,
            useNativeDriver: false,
          }),
          Animated.timing(shortenDescriptionOpacity, {
            toValue: ANIMATIONS.shortenDescriptionOpacity.start,
            duration: 50,
            useNativeDriver: false,
          }),
        ]).start();
      });
    });
  });
};

export const fadeOutAnimateValues = ({
  containerMaxHeight,
  locationTranslateY,
  shortenDescriptionOpacity,
  shortenDescriptionTransform,
  tempOpacity,
  tempTransform,
  descriptionOpacity,
  descriptionTransform,
}: AnimatedValuesType) => {
  Animated.parallel([
    Animated.timing(containerMaxHeight, {
      toValue: ANIMATIONS.containerMaxHeight.end,
      duration: 60,
      useNativeDriver: false,
    }),
    Animated.timing(descriptionOpacity, {
      toValue: ANIMATIONS.descriptionOpacity.end,
      duration: 50,
      useNativeDriver: false,
    }),
    Animated.timing(descriptionTransform, {
      toValue: ANIMATIONS.descriptionTransform.end,
      duration: 50,
      useNativeDriver: false,
    }),
  ]).start(() => {
    Animated.parallel([
      Animated.timing(tempOpacity, {
        toValue: ANIMATIONS.tempOpacity.end,
        duration: 30,
        useNativeDriver: false,
      }),
      Animated.timing(tempTransform, {
        toValue: ANIMATIONS.tempTransform.end,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start(() => {
      Animated.timing(locationTranslateY, {
        toValue: ANIMATIONS.locationTranslateY.end,
        duration: 50,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(shortenDescriptionOpacity, {
          toValue: ANIMATIONS.shortenDescriptionOpacity.end,
          duration: 70,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(shortenDescriptionTransform, {
            toValue: ANIMATIONS.shortenDescriptionTransform.end,
            duration: 50,
            useNativeDriver: false,
          }).start();
        });
      });
    });
  });
};
