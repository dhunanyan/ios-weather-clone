import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { LocationType } from "@/types";

export const addLocation = async (location: LocationType): Promise<void> => {
  const locationsCollection = collection(db, "locationsCollection");
  await addDoc(locationsCollection, location);
};
