import React from "react";
import { Text, View } from "react-native";

import { MainSectionDataType } from "../types";
import { styles } from "./styles";

export type MainSectionPropsType = {
  data: MainSectionDataType;
};

export const MainSection = ({ data }: MainSectionPropsType) => (
  <View style={styles.container}>
    <Text style={styles.location}>{data.location}</Text>
    <Text style={styles.temp}>{data.temp}°</Text>
    <Text style={styles.conditions}></Text>
    <Text style={styles.range}>
      From {data.minTemp}° to {data.maxTemp}° - {data.conditions}
    </Text>
    <View style={styles.line} />
    <Text style={styles.description}>{data.description}</Text>
  </View>
);
