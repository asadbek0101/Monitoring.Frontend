import { useEffect, useState } from "react";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import { showError } from "../../utils/NotificationUtils";

import TabPage from "../tabs/TabPage";
import RegionsTable from "./RegionsTable";

export default function RegionsTableWrapper() {
  const [regions, setRegions] = useState([]);

  const { RegionsApi } = useRegionContext();

  useEffect(() => {
    RegionsApi.getAllRegions("")
      .then((r: any) => setRegions(r?.data))
      .catch(showError);
  }, [RegionsApi]);

  return (
    <TabPage>
      <RegionsTable data={regions} />
    </TabPage>
  );
}
