import { fetcher } from "../api";
import useSWR from "swr";
import { Note } from "../types/Note";

export const useNotes = () => {
  const { data, error, isLoading, mutate } = useSWR(`/notes/me`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  return {
    data: data as Note[],
    isLoading,
    isError: error,
    mutate,
  };
};

export const useNote = (id: string) => {
  return useSWR<Note>(`/notes/${id}`, fetcher, {
    revalidateOnFocus: false,
  });
};
