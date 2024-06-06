import { noop } from "lodash";
import { useMemo } from "react";
import Table from "../table/Table";
import moment from"moment";

interface Props{
    readonly data: any[]
}

export default function RegionsTable({data}:Props){

    const column = useMemo(()=>[
        {
            Header: "Id",
            accessor: "id",
            width: 100
        },
        {
            Header: "Buyruq toifalari",
            accessor: "categories",
            width: 200,
            Cell: (row: any) => {
                return <span style={{
                    cursor: "pointer"
                }} className="bg-success text-light px-2 py-1 rounded">Ko'rish</span>
            }
        },
        {
            Header: "Hudud nomi",
            accessor: "name",
            width: 200
        },
        {
            Header: "Qo'shimcha ma'lumot",
            accessor: "info",
            width: 200
        },
        {
            Header: "Yaratilgan vaqti",
            accessor: "createdDate",
            width: 200,
            Cell: (row: any) => {
                return <span>{row?.value && moment(row?.value).format("DD-MM-YYYY | HH:mm")}</span>
            }
        },
        {
            Header: "Yangilangan vaqti",
            accessor: "updatedDate",
            width: 200
        },
        {
            Header: "Tomonidan yaratilgan",
            accessor: "createdBy",
            width: 200
        },
        {
            Header: "Tomonidan yangilangan",
            accessor: "updatedBy",
            width: 200
        },
        {
            Header: "...",
            accessor: "actions",
            width: 100
        },
    ], [])

    return <Table columns={column} data={data} selectRowCheckbox={noop}/>
}