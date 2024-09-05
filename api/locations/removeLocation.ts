import { db } from "./firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationType } from "@/types";

export const removeLocation = async (location: LocationType): Promise<void> => {
  await AsyncStorage.removeItem(`weather_menu_${location.id}`);
  await AsyncStorage.removeItem(`weather_slider_${location.id}`);

  const docRef = doc(db, "locationsCollection", location.id);
  await deleteDoc(docRef);
};
