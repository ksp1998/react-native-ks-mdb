import { useCallback, useEffect, useState } from "react";
import { TMDB_API_BASE_URL, fetchRecordFromApi } from "../utlils";
import Card from "./Card";
import { useSelector } from "react-redux";
import { FlatList, Text, View } from "react-native";

const sortByOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Less Popularity" },
  { value: "vote_average.desc", label: "High Rated" },
  { value: "vote_average.asc", label: "Low Rated" },
  {
    value: "primary_release_date.desc",
    label: "Newest/Upcoming",
  },
  { value: "primary_release_date.asc", label: "Oldest" },
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "original_title.desc", label: "Title (Z-A)" },
];

const Explore = ({ heading, mediaType }) => {
  const [data, setData] = useState({ results: Array(20).fill({}) });
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const genres = useSelector((state) => state.tmdb.genres?.[mediaType]);

  const getOptions = useCallback(() => {
    const options = {};
    if (filters?.genres && filters?.genres?.length > 0) {
      options.with_genres = filters.genres.map((genre) => genre.id).join(",");
    }
    if (filters?.sortby) {
      options.sort_by = filters.sortby.value;
    }
    return options;
  }, [filters]);

  const fetchData = useCallback(
    (pg = page) => {
      console.log(`${TMDB_API_BASE_URL}/discover/${mediaType}?page=${pg}`);
      fetchRecordFromApi(
        `${TMDB_API_BASE_URL}/discover/${mediaType}?page=${pg}`,
        getOptions()
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
            setPage(Number(page) + 1);
          } else {
            console.log(response);
          }
        })
        .catch((error) => console.log(error));
    },
    [mediaType, getOptions, page, data]
  );

  useEffect(() => {
    fetchData(1);
  }, [filters]);

  const onChange = (selected, { name }) => {
    setFilters((prev) => ({ ...prev, [name]: selected }));
    setPage(1);
  };

  return (
    <View className="h-full px-2 pb-24 bg-[#020716]">
      {/* <View className="p-8 flex flex-col justify-center gap-4">
        <MultiSelect
          isMulti
          name="genres"
          value={filters?.genres ?? []}
          closeMenuOnSelect={false}
          options={genres ?? []}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          onChange={onChange}
          placeholder="Select genres"
          className="react-select-container min-w-32"
          classNamePrefix="react-select"
        />
        <Select
          name="sortby"
          value={filters?.sortby}
          options={sortByOptions}
          onChange={onChange}
          isClearable={true}
          placeholder="Sort by"
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </View> */}

      <View className="relative">
        <Text className="text-white text-xl font-bold py-2">{heading}</Text>
        <View className="flex justify-center items-center">
          {data?.results?.length > 0 ? (
            <FlatList
              data={data?.results}
              numColumns={3}
              renderItem={({ item }) => (
                <Card record={item} mediaType={mediaType} fitToScreen={true} />
              )}
              keyExtractor={(item, index) => item?.id || index}
              onEndReached={() => fetchData()}
              onEndReachedThreshold={0.3}
            />
          ) : (
            <Text className="text-center text-2xl">
              Oops! No matching records found!
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Explore;

{
  /* <InfiniteScroll
  className="content"
  dataLength={data?.results?.length || []}
  next={fetchData}
  hasMore={page <= data?.total_pages}
  loader={<Spinner />}
>
  <View className="flex gap-2 flex-wrap justify-center gap-y-8 lg:mr-4">
    {data?.results?.map((item, index) => (
      <Card key={item.id || index} record={item} mediaType={mediaType} />
    ))}
  </View>
</InfiniteScroll> */
}
