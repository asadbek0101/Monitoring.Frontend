import "./assets/chart-info-group.scss";
import { colors } from "../../constants/Colors";
import Button from "../ui/Button";
import DonwloadIcon from "../icons/DowloadIcon";

interface Props {
  readonly data: any[];
  readonly activeItem: number;
  readonly downloadFile: (value: any) => void;
}

export default function ChartInfoGroup({ data, activeItem, downloadFile }: Props) {
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
                  backgroundColor: activeItem === index ? "rgba(198, 215, 239, 0.6)" : "",
                }}
              >
                <span className="chart-info-span" style={{
                  width: activeItem === index? "80%" : "100%"
                }}>{item.name}</span>
                {Boolean(activeItem === index) && 
                <span>{item?.inPlan?.substring(0, 5)} | {item?.inProcess?.substring(0, 4)}</span>
                }
                {Boolean(item?.fileName) && 
                 <Button
                                  className="text-light p-2"
                                  bgColor={"#fff"}
                                  onClick={() => downloadFile(item)}
                                >
                                  <DonwloadIcon color="black" />
                                </Button>
                }
              </div>
            </div>
          );
        })}
    </div>
  );
}
