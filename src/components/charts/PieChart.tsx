import { Chart } from "react-google-charts";

interface Props {
  readonly value: any;
}

export default function PieChart({ value }: Props) {
  return (
    <Chart
      chartType="PieChart"
      data={[
        ["Age", "Hello"],
        ["Bajarildi", value],
        ["Bajarilmadi", 100 - value],
      ]}
      width="100%"
      height="400px"
      options={{
        is3D: true,
        chartArea: {
          width: "100%",
          height: "70%",
          fontSize: "19px"
        },
        legend: {
          position: "bottom",
          alignment: "center",
          textStyle: {
            color: "233238",
            fontSize: 16,
          },
        },
        slices: [
          {
            color: "#63b598",
          },
          {
            color: "#ce7d78",
          },
        ],
      }}
    />
  );
}
