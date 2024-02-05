import axios from "axios";

export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
// export const TMDB_API_KEY = "b0b6941e17bec799570e306394e6f5e8";
export const TMDB_API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGI2OTQxZTE3YmVjNzk5NTcwZTMwNjM5NGU2ZjVlOCIsInN1YiI6IjY1OWFmODg2MTU5NTlmMDBlZTA5MTczYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DUTR_UFXbDv9fY4vGMxjMBVj2LAsQj_sNfrtwdwoJA8";

export const fetchRecordFromApi = async (endpoint, params) => {
  try {
    const { data } = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
      },
      params,
    });
    return data;
  } catch (error) {
    return error;
  }
};
