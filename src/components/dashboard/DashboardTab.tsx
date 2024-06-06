import { useMemo } from "react";
import { useQuery } from "../../hooks/useQuery";
import { DashboardFilter } from "../../filters/DashboardFilter";

import DashboardChartsWrapper from "./DashboardChartsWrapper";

export default function DashboardTab() {
  const query = useQuery();

  const filter = useMemo(() => new DashboardFilter(query), [query]);

  return <DashboardChartsWrapper filter={filter} />;
}
