// import axios from "axios";

import { Alert } from "react-native";

export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

// export const fetchRecordFromApi = async (endpoint, params) => {
//   try {
//     const { data } = await axios.get(endpoint, {
//       headers: {
//         Authorization: `Bearer ${
//           import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
//         }`,
//       },
//       params,
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

export const scrollToTop = () => {
  Alert.alert("ToDo", "scroll to top of the screen!");
  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });
};
