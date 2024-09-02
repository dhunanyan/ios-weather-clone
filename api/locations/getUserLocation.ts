import * as Location from "expo-location";

export const getUserLocation = async (): Promise<string | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access location was denied");
      return "CURRENT_LOCATION";
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});

    const [address] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (address === undefined) {
      return null;
    }

    return address.city;
  } catch (e) {
    console.error("Error get user location: ", e);
    return null;
  }
};
