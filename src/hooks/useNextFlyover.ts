import getISSOrbit from "@/api/iss-orbit";
import { predictNextFlyover } from "@/utils/iss-flyover";
import type { Coordinates } from "@/utils/iss-proximity";
import { useQuery } from "@tanstack/react-query";

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const ONE_MINUTE_MS = 60 * 1000;

export function useNextFlyover(location: Coordinates | null) {
  const { data: orbit } = useQuery({
    queryKey: ["iss-orbit"],
    queryFn: getISSOrbit,
    staleTime: SIX_HOURS_MS,
  });

  const latitude = location?.latitude.toFixed(1);
  const longitude = location?.longitude.toFixed(1);

  const { data: nextFlyover } = useQuery({
    queryKey: ["next-flyover", latitude, longitude],
    queryFn: () => predictNextFlyover(orbit!, location!),
    enabled: !!orbit && !!location,
    refetchInterval: ONE_MINUTE_MS,
  });

  return nextFlyover ?? null;
}
