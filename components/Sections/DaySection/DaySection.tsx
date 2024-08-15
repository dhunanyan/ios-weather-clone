import { FlatList, Image, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { DaySectionDataType } from "../types";
import { styles, sliderStyling } from "./styles";
import { ICONS } from "@/config";

export type DaySectionPropsType = {
  data: DaySectionDataType;
};

export const DaySection = ({ data }: DaySectionPropsType) => (
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
