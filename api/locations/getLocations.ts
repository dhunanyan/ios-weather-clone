import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { LocationsType } from "@/types";

export const getLocations = async (): Promise<LocationsType> => {
  const locationsCollection = collection(db, "locationsCollection");
  const snapshot = await getDocs(locationsCollection);
  const locations = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as LocationsType;
  return locations;
};
