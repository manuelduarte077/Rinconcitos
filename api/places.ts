import { Place } from "@/types/places";
import axios from "axios";

const placesApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

interface PlacesResponse {
  results: Place[];
  status: string;
  error_message?: string;
}

// Tipos de lugares que queremos mostrar
const PLACE_TYPES = [
  "restaurant",
  "cafe",
  "bar",
  "food",
  "bakery",
  "meal_takeaway",
  "meal_delivery",
].join("|");

export const searchPlacesByQuery = async (
  query: string,
  latitude: number,
  longitude: number,
  radius: number = 10000,
  maxResults: number = 10
): Promise<Place[]> => {
  const { data } = await placesApi.get<PlacesResponse>("/textsearch/json", {
    params: {
      query,
      location: `${latitude},${longitude}`,
      radius,
      key: process.env.EXPO_PUBLIC_API_KEY,
      maxResults,
    },
  });

  if (data.status !== "OK") {
    throw new Error(data.error_message || "Error al buscar lugares");
  }

  return data.results.slice(0, maxResults);
};

export const getNearbyPlaces = async (
  latitude: number,
  longitude: number,
  radius: number = 10000, // 10 km
  maxResults: number = 20
): Promise<Place[]> => {
  const { data } = await placesApi.get<PlacesResponse>("/nearbysearch/json", {
    params: {
      location: `${latitude},${longitude}`,
      radius,
      key: process.env.EXPO_PUBLIC_API_KEY,
      maxResults,
    },
  });

  if (data.status !== "OK") {
    throw new Error(data.error_message || "Error al buscar lugares cercanos");
  }

  return data.results.slice(0, maxResults);
};

export const getPlaceDetails = async (placeId: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_DETAIL_API_URL}?placeid=${placeId}&key=${process.env.EXPO_PUBLIC_API_KEY}&fields=name,photos,formatted_address,rating,user_ratings_total,opening_hours,website,formatted_phone_number`
    );
    const data = await response.json();

    if (data.result) {
      const photosWithUrls =
        data.result.photos?.map((photo: { photo_reference: string }) => ({
          url: getPhotoUrl(photo.photo_reference),
          reference: photo.photo_reference,
        })) || [];

      return {
        ...data.result,
        photos: photosWithUrls,
        mainPhoto: photosWithUrls[0]?.url || null,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};

export const getPhotoUrl = (photoReference: string, maxWidth: number = 400) => {
  if (!photoReference) return null;
  return `${process.env.EXPO_PUBLIC_PHOTO_API_URL}?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${process.env.EXPO_PUBLIC_API_KEY}`;
};

export const getCityFromPlace = (
  place: Place
): { city: string; fullAddress: string } => {
  let city = "";
  let fullAddress = place.formatted_address || place.vicinity || "";

  if (place.vicinity) {
    city = place.vicinity.split(",").pop()?.trim() || "";
  } else if (place.formatted_address) {
    const addressParts = place.formatted_address.split(",");
    city = addressParts[addressParts.length - 2]?.trim() || "";
  }

  return { city, fullAddress };
};

export const getNearbyPlacesGoogle = async (
  latitude: number,
  longitude: number,
  radius: number = 10000 // 10 km
) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${PLACE_TYPES}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}&rankby=rating`
    );
    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((place: any) => ({
      ...place,
      mainPhoto: place.photos?.[0]
        ? getPhotoUrl(place.photos[0].photo_reference)
        : null,
      location: place.geometry?.location || { lat: latitude, lng: longitude },
      distance: calculateDistance(
        latitude,
        longitude,
        place.geometry?.location.lat,
        place.geometry?.location.lng
      ),
    }));
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return [];
  }
};

// Función auxiliar para calcular la distancia entre dos puntos
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => (value * Math.PI) / 180;

export const searchPlacesByQueryGoogle = async (
  query: string,
  latitude: number,
  longitude: number
) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${latitude},${longitude}&radius=1500&type=${PLACE_TYPES}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching places:", error);
    return [];
  }
};
