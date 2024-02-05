import axios from "axios";
import { useEffect, useState } from "react";
import { TMDB_API_READ_ACCESS_TOKEN } from "..";

const useAxios = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
      },
      signal: controller.signal,
    };

    // fetch(endpoint, options)
    //   .then((res) => console.log("Res => ", res))
    //   .catch((err) => console.log("Err => ", err));

    axios
      .get(endpoint, options)
      .then((response) => {
        if (controller.signal.aborted) return;
        // console.log("Response => ", response);
        if (response?.data) {
          setData(response?.data);
        } else {
          setError("Invalid result fetched!");
          // console.log("Response: ", response);
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        // console.log("Error => ", error);
        setError(error.message);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint]);

  return { data, error, loading };
};

export default useAxios;
