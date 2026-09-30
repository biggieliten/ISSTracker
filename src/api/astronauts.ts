export type SocialMediaLink = {
  id: number;
  url: string;
  social_media: {
    id: number;
    name: string;
    url: string;
    logo: { image_url: string; thumbnail_url: string } | null;
  };
};

export type Astronaut = {
  id: number;
  name: string;
  status: { name: string };
  type: { name: string } | null;
  agency: { name: string; abbrev: string; type: { name: string } | null };
  image: { image_url: string; thumbnail_url: string };
  in_space: boolean;
  time_in_space: string | null;
  eva_time: string | null;
  age: number | null;
  date_of_birth: string | null;
  date_of_death: string | null;
  nationality: {
    name: string;
    alpha_2_code: string;
    alpha_3_code: string;
    nationality_name: string;
  }[];
  bio: string | null;
  wiki: string | null;
  last_flight: string | null;
  first_flight: string | null;
  social_media_links: SocialMediaLink[];
  flights_count: number | null;
  landings_count: number | null;
  spacewalks_count: number | null;
};

export type AstronautResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Astronaut[];
};

export async function getAstronautsInSpaceNow(): Promise<AstronautResponse> {
  const res = await fetch(
    "https://ll.thespacedevs.com/2.3.0/astronauts/?in_space=true&limit=100",
  );

  if (!res.ok) {
    throw new Error("Could not fetch astrounauts.");
  }
  console.log(res);

  return res.json();
}
