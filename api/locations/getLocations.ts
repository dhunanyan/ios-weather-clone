import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { LocationsType } from "@/types";
import { getUserLocation } from "./getUserLocation";

export const getLocations = async (): Promise<LocationsType> => {
  const locationsCollection = collection(db, "locationsCollection");
  const snapshot = await getDocs(locationsCollection);
  const locations = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as LocationsType;

  const userLocation = await getUserLocation();
  if (userLocation !== null) {
    locations.unshift({
      id: "CURRENT_LOCATION",
      name: userLocation,
      displayText: "Current Location",
    });
  }

  return locations;
};
