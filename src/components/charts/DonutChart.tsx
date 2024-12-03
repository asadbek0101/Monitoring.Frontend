import "./assets/donut-chart.scss";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomContent = () => (
  <img width={140} height={140} src={require("./assets/donut-center.png")} alt="" />
);

interface Props {
  readonly value: number;
}

export default function DonutChart({ value }: Props) {
  const data = {
    labels: ["Bajarildi", "Bajarilmadi"],
    datasets: [
      {
        label: "My Donut Chart",
        data: [value, 100 - value],
        backgroundColor: ["rgba(44, 208, 188, 1)", "rgba(251, 169, 36, 1)"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false, // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.raw}%`; // Custom tooltip format
          },
        },
      },
      customCenterContent: {
        beforeDraw: (chart: any) => {
          const ctx = chart.ctx;
          const width = chart.width;
          const height = chart.height;
          const x = width / 2;
          const y = height / 2;

          ctx.clearRect(0, 0, width, height);

          ctx.save();

          ctx.fillStyle = "#f0f0f0"; // Background color for the center
          ctx.beginPath();
          ctx.arc(x, y, 50, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = "24px Arial";
          ctx.fillStyle = "#333"; // Text color
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Center Text", x, y); // Custom text in the center

          ctx.strokeStyle = "#FF4560"; // Border color
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x - 40, y - 40); // Start point
          ctx.lineTo(x + 40, y + 40); // End point
          ctx.stroke();

          ctx.restore();
        },
      },
    },
    cutout: "70%", // Adjust the donut hole size (70% for a nice donut shape)
  };

  return (
    <div className="donut-chart-wrapper">
      <div className="donut-chart-circle">
        <Doughnut data={data} options={options} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // zIndex: -1,
            borderRadius: "50%",
          }}
        >
          {/* <CustomContent /> */}
        </div>
      </div>
      <div className="custom-plagins">
        <div>
          <div className="custom-plagin-done">
            <div className="custom-plagin-done-box"></div>
            <span>Bajarildi</span>
          </div>
          <div className="custom-plagin-not-done">
            <div className="custom-plagin-not-done-box"></div>
            <span>Bajarilmadi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
