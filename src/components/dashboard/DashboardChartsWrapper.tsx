import { useCallback, useEffect, useMemo, useState } from "react";
import { useTodosApiContext } from "../../api/todos/TodosApiContext";
import { showError } from "../../utils/NotificationUtils";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { SelectPickerField } from "../form/SelectPrickerField";
import { DashboardFilter } from "../../filters/DashboardFilter";
import { GroupBox } from "../ui/GroupBox";

import useLocationHelpers from "../../hooks/userLocationHelpers";
import Modal from "../ui/Modal";
import DashboardVIew from "./DashboardView";
import axios from "axios";
import Button, { BgColors } from "../ui/Button";
import DonwloadIcon from "../icons/DowloadIcon";
import DashboardPdf from "./DashboardPdf";
import SaveExcel from "../ui/SaveExcel";
import ChartBox from "../charts/ChartBox";
import PdfIcon from "../icons/PdfIcon";
import RegionIcon from "../icons/RegionIcon";

interface Props {
  readonly filter: DashboardFilter;
}

export default function DashboardChartsWrapper({ filter }: Props) {
  const [data, setData] = useState<any>({});
  const [modal, setModal] = useState<boolean>(false);
  const [pdfModal, setPdfModal] = useState<boolean>(false);
  const [isOneData, setIsOneData] = useState<boolean>(false);
  const [modalData, setModalData] = useState({
    name: "",
    todos: [],
  });
  const [modalPdfData, setModalPdfData] = useState({
    name: "",
    todos: [],
  });

  const [oneData, setOneData] = useState({
    id: 0,
    name: "",
    comment: "",
    todos: [],
  });

  const [regions, setRegions] = useState<{ label: string; value: number }[]>([]);

  const { TodosApi } = useTodosApiContext();
  const { RegionsApi } = useRegionContext();

  const locationHelpers = useLocationHelpers();

  const regionId = useMemo(() => filter.getRegionId() || 0, [filter]);

  useEffect(() => {
    TodosApi.getTodosByRegion({ regionId })
      .then((r) => setData(r?.data))
      .catch(showError);
  }, [TodosApi, regionId]);

  useEffect(() => {
    RegionsApi.getRegionsList().then((r: any) => {
      const _regions = r?.data?.map((re: any) => {
        return {
          label: re.name,
          value: re.id,
        };
      });
      _regions.unshift({
        label: "O'zbekiston Respublikasi",
        value: 0,
      });
      setRegions(_regions);
    });
  }, [RegionsApi]);

  const [labels] = useState<string[]>([
    "100",
    "90",
    "80",
    "70",
    "60",
    "50",
    "40",
    "30",
    "20",
    "10",
    "0",
  ]);

  const getRegion = useCallback(
    (value: any) => {
      const product = regions.filter((pr: any) => pr.value === Number(value))[0];

      return product || { label: "", value: 0 };
    },
    [regions],
  );

  const setChartHandler = useCallback(
    (value: any) => {
      const chart = data?.categories && data?.categories.filter((x: any) => x.id === value);

      if (chart.length > 0) {
        setModalData(chart[0]);
      }

      setModal(true);
    },
    [data?.categories],
  );

  const setPdfHandler = useCallback(
    (value: any) => {
      if (value === "all") {
        setModalPdfData(data);
      } else {
        const chart = data?.categories && data?.categories.filter((x: any) => x.id === value);

        if (chart.length > 0) {
          setModalData(chart[0]);
        }
      }

      setPdfModal(true);
    },
    [data],
  );

  const setChartForOneHandler = useCallback(
    (value: any) => {
      const chart = data?.categories && data?.categories.filter((x: any) => x.id === value);

      if (chart.length > 0) {
        setOneData(chart[0]);
        setIsOneData(true);
      }
    },
    [data?.categories],
  );

  const downloadFile1 = useCallback(
    (categoryId: any, templateId: any) => {
      TodosApi.getAllFileNames({ categoryId, templateId })
        .then((r) => {
          r?.data &&
            // eslint-disable-next-line array-callback-return
            r?.data.map((fileName: string) => {
              if (fileName !== "" && Boolean(fileName)) {
                axios({
                  url: `http://172.24.201.4:1000/api/Object/monitoring?token=${fileName}`,
                  method: "GET",
                  responseType: "blob", // important
                }).then((response) => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link: any = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", `${fileName}`);
                  document.body.appendChild(link);
                  link.click();

                  link.parentNode.removeChild(link);
                });
              }
            });
        })
        .catch(showError);
    },
    [TodosApi],
  );

  const downloadFile2 = useCallback(
    (fileName: string) => {
    
            // eslint-disable-next-line array-callback-return
                axios({
                  url: `http://172.24.201.4:1000/api/Object/monitoring?token=${fileName}`,
                  method: "GET",
                  responseType: "blob", // important
                }).then((response) => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link: any = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", `${fileName}`);
                  document.body.appendChild(link);
                  link.click();

                  link.parentNode.removeChild(link);
                });
       
    },
    [TodosApi],
  );

  return (
    <div className="row p-4">
      <div className="col-12">
        <Formik
          initialValues={{
            regionId: getRegion(regionId),
          }}
          onSubmit={noop}
          enableReinitialize={true}
        >
          {() => (
            <Form className="d-flex align-items-center justify-content-between">
              <SelectPickerField
                icon={<RegionIcon size={24} />}
                name="regionId"
                width={400}
                options={regions}
                onChanges={(event) => locationHelpers.pushQuery({ regionId: event.value })}
              />
              {!isOneData && (
                <div className="d-flex gap-3">
                  <Button
                    className="px-3 d-flex align-items-center"
                    onClick={() => setPdfHandler("all")}
                    bgColor="#fff"
                  >
                    <PdfIcon size={14} color="green" />
                    Pdfda yuklash
                  </Button>
                  <SaveExcel data={data} />
                </div>
              )}

              {isOneData && (
                <Button
                  className="px-3 d-flex align-items-center"
                  onClick={() => setIsOneData(false)}
                  bgColor="#fff"
                >
                  Qaytish
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-3"></div>

      {data &&
        !isOneData &&
        // eslint-disable-next-line array-callback-return
        data?.categories?.map((category: any, index: any) => {
          if (category?.todos?.length > 0)
            return (
              <div key={index} className="col-6 my-3">
                <ChartBox
                  id={category.id}
                  labels={labels}
                  data={category.todos}
                  title={category.name}
                  comment={category.comment}
                  setChart={setChartHandler}
                  setChartForOne={setChartForOneHandler}
                  downloadFile={downloadFile2}
                />
              </div>
            );
        })}

      {isOneData && (
        <div className="col-12 my-3">
          <ChartBox
            id={oneData.id}
            labels={labels}
            data={oneData.todos}
            title={oneData.name}
            comment={oneData.comment}
            setChart={setChartHandler}
            setChartForOne={setChartHandler}
            downloadFile={downloadFile2}
          />
        </div>
      )}

      <Modal
        show={modal}
        closeHandler={() => setModal(false)}
        className="d-flex justify-content-center align-items-center "
        width="56%"
        height="700px"
        contentClassName="d-flex justify-content-center align-items-center p-3 flex-column "
      >
        <div className="py-2 w-100">
          <Button className="p-2" bgColor={BgColors.Yellow} onClick={() => setModal(false)}>
            Yopish
          </Button>
        </div>
        <GroupBox className="h-100 overflow-auto">
          <h5 className="py-2">
            {getRegion(regionId)?.label} - {modalData?.name}
          </h5>
          <DashboardVIew data={modalData?.todos && modalData?.todos} />
        </GroupBox>
      </Modal>
      <Modal
        show={pdfModal}
        width="1000px"
        height="1000px"
        className="d-flex align-items-center justify-content-center"
        closeHandler={() => setPdfModal(false)}
      >
        <DashboardPdf data={modalPdfData} />
      </Modal>
    </div>
  );
}


