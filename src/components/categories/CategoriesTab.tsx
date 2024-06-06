import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { CategoryFilter, CategoryFilterTabs } from "../../filters/CategoriesFilter";

import CategoriesTableWrapper from "./CategoriesTableWrapper";
import CategoriesFormWrapper from "./CategoreisFormWrapper";

export default function CategoriesTab() {
  const query = useQuery();

  const filter = useMemo(() => new CategoryFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || CategoryFilterTabs.Table, [filter]);

  return (
    <>
      {tab === "table" && <CategoriesTableWrapper filter={filter} />}
      {tab === "form" && <CategoriesFormWrapper filter={filter} />}
    </>
  );
}
