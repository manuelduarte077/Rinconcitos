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

const PLACE_TYPES = ["restaurant", "cafe", "food", "bakery"].join("|");

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
      type: PLACE_TYPES,
      key: process.env.EXPO_PUBLIC_API_KEY,
      maxResults,
    },
  });

  if (data.status !== "OK") {
    throw new Error(data.error_message || "Error al buscar lugares");
  }

  const filteredResults = data.results.filter((place) =>
    place.types.some(
      (type) =>
        type === "restaurant" ||
        type === "cafe" ||
        type === "food" ||
        type === "bakery"
    )
  );

  return filteredResults.slice(0, maxResults);
};

export const getNearbyPlaces = async (
  latitude: number,
  longitude: number,
  radius: number = 10000,
  maxResults: number = 20
): Promise<Place[]> => {
  const { data } = await placesApi.get<PlacesResponse>("/nearbysearch/json", {
    params: {
      location: `${latitude},${longitude}`,
      radius,
      type: PLACE_TYPES,
      key: process.env.EXPO_PUBLIC_API_KEY,
      maxResults,
    },
  });

  if (data.status !== "OK") {
    throw new Error(data.error_message || "Error al buscar lugares cercanos");
  }

  const filteredResults = data.results.filter((place) =>
    place.types.some(
      (type) =>
        type === "restaurant" ||
        type === "cafe" ||
        type === "food" ||
        type === "bakery"
    )
  );

  return filteredResults.slice(0, maxResults);
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
