import "./assets/paginator.scss";

import { useCallback, useMemo } from "react";
import { AppFilter } from "../../filters/AppFilter";

import LeftIcon from "../icons/LeftIcon";
import RightIcon from "../icons/RightIcon";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: AppFilter<any>;
  readonly totalRowCount: number;
  readonly totalPageCount: number;
}

export default function Paginator({ filter, totalPageCount, totalRowCount }: Props) {
  const perPage = useMemo(() => filter.getPerPage(), [filter]);
  const pageCount = useMemo(() => filter.getPageCount(), [filter]);
  const locationHelpers = useLocationHelpers();

  const prev = useCallback(() => {
    if (pageCount > 1) {
      const pageC = pageCount - 1;
      locationHelpers.pushQuery({ perPage: perPage.toString(), pageCount: pageC.toString() });
    }
  }, [perPage, pageCount, locationHelpers]);

  const next = useCallback(() => {
    if (pageCount < Number(totalPageCount)) {
      const pageC = pageCount + 1;
      locationHelpers.pushQuery({ perPage: perPage.toString(), pageCount: pageC.toString() });
    }
  }, [totalPageCount, perPage, locationHelpers, pageCount]);

  return (
    <div className="paginator-wrapper">
      <select
        name=""
        id=""
        onChange={(event: any) => {
          locationHelpers.pushQuery({ perPage: event.target.value, pageCount: pageCount });
        }}
        className="paginator-select"
        value={perPage}
      >
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
        <option value="80">80</option>
        <option value="100">100</option>
      </select>

      <div className="button-group">
        <button onClick={() => prev()}>
          <LeftIcon color="#000" />
        </button>
        {Array.from({ length: totalPageCount }, (_, index) => {
          const _index = index + 1;
          if (_index === pageCount - 1 || _index === pageCount || _index === pageCount + 1) {
            return (
              <button
                style={{
                  backgroundColor: pageCount === index + 1 ? "#F5F7FA" : "",
                }}
              >
                {index + 1}
              </button>
            );
          }
        })}
        <button onClick={() => next()}>
          <RightIcon color="#000" />
        </button>
      </div>
      <div></div>
    </div>
  );
}
