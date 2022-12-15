import { useState, useEffect, useRef } from "react";
import jwtAxios from "../../util/axios/axiosInstance";

type Methods = "get" | "post";

type Props = {
  url: string;
  method?: Methods;
  variables?: Record<string, unknown>;
  lazy?: boolean;
};

const useFetch = <T,>({
  url,
  method = "get",
  variables,
  lazy = false,
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const abortController = useRef<AbortController | null>(null);

  const fetchData = async (variables?: Props["variables"]) => {
    abortController.current = new AbortController();
    try {
      const response = await jwtAxios[method](url, {
        method,
        signal: abortController.current.signal,
        ...variables,
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
        if (error.name === "AbortError" || error.name === "CanceledError") {
          console.log("fetch canceled");
        } else {
          setError(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!url) {
      return;
    }

    if (lazy) {
      return;
    }

    fetchData(variables);

    return () => {
      abortController.current && abortController.current.abort();
    };
  }, [url]);

  return {
    data,
    error,
    isLoading,
    fetchData,
  };
};

export { useFetch };
