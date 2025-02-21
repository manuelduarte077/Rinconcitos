import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert, Linking, Platform } from "react-native";
import { Coordinates } from "../types/places";

export const useLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openSettings = async () => {
    try {
      if (Platform.OS === "android") {
        await Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      console.error("Error opening settings:", error);
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos acceso a tu ubicación para mostrar lugares cercanos.",
          [
            { text: "Abrir Configuración", onPress: openSettings },
            { text: "Cancelar", style: "cancel" },
          ]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error requesting permission:", error);
      return false;
    }
  };

  const getCurrentLocation = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setErrorMsg(null);

      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert(
          "Ubicación desactivada",
          "Por favor activa la ubicación de tu dispositivo",
          [
            { text: "Abrir Configuración", onPress: openSettings },
            { text: "Cancelar", style: "cancel" },
          ]
        );
        setErrorMsg("La ubicación está desactivada");
        return;
      }

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setErrorMsg("Permiso de ubicación denegado");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMsg("No se pudo obtener la ubicación");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const refreshLocation = () => {
    if (!isLoading) {
      getCurrentLocation();
    }
  };

  return {
    location,
    errorMsg,
    isLoading,
    refreshLocation,
  };
};
