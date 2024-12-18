import "./assets/donut-chart.scss";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

      datalabels: {
        display: true,
        formatter: (value: any) => value, // Display value inside the chart
        color: "#fff",
      },

      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.raw}%`; // Custom tooltip format
          },
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
            <span>Bajarildi: {value}%</span>
          </div>
          <div className="custom-plagin-not-done">
            <div className="custom-plagin-not-done-box"></div>
            <span>Jarayonda: {100 - value}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
