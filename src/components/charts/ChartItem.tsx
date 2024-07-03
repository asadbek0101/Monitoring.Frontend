import "./assets/chart-item.scss";
import { colors } from "../../constants/Colors";

interface Props {
  readonly heigt: string;
  readonly itemLabel?: string;
  readonly index: number;
  readonly width: string;
  readonly inProcess: string;
}

export default function ChartItem({ heigt, itemLabel, index, width = "100px", inProcess }: Props) {
  return (
    <div
      className="chart-item"
      style={{
        width: `${width}`,
      }}
    >
      <div
        className="chart-item2"
        style={{
          height: `${heigt.replaceAll("%", "")}%`,
          width: "100%",
          maxWidth: "130px",
          backgroundColor: `${colors[index]}`,
        }}
      >
        <div className="chat-item-title d-flex flex-column justify-content-around h-100">
          <span>{inProcess}</span> <span>{`${heigt.replaceAll("%", "")}%`}</span>
        </div>
      </div>
    </div>
  );
}
