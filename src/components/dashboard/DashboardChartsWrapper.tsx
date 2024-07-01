import { useCallback, useEffect, useMemo, useState } from "react";
import { useTodosApiContext } from "../../api/todos/TodosApiContext";
import { showError } from "../../utils/NotificationUtils";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { SelectPickerField } from "../form/SelectPrickerField";
import { DashboardFilter } from "../../filters/DashboardFilter";
import { GroupBox } from "../ui/GroupBox";

import Chart from "../charts/Chart";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import Modal from "../ui/Modal";
import DashboardVIew from "./DashboardView";
import axios from "axios";

interface Props {
  readonly filter: DashboardFilter;
}

export default function DashboardChartsWrapper({ filter }: Props) {
  const [data, setData] = useState<any>({});
  const [modal, setModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState({
    name: "",
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

  const downloadFile = useCallback(
    (categoryId: any, templateId: any) => {
      TodosApi.getAllFileNames({ categoryId, templateId })
        .then((r) => {
          r?.data &&
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
            <Form>
              <SelectPickerField
                name="regionId"
                width={400}
                options={regions}
                onChanges={(event) => locationHelpers.pushQuery({ regionId: event.value })}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-3"></div>

      {data &&
        // eslint-disable-next-line array-callback-return
        data?.categories?.map((category: any, index: any) => {
          if (category?.todos?.length > 0)
            return (
              <div key={index} className="col-6 my-3">
                <Chart
                  id={category.id}
                  labels={labels}
                  data={category.todos}
                  title={category.name}
                  comment={category.comment}
                  setChart={setChartHandler}
                  downloadFile={(todoId: any) => downloadFile(category?.id, todoId)}
                />
              </div>
            );
        })}

      <Modal
        show={modal}
        closeHandler={() => setModal(false)}
        className="d-flex justify-content-center align-items-center "
        width="70%"
        height="700px"
        contentClassName="d-flex justify-content-center align-items-center p-3 flex-column "
      >
        <GroupBox className="h-100 overflow-auto">
          <h5 className="py-2">
            {getRegion(regionId)?.label} - {modalData?.name}
          </h5>
          <DashboardVIew data={modalData?.todos && modalData?.todos} />
        </GroupBox>
      </Modal>
    </div>
  );
}
