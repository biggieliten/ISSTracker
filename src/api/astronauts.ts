export type Astronaut = {
  id: number;
  name: string;
  status: { name: string };
  agency: { name: string; addbrev: string };
  image: { image_url: string; thumbnail_url: string };
  date_of_birth: string;
  nationality: { name: string; alpha_3_code: string }[];
  bio: string;
  wiki: string;
  last_flight: string;
  first_flight: string;
};

type AstronautResponse = {
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
