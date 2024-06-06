import * as XLSX from 'xlsx'

import * as PapaParse from "papaparse";

export function formatTableDataToExcelData(titles: string[], data: any[]): any[][] {
  return data
    .map((x) => titles.map((c) => x[c]))
    .reduce((acc, item = []) => {
      const tmp = acc.slice();

      item.forEach((x, index) => {
        const curr = tmp[index] || [];

        curr.push(x);

        tmp[index] = curr;
      });

      return tmp;
    }, []);
}

export type ConvertDataType = number[][] | string[][];

export interface ConvertToCSVProps {
  readonly keys: string[];
  readonly data: ConvertDataType;
}

export function convertToCSV({ data, keys }: ConvertToCSVProps) {
  const orderedData: any = [];

  for (let i = 0, iLen = data.length; i < iLen; i++) {
    const temp = data[i];

    for (let j = 0, jLen = temp.length; j < jLen; j++) {
      const quotes: any = ['"' + temp[j] + '"'];

      if (!orderedData[j]) {
        orderedData.push([quotes]);
      } else {
        orderedData[j].push(quotes);
      }
    }
  }
  return keys.join(",") + "\r\n" + orderedData.join("\r\n");
}

interface ExportToExcelProps extends ConvertToCSVProps {
  readonly fileName: string;
}

export function exportToExcel({ fileName, ...props }: ExportToExcelProps) {
  const str = convertToCSV(props);

  const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
}

export function readXlsx(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });

        workbook.SheetNames.forEach((sheetName: any) => {
          const xlObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: "A" });

          resolve(xlObject);
        });
      } catch (e: any) {

        console.log(e.message);
      }
    };

    reader.onerror = (e) => reject(e);

    reader.readAsBinaryString(file);
  });
}

export function readCSV(file: File) {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    const parserOptions = {} as PapaParse.ParseConfig;

    reader.onload = () => {
      const csvData = PapaParse.parse(
        reader.result as string,
        Object.assign(parserOptions, {
          encoding: "UTF-8",
        }),
      );
      resolve(csvData);
    };

    reader.onerror = (e) => reject(e);

    reader.readAsText(file, "UTF-8");
  });
}

export function readTxt(file: File, charset: any) {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      const txtData = reader.result;
      resolve(txtData);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsText(file, charset === "ANSI" ? "IBM866" : "UTF-8");
  });
}
