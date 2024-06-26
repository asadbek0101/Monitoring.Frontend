import "./assets/chart-circle.scss";

interface Props {
  readonly value: number;
}

export default function ChartCircle({ value = 50 }: Props) {
  return (
    <div className="chart-circle-wrapper">
      <div
        className="chart-circle-static"
        style={{
          background: `conic-gradient(green 0% ${value}%, red ${value}% 100%)`,
        }}
      ></div>
      <div className="chart-circle-labels">
        <div className="red-circle-label">
          <div className="red-box"></div>
          <div className="red-label">{100-value}%</div>
        </div>
            <div className="green-circle-label">
            <div className="green-box"></div>
            <div className="green-label">{value}%</div>
            </div>
      </div>
    </div>
  );
}
