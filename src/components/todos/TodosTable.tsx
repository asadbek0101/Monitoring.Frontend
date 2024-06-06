import { useMemo } from "react";

import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly loading: boolean;
  readonly data: any[];
  readonly edit: (value: any) => void;
  readonly selectIds: (value: any) => void;
}

export default function TodosTable({ data = [], edit, selectIds, loading }: Props) {
  const column = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        width: 50,
      },
      {
        Header: "Hudud nomi",
        accessor: "region",
        width: 200,
      },
      {
        Header: "Buyruq toifasi",
        accessor: "category",
        width: 300,
      },
      {
        Header: "Buyruq nomi",
        accessor: "name",
        width: 400,
      },
      {
        Header: "Rejada",
        accessor: "inPlan",
        width: 200,
        Cell: (value: any) => {
          return <span>{value.value.replace(/(.)(?=(\d{3})+$)/g, "$1 ")}</span>;
        },
      },
      {
        Header: "Amalda",
        accessor: "inProcess",
        width: 200,
        Cell: (value: any) => {
          return <span>{value.value.replace(/(.)(?=(\d{3})+$)/g, "$1 ")}</span>;
        },
      },
      {
        Header: "Foizda",
        accessor: "inPercentage",
        width: 200,
      },
      {
        Header: "Qo'shimcha ma'lumot",
        accessor: "info",
        width: 200,
      },
      // {
      //     Header: "Yaratilgan vaqti",
      //     accessor: "createdDate",
      //     width: 200,
      //     Cell: (row: any) => {
      //         return <span>{row?.value && moment(row?.value).format("DD-MM-YYYY | HH:mm")}</span>
      //     }
      // },
      // {
      //     Header: "Yangilangan vaqti",
      //     accessor: "updatedDate",
      //     width: 200
      // },
      // {
      //     Header: "Tomonidan yaratilgan",
      //     accessor: "createdBy",
      //     width: 200
      // },
      // {
      //     Header: "Tomonidan yangilangan",
      //     accessor: "updatedBy",
      //     width: 200
      // },
      {
        Header: "...",
        accessor: "actions",
        width: 100,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center gap-2">
              <Button
                className="text-light p-2"
                bgColor={BgColors.Yellow}
                onClick={() => edit(row?.row?.original?.id)}
              >
                <PencilIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <Table loading={loading} columns={column} data={data} selectRowCheckbox={selectIds} />;
}
