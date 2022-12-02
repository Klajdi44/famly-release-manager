import { useState, useEffect } from "react";

type Props = {
  url: string;
  method?: string;
  body?: any;
};
const useFetch = <T,>({ url, method = "GET", body }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }
    const abortController = new AbortController();

    (async () => {
      try {
        const request = await fetch(url, {
          method,
          signal: abortController.signal,
          credentials: "include",
          body,
        });

        if (!request.ok) {
          setIsLoading(false);
          throw new Error("Something went wrong while fetching data");
        }

        const data = await request.json();

        if (data) {
          setError(null);
          setIsLoading(false);
          setData(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("fetch canceled");
          } else {
            console.log("Unexpected error", error);
            setIsLoading(false);
            setError(error.message);
          }
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