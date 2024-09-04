import React from "react";
import {
  ActivityIndicator,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getWeather } from "@/api";

import { DynamicHeader } from "./DynamicHeader";
import { AlertSection } from "./AlertSection";
import { HourSection } from "./HourSection";
import { DaySection } from "./DaySection";

import { parseSections, parseToDynamicHeader } from "./parser";
import { COLORS } from "@/config";

import {
  AlertSectionDataType,
  SECTION_TYPES,
  type DaySectionDataType,
  type DynamicHeaderDataType,
  type HourSectionDataType,
  type SectionDataType,
  type SectionsType,
} from "./types";
import type { LocationType, WeatherType } from "@/types";

import { styles } from "./styles";

export type SectionsPropsType = {
  location: LocationType;
};

const ANIMATIONS = {
  containerMaxHeight: { start: 250, end: 50 },
  locationTranslateY: { start: 25, end: 0 },
  shortenDescriptionOpacity: { start: 0, end: 1 },
  shortenDescriptionTransform: { start: 10, end: 0 },
  tempOpacity: { start: 1, end: 0 },
  tempTransform: { start: 20, end: -5 },
  descriptionOpacity: { start: 1, end: 0 },
  descriptionTransform: { start: 15, end: -20 },
};

const renderSectionItem = (data: SectionDataType, type: string) => {
  switch (type) {
    case SECTION_TYPES.ALERT_SECTION:
      return <AlertSection data={data as AlertSectionDataType} />;
    case SECTION_TYPES.HOUR_SECTION:
      return <HourSection data={data as HourSectionDataType} />;
    case SECTION_TYPES.DAY_SECTION:
      return <DaySection data={data as DaySectionDataType} />;
  }
  return <Text>There is no such section</Text>;
};

export const Sections = ({ location }: SectionsPropsType) => {
  const [sections, setSections] = React.useState<SectionsType | []>([]);
  const [header, setHeader] = React.useState<DynamicHeaderDataType | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);
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

  const fadeInAnimatedValues = () => {
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
              duration: 30,
              useNativeDriver: false,
            }),
          ]).start();
        });
      });
    });
  };

  const fadeOutAnimateValues = () => {
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

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    })(e);

    if ((scrollY as any)._value < 20) {
      fadeInAnimatedValues();
      return;
    }

    fadeOutAnimateValues();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const cachedData = await AsyncStorage.getItem(
          `weather_slider_${location.id}`
        );

        if (cachedData) {
          const parsedData = JSON.parse(cachedData) as {
            header: DynamicHeaderDataType;
            sections: SectionsType;
          };

          setSections(parsedData.sections);
          setHeader(parsedData.header);
          setIsLoading(false);
          return;
        }

        const response = (await getWeather(location.name)) as WeatherType;
        const headerData = parseToDynamicHeader(response, location);
        const sectionsData = parseSections(response);

        await AsyncStorage.setItem(
          `weather_slider_${location.id}`,
          JSON.stringify({ header: headerData, sections: sectionsData })
        );

        setSections(sectionsData);
        setHeader(headerData);

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={COLORS.dark.title} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError || sections.length === 0 || header === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorTextContainer}>
          <Text>Something went wrong</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader
        data={header}
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
      <SectionList
        scrollEventThrottle={5}
        onScroll={handleOnScroll}
        showsVerticalScrollIndicator={false}
        style={styles.sectionList}
        sections={sections}
        renderItem={({ section: { data, type } }) =>
          renderSectionItem(data[0], type)
        }
        snapToAlignment="center"
      />
    </SafeAreaView>
  );
};
