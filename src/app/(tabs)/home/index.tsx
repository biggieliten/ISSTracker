import {
  Astronaut,
  getAstronautsInSpaceNow,
} from "@/api/astronauts";
import AstronautRow from "@/components/astronaut-row";
import {
  BorderWidth,
  FontSize,
  FontWeight,
  IconSize,
  LetterSpacing,
  LineHeight,
  Radius,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { Orbit } from "lucide-react-native";
import { Fragment } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

const getAgencyLabel = (astronaut: Astronaut) =>
  astronaut.agency.abbrev || astronaut.agency.name;

export default function HomeScreen() {
  const { colors } = useTheme();
  const { data, refetch, isPending, isError, error } = useQuery({
    queryKey: ["astronauts"],
    queryFn: getAstronautsInSpaceNow,
    staleTime: THREE_HOURS_MS,
  });

  if (isError) console.log("Error", error);

  if (isPending) {
    return (
      <View style={[s.pending, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[s.pending, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Could not load astronauts.</Text>
        <Pressable onPress={() => refetch()}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  // Every agency that has someone in space, each listed once, in alphabetical order
  const agencies = Array.from(new Set(data.results.map(getAgencyLabel))).sort();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[s.root, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          s.countCard,
          { backgroundColor: colors.surface, borderLeftColor: colors.primary },
        ]}
      >
        <View style={s.countText}>
          <Text style={[s.countLabel, { color: colors.textSecondary }]}>
            PEOPLE IN SPACE
          </Text>
          <Text style={[s.countValue, { color: colors.text }]}>
            {data.count}
          </Text>
          <Text style={[s.countSub, { color: colors.textSecondary }]}>
            Orbiting Earth right now
          </Text>
        </View>
        <View style={[s.countIcon, { backgroundColor: colors.primaryMuted }]}>
          <Orbit size={IconSize.lg} color={colors.primary} />
        </View>
      </View>

      {agencies.map((agency) => {
        const crew = data.results.filter(
          (astronaut) => getAgencyLabel(astronaut) === agency,
        );

        return (
          <Fragment key={agency}>
            <Text style={[s.sectionLabel, { color: colors.textSecondary }]}>
              {agency.toUpperCase()} · {crew.length}
            </Text>

            {crew.map((astronaut) => (
              <AstronautRow key={astronaut.id} astronaut={astronaut} />
            ))}
          </Fragment>
        );
      })}

      {/* {astronauts.results.map((astronaut: Astronaut) => (
        <AstronautRow key={astronaut.id} astronaut={astronaut} />
      ))} */}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    width: "100%",
    flexGrow: 1,
    paddingHorizontal: 6,
  },
  pending: {
    flex: 1,
    paddingTop: 20,
  },
  countCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: Radius.lg,
    borderLeftWidth: BorderWidth.accent,
    padding: 20,
    marginTop: 12,
  },
  countText: { gap: 2 },
  countLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.label,
  },
  countValue: {
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.display,
  },
  countSub: { fontSize: FontSize.md },
  countIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.label,
    marginTop: 20,
    marginBottom: 6,
    marginLeft: 4,
  },
});

const astronauts = {
  count: 11,
  next: "https://ll.thespacedevs.com/2.3.0/astronauts/?format=json&in_space=true&limit=10&mode=detailed&offset=10",
  previous: null,
  results: [
    {
      id: 573,
      name: "Jessica Meir",
      status: { name: "Active" },
      agency: {
        name: "National Aeronautics and Space Administration",
        addbrev: "NASA",
      },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/jessica_meir_image_20200417064900.jpeg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305190924.jpeg",
      },
      date_of_birth: "1977-07-01",
      nationality: [{ name: "United States of America", alpha_3_code: "USA" }],
      bio: "Jessica Ulrika Meir is Assistant Professor of Anesthesia at Harvard Medical School, Massachusetts General Hospital, Boston, following postdoctoral research in comparative physiology at the University of British Columbia. She has studied the diving physiology and behavior of emperor penguins in Antarctica, and the physiology of bar-headed geese, which are able to migrate over the Himalayas. In 2000, Meir graduated with a Master of Space Studies from the International Space University in Strasbourg, France. In September 2002, Meir served as an aquanaut on the NASA Extreme Environment Mission Operations 4 (NEEMO 4) crew. In June 2013 she was named an astronaut candidate by NASA, becoming one of the eight members of NASA Astronaut Group 21. She is from Caribou, Maine.",
      wiki: "https://en.wikipedia.org/wiki/Jessica_Meir",
      last_flight: "2026-02-13T10:15:56Z",
      first_flight: "2019-09-25T13:57:42Z",
    },
    {
      id: 638,
      name: "Starman",
      status: { name: "Active" },
      agency: { name: "SpaceX", addbrev: "SpX" },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/starman_image_20190307220126.jpg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305190247.jpeg",
      },
      date_of_birth: null,
      nationality: [{ name: "Unknown", alpha_3_code: "???" }],
      bio: "\"Starman\" is a mannequin dressed in a spacesuit occupying the driver's seat of Elon Musk's Tesla Roadster, launched to an heliocentric orbit on Falcon Heavy's inaugural launch.",
      wiki: "https://en.wikipedia.org/wiki/Elon_Musk%27s_Tesla_Roadster",
      last_flight: "2018-02-06T20:45:00Z",
      first_flight: "2018-02-06T20:45:00Z",
    },
    {
      id: 649,
      name: "Anna Kikina",
      status: { name: "Active" },
      agency: {
        name: "Russian Federal Space Agency (ROSCOSMOS)",
        addbrev: "RFSA",
      },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/anna_yuryevna_k_image_20200828144537.jpg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185904.jpeg",
      },
      date_of_birth: "1984-08-27",
      nationality: [{ name: "Russia", alpha_3_code: "RUS" }],
      bio: "Anna Yuryevna Kikina is a Russian engineer and test cosmonaut, selected in 2012. Kikina is assigned to Crew-5 mission which is to launch in 2022. The seat was arranged as a part of exchange agreement between Roscosmos and NASA, allowing Russian cosmonaut to fly on US vehicle while American astronaut gets a seat on Soyuz. Kikina will be the first Russian cosmonaut to fly on Crew Dragon.",
      wiki: "https://en.wikipedia.org/wiki/Anna_Kikina",
      last_flight: "2026-07-14T14:47:43Z",
      first_flight: "2022-10-05T16:00:57Z",
    },
    {
      id: 650,
      name: "Pyotr Dubrov",
      status: { name: "Active" },
      agency: {
        name: "Russian Federal Space Agency (ROSCOSMOS)",
        addbrev: "RFSA",
      },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/pyotr_dubrov_image_20201120155626.jpg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185922.jpeg",
      },
      date_of_birth: "1978-01-30",
      nationality: [{ name: "Russia", alpha_3_code: "RUS" }],
      bio: "Dubrov was selected by Roscosmos as a cosmonaut on 8 October 2012, as one of eight cosmonauts selected as part of Roscosmos's 2012 selection group. In 2020 he was assigned to the backup crew of Soyuz MS-17, backing up Russian cosmonaut Sergey Kud-Sverchkov as Flight Engineer on ISS Expedition 63/64.",
      wiki: "https://en.wikipedia.org/wiki/Pyotr_Dubrov",
      last_flight: "2026-07-14T14:47:43Z",
      first_flight: "2021-04-09T07:42:41Z",
    },
    {
      id: 712,
      name: "Jack Hathaway",
      status: { name: "Active" },
      agency: {
        name: "National Aeronautics and Space Administration",
        addbrev: "NASA",
      },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/jack_hathaway_image_20211206185407.jpg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305190331.jpeg",
      },
      date_of_birth: "1982-01-01",
      nationality: [{ name: "United States of America", alpha_3_code: "USA" }],
      bio: "Jack Hathaway is a US Navy commander from Connecticut. He earned bachelors' degrees in physics and history from the U.S. Naval Academy and completed graduate studies at Cranfield University in England and the U.S. Naval War College. A distinguished naval aviator, Hathaway flew and deployed with Navy's Strike Fighter Squadron 14 aboard the USS Nimitz and Strike Fighter Squadron 136 aboard the USS Truman. He graduated from Empire Test Pilots' School, supported the Joint Chiefs of Staff at the Pentagon, and was most recently assigned as the prospective executive officer for Strike Fighter Squadron 81. He has more than 2,500 flight hours in 30 types of aircraft, more than 500 carrier arrested landings, and flew 39 combat missions.",
      wiki: "https://en.wikipedia.org/wiki/Jack_Hathaway",
      last_flight: "2026-02-13T10:15:56Z",
      first_flight: "2026-02-13T10:15:56Z",
    },
    {
      id: 713,
      name: "Anil Menon",
      status: { name: "Active" },
      agency: {
        name: "National Aeronautics and Space Administration",
        addbrev: "NASA",
      },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/anil_menon_image_20211206185413.jpg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305190559.jpeg",
      },
      date_of_birth: "1976-01-01",
      nationality: [{ name: "United States of America", alpha_3_code: "USA" }],
      bio: "Anil Menon is a US Air Force lieutenant colonel from Minneapolis, Minnesota. He was SpaceX's first flight surgeon, helping to launch the company's first humans to space during NASA's SpaceX Demo-2 mission and building a medical organization to support the human system during future missions. Prior to that, he served NASA as the crew flight surgeon for various expeditions taking astronauts to the International Space Station. Menon is an actively practicing emergency medicine physician with fellowship training in wilderness and aerospace medicine. As a physician, he was a first responder during the 2010 earthquake in Haiti, 2015 earthquake in Nepal, and the 2011 Reno Air Show accident. In the Air Force, Menon supported the 45th Space Wing as a flight surgeon and the 173rd Fighter Wing, where he logged over 100 sorties in the F-15 fighter jet and transported over 100 patients as part of the critical care air transport team.",
      wiki: "https://en.wikipedia.org/wiki/Anil_Menon_(astronaut)",
      last_flight: "2026-07-14T14:47:43Z",
      first_flight: "2026-07-14T14:47:43Z",
    },
    {
      id: 732,
      name: "Andrei Fedyaev",
      status: { name: "Active" },
      agency: {
        name: "Russian Federal Space Agency (ROSCOSMOS)",
        addbrev: "RFSA",
      },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/andrei_fedyaev_image_20230207203113.jpg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305190412.jpeg",
      },
      date_of_birth: "1981-02-26",
      nationality: [{ name: "Russia", alpha_3_code: "RUS" }],
      bio: "Andrei Valerievich Fedyaev (Андрей Валерьевич Федяев) is a Russian cosmonaut. He was a military pilot prior to retiring from Air Force in 2013, and was selected as a cosmonaut in 2012. ISS-69 expedition will be Fedyaev's first spaceflight.",
      wiki: "https://en.wikipedia.org/wiki/Andrey_Fedyaev",
      last_flight: "2026-02-13T10:15:56Z",
      first_flight: "2023-03-02T05:34:14Z",
    },
    {
      id: 747,
      name: "Sophie Adenot",
      status: { name: "Active" },
      agency: { name: "European Space Agency", addbrev: "ESA" },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/sophie_adenot_image_20221123150954.jpg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185354.jpeg",
      },
      date_of_birth: "1982-07-05",
      nationality: [{ name: "France", alpha_3_code: "FRA" }],
      bio: "Between 2001 and 2003, Sophie studied engineering and graduated from ISAE-SUPAERO in Toulouse, France, where she specialised in spacecraft and aircraft flight dynamics. She then completed a Master of Science in human factors engineering at MIT in Boston, USA, in 2004. In 2005, Sophie joined the French Air Force for her basic military training and initial flying training to become a helicopter pilot. In 2018, she graduated with honours as a helicopter test pilot from the Empire Test Pilots' School in Boscombe Down, UK. She was awarded the Mac Kenna trophy and the Patuxtent Shield. Between 2019 and 2022, Sophie worked as a helicopter experimental test pilot in Cazaux Flight Test Center with DGA. She has logged 3000 hours and flew on 22 different helicopter types. She also holds a military parachute license, a light aircraft pilot license and a glider pilot license.",
      wiki: "https://en.wikipedia.org/wiki/Sophie_Adenot",
      last_flight: "2026-02-13T10:15:56Z",
      first_flight: "2026-02-13T10:15:56Z",
    },
    {
      id: 764,
      name: "Zhu Yangzhu",
      status: { name: "Active" },
      agency: { name: "China National Space Administration", addbrev: "CNSA" },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/yangzhu_zhu_image_20230530052559.jpeg",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185258.jpeg",
      },
      date_of_birth: "1986-09-01",
      nationality: [{ name: "China", alpha_3_code: "CHN" }],
      bio: "Zhu Yangzhu is a Chinese pilot and astronaut selected as part of the Shenzhou program. He enlisted in the People's Liberation Army (PLA) in September 2005, and joined the Chinese Communist Party (CCP) in December 2006.",
      wiki: "https://en.wikipedia.org/wiki/Zhu_Yangzhu",
      last_flight: "2026-05-24T15:08:36Z",
      first_flight: "2023-05-30T01:31:10Z",
    },
    {
      id: 916,
      name: "Zhang Zhiyuan",
      status: { name: "Active" },
      agency: { name: "China National Space Administration", addbrev: "CNSA" },
      image: {
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/zhang_zhiyuan_o_image_20260524125922.png",
        thumbnail_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/zhang_zhiyuan_o_image_thumbnail_20260524125922.png",
      },
      date_of_birth: "1986-06-01",
      nationality: [{ name: "China", alpha_3_code: "CHN" }],
      bio: "Zhang Zhiyuan is a Chinese astronaut selected as part of the Shenzhou program. He enlisted in the People's Liberation Army (PLA) Air Force in September 2006, and joined the Chinese Communist Party (CCP) in March 2011. He was a pilot at the People's Liberation Army Air Force (PLAAF) prior to joining the astronaut corps.",
      wiki: null,
      last_flight: "2026-05-24T15:08:36Z",
      first_flight: "2026-05-24T15:08:36Z",
    },
  ],
};
