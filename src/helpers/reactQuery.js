import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import objectUtils from "./objectUtils";

const useCustomMutation = (
  createApi,
  queryKey,
  onSuccess,
  onError,
  shouldToast = true,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => createApi(body),
    onError: (err) => {
      toast.error(err.response.data.message);
      if (onError) onError(err);
    },
    onSuccess: (res, body) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (shouldToast) toast.success("Successful");
      if (onSuccess) onSuccess(res, body);
    },
  });
};

const useCustomQuery = (
  queryKey,
  options,
  getApi,
  initialData,
  enabled = true,
) =>
  useQuery({
    queryKey: [queryKey, objectUtils.cleanEmpty(options)],
    queryFn: () => getApi(options),
    enabled,
    ...(initialData && { initialData }),
  });

const useCustomPrefetchQuery = async (queryClient, queryKey, options, getApi) =>
  queryClient.prefetchQuery({
    queryKey: [queryKey, objectUtils.cleanEmpty(options)],
    queryFn: () => getApi(options),
  });

const useCustomPrefetchOneQuery = async (
  queryClient,
  queryKey,
  id,
  getApi,
  subId,
) => {
  const result = { notFound: false, data: {} };
  await queryClient.prefetchQuery({
    queryKey: [queryKey, { id, ...(subId && { subId }) }],
    queryFn: () =>
      getApi(id, subId)
        .then((data) => {
          result.data = data;
          return data;
        })
        .catch((e) => {
          result.notFound = e.response.data.code === 404;
          return {};
        }),
  });
  return result;
};

const useCustomFetchQuery = async (queryClient, queryKey, options, getApi) =>
  queryClient.fetchQuery({
    queryKey: [queryKey, objectUtils.cleanEmpty(options)],
    queryFn: () => getApi(options),
  });

const useCustomInfiniteQuery = (
  queryKey,
  options,
  getApi,
  initialData,
  enabled = true,
) =>
  useInfiniteQuery({
    queryKey: [queryKey, objectUtils.cleanEmpty(options)],
    queryFn: async ({ pageParam = 1 }) => {
      console.log("pageParam", pageParam);
      const res = await getApi({ page: pageParam, ...options });
      res.page = pageParam;
      return res;
    },
    enabled,
    ...(initialData && { initialData }),
    getNextPageParam: (_, pages, lastPage) => {
      if (lastPage < pages) return lastPage + 1;
      return undefined;
    },
  });

const useCustomPrefetchInfiniteQuery = async (
  queryClient,
  queryKey,
  options,
  getApi,
) =>
  queryClient.prefetchInfiniteQuery({
    queryKey: [queryKey, objectUtils.cleanEmpty(options)],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getApi({
        page: pageParam,
        ...objectUtils.cleanEmpty(options),
      });
      res.page = pageParam;
      return res;
    },
    getNextPageParam: (_, pages, lastPage) => {
      if (lastPage < pages) return lastPage + 1;
      return undefined;
    },
  });

export default {
  useCustomMutation,
  useCustomQuery,
  useCustomPrefetchQuery,
  useCustomPrefetchOneQuery,
  useCustomFetchQuery,
  useCustomInfiniteQuery,
  useCustomPrefetchInfiniteQuery,
};
