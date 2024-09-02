import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  StatusBar,
  Text,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Footer } from "@/components/Footer";
import { Sections } from "@/components/Sections";

import { COLORS, FOOTER_HEIGHT, IMAGES } from "@/config";
import { LocationsType, LocationType } from "@/types";
import { styling } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocations } from "@/api";
import { getUserLocation } from "@/api/locations/getUserLocation";

export const HomeScreen = () => {
  const [locations, setLocations] = useState<LocationsType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [activeSlideId, setActiveSlideId] = useState("london");
  const ref: React.LegacyRef<FlatList> = useRef(null);
  const { width, height } = Dimensions.get("window");

  const styles = styling(width, height);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken<LocationType>> }) => {
      if (viewableItems[0] === undefined) {
        return;
      }

      setActiveSlideId(viewableItems[0].item.id);
    },
    []
  );

  const handleButtonPress = (index: number) => {
    if (ref === null || ref.current === null) {
      return;
    }

    ref.current.scrollToIndex({ animated: true, index });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const cachedData = await AsyncStorage.getItem("weather_locations");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData) as LocationsType;
          setLocations(parsedData);
          setIsLoading(false);
          setIsError(false);
          return;
        }
        const locationsData = await getLocations();

        const userLocation = await getUserLocation();

        if (userLocation !== null) {
          locationsData.unshift({
            id: "CURRENT_LOCATION",
            name: userLocation,
            displayName: "Current Location",
          });
        }

        await AsyncStorage.setItem(
          "weather_locations",
          JSON.stringify(locationsData)
        );

        setLocations(locationsData);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorTextContainer}>
          <Text>Something went wrong when fetching locations</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.dark.background} />
      <ImageBackground
        source={IMAGES.background}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <FlatList
          style={{ height: "100%" }}
          data={locations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            height: height - FOOTER_HEIGHT,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Sections location={item} />}
          horizontal
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          ref={ref}
        />
        <Footer
          activeSlideId={activeSlideId}
          buttons={locations.map((slide) => slide.id)}
          onButtonPress={handleButtonPress}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
