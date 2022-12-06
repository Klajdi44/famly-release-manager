import { useState, useEffect } from "react";
import jwtAxios from "../../util/axios/axiosInstance";

type Methods = "get" | "post" | "put" | "delete";

type Props = {
  url: string;
  method?: Methods;
  body?: any;
};

const useFetch = <T,>({ url, method = "get", body }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      return;
    }
    const abortController = new AbortController();

    (async () => {
      try {
        const response = await jwtAxios[method](url, {
          method,
          signal: abortController.signal,
          data: body,
        });

        if (response.status !== 200) {
          setIsLoading(false);
          throw new Error("Something went wrong while fetching data");
        }

        if (response.data) {
          setError(null);
          setIsLoading(false);
          setData(response.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("fetch canceled");
          }
          setIsLoading(false);
          setError(error.message);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return {
    data,
    error,
    isLoading,
  };
};

export { useFetch };
