import "./assets/chart-item.scss";
import { colors } from "../../constants/Colors";

interface Props {
  readonly activeId: any;
  readonly id: any;
  readonly heigt: string;
  readonly itemLabel?: string;
  readonly index: number;
  readonly width: string;
  readonly inProcess: string;
  readonly inPlan: string;
  readonly setChartItem: (id: any) => void;
}

export default function ChartItem({
  heigt,
  id,
  activeId,
  itemLabel,
  index,
  width = "100px",
  inProcess,
  inPlan,
  setChartItem,
}: Props) {
  return (
    <div
      className="chart-item"
      style={{
        width: `${width}`,
      }}
      onClick={() => setChartItem(id)}
    >
      <div className="bottom-chart-title chat-item-title">{`${heigt.replaceAll("%", "")}%`}</div>
      <div
        className="chart-item2"
        style={{
          height: `${heigt.replaceAll("%", "")}%`,
          width: "100%",
          maxWidth: "130px",
          backgroundColor: `${colors[index]}`,
        }}
      />
    </div>
  );
}
