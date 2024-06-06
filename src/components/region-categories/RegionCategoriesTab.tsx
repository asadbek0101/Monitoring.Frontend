import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { RegionCategoryFilter, RegionCategoryFilterTabs } from "../../filters/RegionCategoryFilter";

import RegionCategoriesTableWrapper from "./RegionCategoriesTableWrapper";
import RegionCategoriesFormWrapper from "./RegionCategoriesFormWrapper";

export default function RegionCategoriesTab() {
  const query = useQuery();

  const filter = useMemo(() => new RegionCategoryFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || RegionCategoryFilterTabs.Table, [filter]);

  return (
    <>
      {tab === "table" && <RegionCategoriesTableWrapper filter={filter} />}
      {tab === "form" && <RegionCategoriesFormWrapper filter={filter} />}
    </>
  );
}
