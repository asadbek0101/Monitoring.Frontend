import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { TodosApi } from "./TodosApi";

interface Props {
  readonly TodosApi: TodosApi;
}

export function useTodosApiContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new TodosApi(data), [data]);

  return {
    TodosApi: api,
  };
}