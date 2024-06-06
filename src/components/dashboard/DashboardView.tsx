import { useMemo } from "react";
import { noop } from "lodash";

import Table from "../table/Table";

interface Props {
  readonly data: any[];
}

export default function DashboardVIew({ data = [] }: Props) {
  const column = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        width: 50,
      },
      {
        Header: "Buyruq nomi",
        accessor: "name",
        width: 300,
      },
      {
        Header: "Rejada",
        accessor: "inPlan",
        width: 200,
      },
      {
        Header: "Amalda",
        accessor: "inProcess",
        width: 200,
      },
      {
        Header: "Foizda",
        accessor: "inPercentage",
        width: 200,
      },
      {
        Header: "Yaratilgan vaqti",
        accessor: "createdDate",
        width: 200,
      },
    ],
    [],
  );

  return <Table columns={column} data={data} selectRowCheckbox={noop} />;
}
