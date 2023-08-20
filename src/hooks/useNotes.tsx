import { fetcher } from "../api";
import useSWR from "swr";
import { Note } from "../types/Note";

// hook useUser that uses api.me

export const useNotes = () => {
  const { data, error, isLoading, mutate } = useSWR(`/notes/me`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data as Note[],
    isLoading,
    isError: error,
    mutate,
  };
};
