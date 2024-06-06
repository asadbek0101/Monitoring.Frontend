import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { UserFilter, UserFilterTabs } from "../../filters/UserFIlter";

import UsersTableWrapper from "./UsersTabeWrapper";
import UsersFormWrapper from "./UsersFormWrapper";

export default function UsersTab() {
  const query = useQuery();

  const filter = useMemo(() => new UserFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || UserFilterTabs.UserTable, [filter]);

  return (
    <>
      {tab === "table" && <UsersTableWrapper filter={filter} />}
      {tab === "form" && <UsersFormWrapper filter={filter}/>}
    </>
  );
}
