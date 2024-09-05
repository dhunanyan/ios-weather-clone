import * as React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { DaySectionDataType, LocationType } from "@/types";
import { styles, sliderStyling } from "./styles";
import { COLORS, ICONS } from "@/config";
import { getDaySectionData } from "@/api";

export type DaySectionPropsType = {
  location: LocationType;
};

export const DaySection = ({ location }: DaySectionPropsType) => {
  const [data, setData] = React.useState<DaySectionDataType | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const daySectionData = await getDaySectionData(location);

        setData(daySectionData);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={COLORS.dark.title} />
        </View>
      </View>
    );
  }

  if (isError || data === null) {
    return (
      <View style={styles.container}>
        <View style={styles.errorTextContainer}>
          <Text>Something went wrong</Text>
        </View>
      </View>
    );
  }

  return (
    <BlurView intensity={50} style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.line} />
      <FlatList
        data={data.days}
        style={styles.slider}
        keyExtractor={(item) => item.dateTime}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const sliderStyles = sliderStyling(
            index === 0,
            index === data.days.length - 1
          );

          return (
            <>
              <View style={sliderStyles.slide}>
                <Text style={sliderStyles.dayOfWeek}>{item.dayOfWeek}</Text>
                <View style={sliderStyles.imageContainer}>
                  <Image
                    style={sliderStyles.image}
                    source={ICONS[item.icon]}
                    resizeMode="contain"
                  />
                </View>
                <View style={sliderStyles.range}>
                  <Text style={sliderStyles.minTemp}>{item.minTemp}°</Text>
                  <LinearGradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={[
                      `rgba(247, ${item.minTemp * 15}, 1, 1))`,
                      `rgba(247, ${item.maxTemp * 3}, 1, 1)`,
                    ]}
                    style={sliderStyles.progressBar}
                  />
                  <Text style={sliderStyles.maxTemp}>{item.maxTemp}°</Text>
                </View>
              </View>
              {index !== data.days.length - 1 && <View style={styles.line} />}
            </>
          );
        }}
      />
    </BlurView>
  );
};
