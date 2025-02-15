import { Place } from "@/types/places";
import axios from "axios";

const API_KEY = "AIzaSyBZGbLTAnBvUU2TqWlS2J0cQoOzSfLXsWI";

const placesApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place",
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
      key: API_KEY,
      maxResults,
    },
  });

  if (data.status !== "OK") {
    throw new Error(data.error_message || "Error al buscar lugares");
  }

  return data.results.slice(0, maxResults);
};
