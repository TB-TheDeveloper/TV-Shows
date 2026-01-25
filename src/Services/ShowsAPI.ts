import type { Cast, Gallery, Show } from "../Types";
import { baseURL } from "./Library";

interface ShowsAPIProps {
  getCastsAPI: (showID: number) => Promise<Cast[]>;
  getGalleryAPI: (showID: number) => Promise<Gallery[]>;
  getShowsAPI: () => Promise<Show[]>;
}

const ShowsAPI = (): ShowsAPIProps => {
  const getCastsAPI = async (showID: number) => {
    const response = await fetch(`${baseURL}/shows/${showID}/cast`);

    if (!response.ok) {
      throw new Error("Failed to fetch casts");
    }

    return response.json();
  };

  const getGalleryAPI = async (showID: number) => {
    const response = await fetch(`${baseURL}/shows/${showID}/images`);

    if (!response.ok) {
      throw new Error("Failed to fetch gallery");
    }

    return response.json();
  };

  const getShowsAPI = async () => {
    const response = await fetch(`${baseURL}/shows?page=0`);

    if (!response.ok) {
      throw new Error("Failed to fetch shows");
    }

    return response.json();
  };

  return {
    getCastsAPI,
    getGalleryAPI,
    getShowsAPI,
  };
};

export default ShowsAPI;
