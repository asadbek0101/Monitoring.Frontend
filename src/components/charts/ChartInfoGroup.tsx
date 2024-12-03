import "./assets/chart-info-group.scss";
import { colors } from "../../constants/Colors";

interface Props {
  readonly data: any[];
}

export default function ChartInfoGroup({ data }: Props) {
  return (
    <div className="chart-info-group-wrapper row">
      {data &&
        data.map((item, index) => {
          return (
            <div className="chart-info-item col-6">
              <div
                className="chart-info"
                style={{
                  borderLeft: `10px solid ${colors[index]}`,
                }}
              >
                <span className="chart-info-span">{item.name}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
