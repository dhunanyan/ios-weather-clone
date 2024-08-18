import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getWeather } from "@/api";

import { HourSection } from "./HourSection";
import { DynamicHeader } from "./DynamicHeader";
import { DaySection } from "./DaySection";

import { parseSections, parseToDynamicHeader, SECTION_TYPES } from "./helpers";
import { COLORS } from "@/config";

import type {
  DaySectionDataType,
  DynamicHeaderDataType,
  HourSectionDataType,
  SectionDataType,
  SectionsType,
} from "./types";
import type { WeatherType } from "@/types";
import { styles } from "./styles";

export type SectionsPropsType = {
  location: string;
};

const renderSectionItem = (data: SectionDataType, type: string) => {
  switch (type) {
    case SECTION_TYPES.HOUR_SECTION:
      return <HourSection data={data as HourSectionDataType} />;
    case SECTION_TYPES.DAY_SECTION:
      return <DaySection data={data as DaySectionDataType} />;
  }
  return <View>There is no such section</View>;
};

export const Sections = ({ location }: SectionsPropsType) => {
  const [sections, setSections] = useState<SectionsType | []>([]);
  const [header, setHeader] = useState<DynamicHeaderDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const cachedData = await AsyncStorage.getItem(`weather_${location}`);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData) as {
            header: DynamicHeaderDataType;
            sections: SectionsType;
          };
          setSections(parsedData.sections);
          setHeader(parsedData.header);
          setIsLoading(false);
          console.log("LOL");
          return;
        }

        const response = (await getWeather(location)) as WeatherType;
        const headerData = parseToDynamicHeader(response);
        const sectionsData = parseSections(response);

        await AsyncStorage.setItem(
          `weather_${location}`,
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
      <View>
        <DynamicHeader animatedValue={scrollY} data={header} />
        <SectionList
          scrollEventThrottle={5}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          showsVerticalScrollIndicator={false}
          style={styles.sectionList}
          sections={sections}
          renderItem={({ section: { data, type } }) =>
            renderSectionItem(data[0], type)
          }
        />
      </View>
    </SafeAreaView>
  );
};
