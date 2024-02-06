import { useCallback, useEffect, useState } from "react";
import { TMDB_API_BASE_URL, fetchRecordFromApi } from "../utlils";
import Card from "./Card";
import { Text, TextInput, View, FlatList } from "react-native";

const ExploreSearch = () => {
  const [data, setData] = useState({ results: [] });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchData = useCallback(
    (pg = page) => {
      fetchRecordFromApi(
        `${TMDB_API_BASE_URL}/search/multi?query=${search}&page=${pg}`
      )
        .then((response) => {
          if (response?.results) {
            if (pg > 1) {
              setData({
                ...data,
                results: [...data.results, ...response.results],
              });
            } else {
              setData(response);
            }
            setPage(Number(pg) + 1);
          } else {
            console.log(response);
          }
        })
        .catch((error) => console.log(error));
    },
    [search, page, data]
  );

  useEffect(() => {
    fetchData(1);
  }, [search]);

  return (
    <View className="h-full px-2 pb-24 bg-[#020716]">
      <View className="p-4 flex flex-col items-center gap-5">
        <View className="w-full flex justify-center relative rounded-md overflow-hidden">
          <TextInput
            type="search"
            className="w-full px-6 py-4 text-white text-lg bg-gray-800 outline-none z-10"
            placeholder="Search movies, tv shows..."
            value={search}
            onChangeText={(text) => setSearch(text.trimStart())}
            placeholderTextColor="#CFCFCF"
          />
        </View>
        {search && (
          <Text className="text-white text-lg">
            You searched for: <Text className="font-bold">{search}</Text>
          </Text>
        )}
      </View>

      <View className="relative p-2">
        <>
          {data?.results?.length > 0 ? (
            <FlatList
              data={data?.results}
              numColumns={3}
              renderItem={({ item }) => (
                <Card record={item} fitToScreen={true} />
              )}
              keyExtractor={(item, index) => item?.id || index}
              onEndReached={() => fetchData()}
              onEndReachedThreshold={0.3}
            />
          ) : (
            <Text className="text-white text-center text-2xl">
              Oops! No matching records found!
            </Text>
          )}
        </>
      </View>
    </View>
  );
};

export default ExploreSearch;
