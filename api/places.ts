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
  radius: number = 10000,
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
