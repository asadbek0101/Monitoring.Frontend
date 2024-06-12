import "./assets/chart.scss";
import { useState } from "react";
import { sortData } from "../../utils/DataUtils";
import { colors } from "../../constants/Colors";

import ChartItem from "./ChartItem";
import Button, { BgColors } from "../ui/Button";
import EyeIcon from "../icons/EyeIcon";

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
}

export default function Chart({
  id,
  data = [],
  labels = [],
  comment = "Resbuplika bo'yicha...",
  title = "Lorem ipsum....",
  setChart,
}: Props) {
  const [sortMethodType, setSortMethodType] = useState<"upper" | "lower">("upper");

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="chart-header-wrapper py-3">
          <div className="chart-header d-flex align-items-center justify-content-between">
            <span className="chart-header-title">{title}</span>
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

        <div className="chart-body-wrapper">
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

        <div className="chart-item-label-wrapper mt-4">
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
                    }}
                  >
                    {chartItem.name}
                  </span>
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
