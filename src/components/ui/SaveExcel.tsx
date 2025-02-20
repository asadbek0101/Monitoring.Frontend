import * as XLSX from "xlsx";
import { useCallback } from "react";
import Button from "./Button";
import ExcelIcon from "../icons/ExcelIcon";

interface Props {
  readonly data: any;
}

export default function SaveExcel({ data }: Props) {
  const exportToExcel = useCallback(() => {
    const workbook = XLSX.utils.book_new();

    data?.categories?.forEach((item: any, index: number) => {
      const dataSheet = item?.todos?.map((row: any) => {
        return {
          Nomi: row?.name,
          Rejada: row?.inPlan,
          Amalda: row?.inProcess,
          Foizda: row?.inPercentage?.substring(0, 4),
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(dataSheet);
      XLSX.utils.book_append_sheet(workbook, worksheet, item?.name?.substring(0, 28));
    });

    XLSX.writeFile(workbook, `${data?.regionName?.substring(0, 28)}.xlsx`);
  }, [data]);

  return (
    <Button className="p-2 d-flex align-items-center" onClick={exportToExcel} bgColor="#fff">
      <ExcelIcon size={14} color="green" />
      Excelda yuklash
    </Button>
  );
}
