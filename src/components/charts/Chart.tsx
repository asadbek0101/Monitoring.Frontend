import "./assets/chart.scss";
import { useState } from "react";
import { sortData } from "../../utils/DataUtils";
import { colors } from "../../constants/Colors";

import ChartItem from "./ChartItem";
import Button, { BgColors } from "../ui/Button";
import EyeIcon from "../icons/EyeIcon";
import ChartCircle from "./ChartCircle";
import DonwloadIcon from "../icons/DowloadIcon";
import PieChart from "./PieChart";

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
  readonly downloadFile: (value: any) => void;
}

export default function Chart({
  id,
  data = [],
  labels = [],
  comment = "Resbuplika bo'yicha...",
  title = "Lorem ipsum....",
  setChart,
  downloadFile,
}: Props) {
  const [sortMethodType, setSortMethodType] = useState<"upper" | "lower">("upper");

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
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="chart-header-wrapper py-3">
          <div className="chart-header d-flex align-items-center justify-content-between">
            <span className="chart-header-title fw-bold">{title}</span>
            <div className="sort-button-group d-flex gap-2">
              <Button className="px-3 py-1" onClick={() => setChart(id)} bgColor={"green"}>
                <EyeIcon />
              </Button>
              <Button
                onClick={() => setSortMethodType("lower")}
                bgColor={sortMethodType === "lower" ? BgColors.Green : ""}
              >
                <img src={require("./assets/upper.png")} width="40px" height="20px" alt="" />
              </Button>
              <Button
                onClick={() => setSortMethodType("upper")}
                bgColor={sortMethodType === "upper" ? BgColors.Green : ""}
              >
                <img src={require("./assets/lower.png")} width="40px" height="20px" alt="" />
              </Button>
            </div>
          </div>
        </div>

        <div className="chart-body-wrapper d-flex">
          <div className="chart-body">
            <div className="chart-line-wrapper">
              {labels &&
                labels?.map((label: any, index) => {
                  return (
                    <div key={index} className="chart-line">
                      {label}
                    </div>
                  );
                })}
            </div>
            <div className="chart-item-wrapper">
              {data &&
                sortData(data, "inPercentage", sortMethodType)?.map(
                  (chartItem: any, index: number) => {
                    return (
                      <ChartItem
                        key={index}
                        index={index}
                        width={`${100 / data.length}%`}
                        heigt={chartItem.inPercentage}
                        inProcess={chartItem.inProcess}
                        itemLabel={chartItem.name}
                      />
                    );
                  },
                )}
            </div>
          </div>
          <div className="chart-circle">
            {/* <ChartCircle value={getValueForCircleChart(data)} /> */}
            <PieChart value={getValueForCircleChart(data)} />
          </div>
        </div>

        <div className="chart-item-label-wrapper mt-5">
          <div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Tadbirlar
            </span>
          </div>
          {data &&
            sortData(data, "inPercentage", sortMethodType)?.map((chartItem: any, index: number) => {
              return (
                <div className="my-2 d-flex align-items-center gap-2">
                  <div
                    className="px-1 py-1"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: `${colors[index]}`,
                    }}
                  ></div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold"
                    }}
                  >
                    {chartItem.name}
                  </span>
                  {chartItem?.fileName && (
                    <div>
                      <Button className="p-1" onClick={() => downloadFile(chartItem.templateId)}>
                        <DonwloadIcon color="green" />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
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
