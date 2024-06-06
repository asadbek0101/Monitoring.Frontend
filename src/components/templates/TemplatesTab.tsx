import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { TempalteFilterTabs, TemplateFilter } from "../../filters/TemplateFilter";

import TemplatesTableWrapper from "./TemplatesTableWrapper";
import TemplatesFormWrapper from "./TemplatesFormWrapper";

export default function TemplatesTab() {
  const query = useQuery();

  const filter = useMemo(() => new TemplateFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || TempalteFilterTabs.Table, [filter]);
  return (
    <>
      {tab === "table" && <TemplatesTableWrapper filter={filter} />}
      {tab === "form" && <TemplatesFormWrapper filter={filter} />}
    </>
  );
}
