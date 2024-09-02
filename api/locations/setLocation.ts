import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { LocationType } from "@/types";

export const setLocation = async (location: LocationType): Promise<void> => {
  const locationDoc = doc(db, "locationsCollection", location.id);
  await setDoc(locationDoc, location);
};
