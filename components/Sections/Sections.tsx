import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from "react-native";

import { getWeather } from "@/api";

import { HourSection } from "./HourSection";
import { MainSection } from "./MainSection";
import { DaySection } from "./DaySection";

import { getSections, SECTION_TYPES } from "./helpers";
import { COLORS } from "@/config";

import type {
  DaySectionDataType,
  HourSectionDataType,
  MainSectionDataType,
  SectionDataType,
} from "./types";
import type { WeatherType } from "@/types";
import { styles } from "./styles";

export type SectionsPropsType = {
  location: string;
};

const renderSectionItem = (data: SectionDataType, type: string) => {
  switch (type) {
    case SECTION_TYPES.MAIN_SECTION:
      return <MainSection data={data as MainSectionDataType} />;
    case SECTION_TYPES.HOUR_SECTION:
      return <HourSection data={data as HourSectionDataType} />;
    case SECTION_TYPES.DAY_SECTION:
      return <DaySection data={data as DaySectionDataType} />;
  }
  return <View>There is no such section</View>;
};

export const Sections = ({ location }: SectionsPropsType) => {
  const [data, setData] = useState<WeatherType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = (await getWeather(location)) as WeatherType;
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={COLORS.dark.title} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError || data === null) {
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
        <SectionList
          showsVerticalScrollIndicator={false}
          style={styles.sectionList}
          sections={getSections(data)}
          renderItem={({ section: { data, type } }) =>
            renderSectionItem(data[0], type)
          }
        />
      </View>
    </SafeAreaView>
  );
};
