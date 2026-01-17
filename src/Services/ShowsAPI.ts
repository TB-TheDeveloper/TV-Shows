import type { Shows } from "../Types";
import { baseURL } from "./Library";

interface ShowsAPIProps {
  getShowsAPI: () => Promise<Shows[]>;
}

const ShowsAPI = (): ShowsAPIProps => {
  const getShowsAPI = async () => {
    const response = await fetch(`${baseURL}/shows?page=0`);

    if (!response.ok) {
      throw new Error("Failed to fetch shows");
    }

    return response.json();
  };

  return {
    getShowsAPI,
  };
};

export default ShowsAPI;
