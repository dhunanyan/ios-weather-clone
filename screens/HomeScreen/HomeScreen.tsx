import * as React from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getLocations } from "@/api";
import { COLORS, IMAGES } from "@/config";

import { SliderScreen } from "../SliderScreen";
import { MenuScreen } from "../MenuScreen";

import { LocationsType, LocationType } from "@/types";

import { styling } from "./styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalScreen } from "../ModalScreen";
import { Sections } from "@/components";

export const HomeScreen = () => {
  const { width, height } = Dimensions.get("window");
  const styles = styling(width, height);

  const [locations, setLocations] = React.useState<LocationsType>([]);
  const [location, setLocation] = React.useState<LocationType | null>(null);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const slideAnim = React.useRef(new Animated.Value(1)).current;
  const menuVisible = React.useRef(1);

  React.useEffect(() => {
    if (location === null) {
      return;
    }

    setModalVisible(true);
  }, [location]);

  const toggleMenu = (value: number) => {
    menuVisible.current = value;

    return Animated.timing(slideAnim, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePanResponder = React.useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (event.nativeEvent.pageX <= 50) {
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        }
        return false;
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.min(Math.max(gestureState.dx / width, 0), 1);
        slideAnim.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = 0.5;
        const toValue = gestureState.dx / width > threshold ? 1 : 0;
        toggleMenu(toValue);
      },
    });
  }, []);

  const refetch = async () => {
    const cachedData = await AsyncStorage.getItem("weather_locations");
    if (!cachedData) {
      setLocations([]);
      return;
    }

    const parsedData = JSON.parse(cachedData) as LocationsType;
    setLocations(parsedData);
  };

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const locationsData = await getLocations();

        setLocations(locationsData);
        setIsError(false);
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

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorTextContainer}>
          <Text>Something went wrong when fetching locations</Text>
        </View>
      </SafeAreaView>
    );
  }

  const offset = 12;
  const menuTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width + offset],
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <SliderScreen
          locations={locations}
          onMenuIconPress={() => toggleMenu(0)}
        />
        {menuTranslateX && (
          <MenuScreen
            setLocation={setLocation}
            refetchLocations={refetch}
            panResponder={handlePanResponder}
            onGoBackPress={() => toggleMenu(1)}
            translateXValue={menuTranslateX}
            locations={locations}
          />
        )}
      </SafeAreaView>
      <ModalScreen
        onClose={() => setModalVisible(false)}
        backgroundImageSource={IMAGES.background}
        isVisible={isModalVisible}
      >
        {location !== null && <Sections location={location} />}
      </ModalScreen>

      <Pressable
        style={styles.deleteCache}
        onPress={() =>
          (async () => {
            await AsyncStorage.clear();
          })()
        }
      >
        <Text style={styles.deleteCacheText}>Delete cache</Text>
      </Pressable>
    </GestureHandlerRootView>
  );
};
