export type ISSCoordinates = {
  iss_position: {
    latitude: string;
    longitude: string;
  };
};

export default async function getISSCoordinates(): Promise<ISSCoordinates> {
  const response = await fetch("http://api.open-notify.org/iss-now.json");

  if (!response.ok) {
    throw new Error("Could not fetch ISS coordinates");
  }

  const data = await response.json();

  return data;
}
