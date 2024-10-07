import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { TodoFilter, TodoFilterTabs } from "../../filters/TodoFilter";

import TodosTableWrapper from "./TodosTableWrapper";
import TodosFormWrapper from "./TodosFormWrapper";

export default function TodosTab() {
  const query = useQuery();

  const filter = useMemo(() => new TodoFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || TodoFilterTabs.Table, [filter]);

  return (
    <>
      {tab === "table" && <TodosTableWrapper filter={filter} />}
      {tab === "form" && <TodosFormWrapper filter={filter} />}
    </>
  );
}
