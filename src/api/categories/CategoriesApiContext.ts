import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { CategoriesApi } from "./CategoriesApi";

interface Props {
  readonly CategoriesApi: CategoriesApi;
}

export function useCategoriesApiContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new CategoriesApi(data), [data]);

  return {
    CategoriesApi: api,
  };
}