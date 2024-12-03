import "./assets/chart.scss";
import ChartItem from "./ChartItem";

interface Props {
  readonly labels: any[];
  readonly data: any[];
}

export default function Chart({ labels, data }: Props) {
  return (
    <div className="chart-container">
      <div className="chart-line-wrapper">
        {labels &&
          labels.map((item) => {
            return (
              <div className="chart-line">
                <span className="chart-line-label">{item}</span>
              </div>
            );
          })}
      </div>
      <div className="chart-body-wrapper">
        {data &&
          data.map((item, index) => {
            return <ChartItem index={index} heigt={item.inPercentage.substring(0, 4)} />;
          })}
      </div>
    </div>
  );
}
