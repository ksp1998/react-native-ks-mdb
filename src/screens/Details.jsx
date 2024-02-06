import { ScrollView, View } from "react-native";
import { TMDB_API_BASE_URL } from "../utlils";
import { useAxios } from "../utlils/hooks";
import DetailsHero from "../components/DetailsHero";
import Cast from "../components/Cast";
import Videos from "../components/Videos";
import CardsContainerRow from "../components/CardsContainerRow";

const Details = ({ route }) => {
  const { id, mediaType } = route.params;
  const { data: videos, error } = useAxios(
    `${TMDB_API_BASE_URL}/${mediaType}/${id}/videos`
  );
  const credits = useAxios(`${TMDB_API_BASE_URL}/${mediaType}/${id}/credits`);

  return (
    <ScrollView>
      <View className="h-full bg-[#020617]">
        <DetailsHero
          trailer={videos?.results?.[0]}
          crew={credits?.data?.crew}
        />
        <Cast cast={credits.data?.cast} error={credits.error} />
        <Videos videos={videos?.results} error={error} />

        {/* Similar Video Section */}
        <CardsContainerRow
          endpoint={`${TMDB_API_BASE_URL}/movie/${id}/similar`}
          title="More Like This"
        />

        {/* Recommended Video Section */}
        <CardsContainerRow
          endpoint={`${TMDB_API_BASE_URL}/movie/${id}/recommendations`}
          title="Recommendations"
        />
      </View>
    </ScrollView>
  );
};

export default Details;
