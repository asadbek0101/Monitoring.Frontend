import { useMemo } from "react";

import { useApiBase } from "../ApiContext";
import { RegionCategoriesApi } from "./RegionCategoriesApi";

interface Props {
  readonly RegionCategoriesApi: RegionCategoriesApi;
}

export function useRegionCateogriesContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new RegionCategoriesApi(data), [data]);

  return {
    RegionCategoriesApi: api,
  };
}