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
          background: `conic-gradient(#63b598 0% ${value}%, #ce7d78 ${value}% 100%)`,
        }}
      ></div>
      <div className="chart-circle-labels">
        <div className="red-circle-label">
          <div className="red-box"></div>
          <div className="red-label ms-1 fw-bold">{(100-value).toString().substring(0, 4)}%</div>
        </div>
            <div className="green-circle-label">
            <div className="green-box"></div>
            <div className="green-label ms-1 fw-bold">{(value).toString().substring(0, 4)}%</div>
            </div>
      </div>
    </div>
  );
}
