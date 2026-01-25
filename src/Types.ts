export interface Cast {
  character: Character;
  person: Person;
  self: boolean;
  voice: boolean;
}

interface Character {
  id: number;
  url: string;
  name: string;
  image: Image;
  _links: Link;
}

interface Country {
  name: string;
  code: string;
  timezone: string;
}

interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

export interface Gallery {
  id: number;
  type: string;
  main: boolean;
  resolutions: GalleryImage;
}

interface GalleryImage {
  medium: GalleryImageSpec;
  original: GalleryImageSpec;
}

interface GalleryImageSpec {
  height: number;
  width: number;
  url: string;
}

interface Image {
  medium: string;
  original: string;
}

interface Link {
  href: string;
  name?: string;
}

interface Links {
  self: Link;
  previousepisode?: Link;
}

interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string | null;
}

interface Person {
  id: number;
  url: string;
  name: string;
  country: Country;
  birthday: string;
  deathday: string | null;
  gender: string;
  image: Image;
  updated: number;
  _links: Link;
}

interface Rating {
  average: number | null;
}

interface Schedule {
  time: string;
  days: string[];
}

export interface Show {
  _links: Links;
  averageRuntime: number | null;
  dvdCountry: Country | null;
  ended: string | null;
  externals: Externals;
  genres: string[];
  id: number;
  image: Image | null;
  language: string;
  name: string;
  network: Network | null;
  officialSite: string | null;
  premiered: string | null;
  rating: Rating;
  runtime: number | null;
  schedule: Schedule;
  status: string;
  summary: string | null;
  type: string;
  updated: number;
  url: string;
  webChannel: WebChannel | null;
  weight: number;
}

interface WebChannel {
  id: number;
  name: string;
  country: Country | null;
}
