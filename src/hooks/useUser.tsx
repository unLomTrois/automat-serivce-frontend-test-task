import { fetcher } from "../api";
import useSWR from "swr";
import { User } from "../types/User";

// hook useUser that uses api.me

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR(`/auth/me`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data as User,
    isLoading,
    isError: error,
    mutate,
  };
};
