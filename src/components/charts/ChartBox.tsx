import "./assets/chart-box.scss";

import Button from "../ui/Button";
import EyeIcon from "../icons/EyeIcon";
import BoxIcon from "../icons/BoxIcon";
import Chart from "./Chart";
import ChartInfoGroup from "./ChartInfoGroup";
import DonutChart from "./DonutChart";
import { useState } from "react";

export interface ChartItemProps {
  readonly id: number;
  readonly label: string;
  readonly inPercentage: string;
  readonly inPlan: string;
  readonly inProcess?: string;
}

interface Props {
  readonly id: number | string;
  readonly data: ChartItemProps[];
  readonly labels: string[];
  readonly title?: string;
  readonly comment?: string;
  readonly setChart: (value: any) => void;
  readonly setChartForOne: (value: any) => void;
  readonly downloadFile: (value: any) => void;
}

export default function ChartBox({
  id,
  data = [],
  labels = [],
  comment = "Resbuplika bo'yicha...",
  title = "Lorem ipsum....",
  setChart,
  setChartForOne,
  downloadFile,
}: Props) {
  const [activeChartItem, setActiveChartItem] = useState(0);

  if (data.length === 0) {
    return null;
  }

  const getValueForCircleChart = (array: any[]) => {
    if (array.length === 0 || array === null) {
      return 0;
    } else {
      var inPlanSumm = 0,
        inProcessSumm = 0;
      for (let i = 0; i < array.length; i++) {
        inPlanSumm += Number(array[i].inPlan);
        inProcessSumm += Number(array[i].inProcess);
      }

      const result = (inProcessSumm * 100) / inPlanSumm;
      return Number(result.toString().substring(0, 4));
    }
  };

  return (
    <div className="chart-box-container">
      <div className="chart-box-wrapper">
        <div className="chart-box-header-wrapper py-3">
          <div className="chart-box-header">
            <div className="sort-button-group d-flex justify-content-end gap-2">
              <Button
                className="p-2"
                onClick={() => setChart(id)}
                bgColor={"rgba(225, 232, 238, 1)"}
              >
                <EyeIcon color="black" />
              </Button>
              <Button
                className="p-2"
                onClick={() => setChartForOne(id)}
                bgColor={"rgba(225, 232, 238, 1)"}
              >
                <BoxIcon color="" />
              </Button>
            </div>
            <div className="chart-box-header-title mt-4">
              <span className="chart-box-header-title-span">{title.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <DonutChart value={getValueForCircleChart(data)} />
        </div>

        <div className="mt-1">
          <Chart labels={labels} data={data} setChartItem={setActiveChartItem} />
        </div>
        <div className="mt-5">
          <ChartInfoGroup activeItem={activeChartItem} data={data} />
        </div>
        {Boolean(comment) && (
          <div className="chart-comment-wrapper">
            <div>
              <span className="fw-bold">Izoh</span>
            </div>
            <span>{comment}</span>
          </div>
        )}
      </div>
    </div>
  );
}
