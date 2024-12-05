import "./assets/chart-item.scss";
import { colors } from "../../constants/Colors";

interface Props {
  readonly heigt: string;
  readonly index: number;

  readonly setChartItem: (index: number) => void;
}

export default function ChartItem({ heigt, index, setChartItem }: Props) {
  return (
    <div
      className="chart-item"
      style={{
        width: `40px`,
      }}
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
        onClick={() => {
          console.log("Asadbek");
          setChartItem(index);
        }}
      />
    </div>
  );
}
