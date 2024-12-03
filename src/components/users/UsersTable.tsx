import { noop } from "lodash";
import { useMemo } from "react";
import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly edit: (value: any) => void;
}

export default function UsersTable({ data = [], edit }: Props) {
  const column = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        width: 50,
      },
      {
        Header: "Hudud",
        accessor: "region",
        width: 240,
      },
      {
        Header: "E-pochta",
        accessor: "email",
        width: 260,
      },
      {
        Header: "Username",
        accessor: "userName",
        width: 260,
      },
      {
        Header: "Ismi",
        accessor: "firstName",
        width: 260,
      },
      {
        Header: "Familiyasi",
        accessor: "lastName",
        width: 260,
      },
      {
        Header: "Otasinig ismi",
        accessor: "middleName",
        width: 260,
      },
      {
        Header: "Telefon nomeri",
        accessor: "phoneNumber",
        width: 260,
      },
      {
        Header: "Lavozimi",
        accessor: "roleName",
        width: 260,
      },
      {
        Header: "...",
        accessor: "actions",
        width: 120,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center gap-2">
              <Button
                className="text-light p-2"
                bgColor="#fff"
                onClick={() => edit(row?.row?.original?.id)}
              >
                <PencilIcon color="black" />
              </Button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <Table columns={column} data={data} selectRowCheckbox={noop} />;
}
