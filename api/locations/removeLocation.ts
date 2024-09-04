import { db } from "./firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationsType, LocationType } from "@/types";

export const removeFromAsyncStorage = async (
  location: LocationType
): Promise<void> => {
  const locations = await AsyncStorage.getItem("weather_locations");
  const filteredLocations = (
    JSON.parse(locations as string) as LocationsType
  ).filter((currentLocation) => currentLocation.id !== location.id);

  // Remove root point of the data
  await AsyncStorage.setItem(
    "weather_locations",
    JSON.stringify(filteredLocations)
  );

  // Remove other related items
  await AsyncStorage.removeItem(`weather_menu_${location.id}`);
  await AsyncStorage.removeItem(`weather_slider_${location.id}`);
};

export const removeLocation = async (location: LocationType): Promise<void> => {
  await removeFromAsyncStorage(location);

  const docRef = doc(db, "locationsCollection", location.id);
  await deleteDoc(docRef);
};
