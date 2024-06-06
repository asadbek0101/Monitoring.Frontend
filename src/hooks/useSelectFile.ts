import { useMemo } from "react";

export enum FileAccept {
  Excel = "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  CSV = ".csv, text/csv",
  TXT = ".txt",
}

interface Props {
  readonly multiple?: boolean;
  readonly accept: FileAccept[];
  readonly onSelect: (files: FileList) => void;
}

interface ResultProps {
  readonly open: () => void;
}

export function useSelectFile({ multiple, accept = [], onSelect }: Props): ResultProps {
  return useMemo(() => {
    const fileSelector = document.createElement("input");

    if (multiple) {
      fileSelector.setAttribute("multiple", "true");
    }
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("accept", accept.join(","));

    fileSelector.onchange = ({ target }: any) => onSelect(target.files);

    return {
      open: () => {
        if (fileSelector?.click) {
          fileSelector.click();
        }
      },
    };
  }, [multiple, accept, onSelect]);
}
