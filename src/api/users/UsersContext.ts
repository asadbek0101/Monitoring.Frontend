import { useMemo } from "react";

import { useApiBase } from "../ApiContext";
import { UsersApi } from "./UsersApi";

interface Props {
  readonly UsersApi: UsersApi;
}

export function useUsersContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new UsersApi(data), [data]);

  return {
    UsersApi: api,
  };
}