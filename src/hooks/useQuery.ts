import { useMemo } from "react";
import { useLocation } from "react-router";

import { parseSearch } from "../utils/FormatUtils";

export function useQuery<TData = any>(): TData {
  const location = useLocation();

  return useMemo(() => parseSearch<TData>(location.search), [location.search]);
}
