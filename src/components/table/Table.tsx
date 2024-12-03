import "./assets/table.scss";
import { useMemo, useCallback, useState, useEffect } from "react";
import { useTable, useBlockLayout, useResizeColumns, useSortBy } from "react-table";

interface TableProps {
  readonly data: any[];
  readonly columns: any;
  readonly loading?: boolean;
  readonly selectRowCheckbox?: (select: any[]) => void;
}

export default function Table({ columns, data = [], loading, selectRowCheckbox }: TableProps) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 10,
      width: 150,
      maxWidth: 1000,
    }),
    [],
  );

  const [dataTable, setDataTable] = useState<any[]>([]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useSortBy,
  );

  useEffect(() => {
    setDataTable(rows);
  }, [rows]);

  const setIds = useCallback(
    (value: any) => {
      let arr = value.map((item: any) => {
        if (item.isChecked) {
          console.log(item?.values);
          return item?.values?.id;
        }
      });
      let arrr = arr.filter((item: any) => item);
      selectRowCheckbox && selectRowCheckbox(arrr);
    },
    [selectRowCheckbox],
  );

  const handleChange = useCallback(
    (value: any) => {
      const { name, checked } = value.target;
      if (name === "allSelect") {
        var newData = [...dataTable];
        newData = newData?.map((item: any) => {
          return { ...item, isChecked: checked };
        });
        setIds(newData);
        setDataTable(newData);
      } else {
        var newData = [...dataTable];
        newData = newData?.map((item: any, index: any) =>
          index.toString() === name ? { ...item, isChecked: checked } : item,
        );
        setIds(newData);
        setDataTable(newData);
      }
    },
    [setIds, dataTable],
  );

  return (
    <div className="table-wrapper">
      <table {...getTableProps()} className="table  custom-table-for-layout">
        <thead>
          {headerGroups.map((headerGroup: any, i: any) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {selectRowCheckbox ? (
                <th>
                  <input
                    type="checkbox"
                    name="allSelect"
                    width={100}
                    checked={
                      dataTable?.length > 0
                        ? !dataTable?.some((user: any) => user?.isChecked !== true)
                        : false
                    }
                    onChange={handleChange}
                  />
                </th>
              ) : (
                <th>#</th>
              )}
              {headerGroup.headers.map((column: any, index: any) => (
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="d-flex align-items-center justify-content-center"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {data.length > 0 && !loading ? (
          <tbody {...getTableBodyProps()}>
            {dataTable.map((row: any, index: any) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()} className="tr">
                  {selectRowCheckbox ? (
                    <td className="my-td">
                      <input
                        type="checkbox"
                        name={index.toString()}
                        checked={row.isChecked || false}
                        onChange={handleChange}
                      />
                    </td>
                  ) : (
                    <td className="my-td">{index + 1}.</td>
                  )}{" "}
                  {row.cells.map((cell: any, index: number) => {
                    return (
                      <td key={index} {...cell.getCellProps()} className="absolutely-center my-td">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : data.length === 0 && loading ? (
          <div className="d-flex justify-content-center mt-4">
            <h5 className="fw-bold">Yuklanmoqda...</h5>
          </div>
        ) : (
          <div className="d-flex justify-content-center mt-4">
            <h5 className="fw-bold">Hech nars yo'q</h5>
          </div>
        )}
      </table>
    </div>
  );
}
