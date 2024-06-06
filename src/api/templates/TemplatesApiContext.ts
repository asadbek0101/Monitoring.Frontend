import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { TemplatesApi } from "./TemplatesApi";

interface Props {
  readonly TemplatesApi: TemplatesApi;
}

export function useTemplatesApiContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new TemplatesApi(data), [data]);

  return {
    TemplatesApi: api,
  };
}