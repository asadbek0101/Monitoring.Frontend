import { useCallback, useEffect, useMemo, useState } from "react";
import { showError } from "../../utils/NotificationUtils";
import { useTodosApiContext } from "../../api/todos/TodosApiContext";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { SelectPickerField } from "../form/SelectPrickerField";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import { useCategoriesApiContext } from "../../api/categories/CategoriesApiContext";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { profileSelector } from "../../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { CheckRole } from "../../utils/CheckRole";
import { UserRoles } from "../../api/AppDto";
import { InputField } from "../form/InputField";
import { TodoFilter, TodoFilterTabs } from "../../filters/TodoFilter";
import { GroupBox } from "../ui/GroupBox";
import { toast } from "react-toastify";

import TabPage from "../tabs/TabPage";
import TodosTable from "./TodosTable";
import Button, { BgColors } from "../ui/Button";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import axios from "axios";
import AddIcon from "../icons/AddIcon";

interface Props {
  readonly filter: TodoFilter;
}

export default function TodosTableWrapper({ filter }: Props) {
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState<any>({});
  const [categories, setCategories] = useState<{ label: string; value: number }[]>([]);
  const [regions, setRegions] = useState<{ label: string; value: number }[]>([]);

  const profile = useShallowEqualSelector(profileSelector);

  const regionId = useMemo(() => Number(profile?.RegionId) || 0, [profile]);

  const { TodosApi } = useTodosApiContext();
  const { RegionsApi } = useRegionContext();
  const { CategoriesApi } = useCategoriesApiContext();

  const navigator = useNavigate();

  const locationHelpers = useLocationHelpers();

  const checkRegion = useCallback(() => {
    return (
      CheckRole(UserRoles.Programmer, profile) ||
      CheckRole(UserRoles.DepartmentHead, profile) ||
      CheckRole(UserRoles.ChiefSpecialist, profile)
    );
  }, [profile]);

  useEffect(() => {
    RegionsApi.getRegionsList().then((r: any) => {
      const _regions = r?.data?.map((re: any) => {
        return {
          label: re.name,
          value: re.id,
        };
      });
      _regions.unshift({
        label: "Hammasi",
        value: 0,
      });
      setRegions(_regions);
    });
  }, [RegionsApi]);

  useEffect(() => {
    CategoriesApi.getCategoriesList({ regionId: 0 }).then((r: any) => {
      const _categories = r?.data?.map((re: any) => {
        return {
          label: re.name,
          value: re.id,
        };
      });
      _categories.unshift({
        label: "Hammasi",
        value: 0,
      });
      setCategories(_categories);
    });
  }, [CategoriesApi]);

  useEffect(() => {
    setLoading(true);
    TodosApi.getAllTodos({
      ...filter.getTodoFilter(),
      regionId: checkRegion() ? filter.getRegionId() : regionId,
    })
      .then((r: any) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [TodosApi, filter, checkRegion, regionId]);

  const getRegion = useCallback(
    (value: any) => {
      const region = regions.filter((r) => r.value === Number(value));
      return region.length > 0 && region[0];
    },
    [regions],
  );

  const getCategory = useCallback(
    (value: any) => {
      const category = categories.filter((r) => r.value === Number(value));
      return category.length > 0 && category[0];
    },
    [categories],
  );

  const downloadFile = useCallback((fileName: any) => {
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
  }, []);

  const editFunction = useCallback(
    (value: any) => {
      navigator(
        `/dashboard/todos?tab=form&todoId=${value}&regionId=${filter.getRegionId()}&categoryId=${filter.getCategoryId()}`,
      );
    },
    [filter, navigator],
  );

  const onChangeRegionId = useCallback(
    (event: any) => {
      navigator(
        `/dashboard/todos?tab=table&todoId=0&regionId=${event?.value}&categoryId=${filter?.getCategoryId()}`,
      );
    },
    [filter, navigator],
  );

  const onChangeCategoryId = useCallback(
    (event: any) => {
      navigator(
        `/dashboard/todos?tab=table&todoId=0&regionId=${filter.getRegionId()}&categoryId=${event?.value}`,
      );
    },
    [filter, navigator],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between align-items-center">
          <Formik
            initialValues={{
              regionId: getRegion(filter?.getTodoFilter()?.regionId),
              categoryId: getCategory(filter?.getTodoFilter()?.categoryId),
              searchValue: filter?.getTodoFilter()?.searchValue,
            }}
            onSubmit={noop}
            enableReinitialize={true}
          >
            {() => (
              <Form className="d-flex gap-3 align-items-center">
                {Boolean(
                  CheckRole(UserRoles.Programmer, profile) ||
                    CheckRole(UserRoles.DepartmentHead, profile) ||
                    CheckRole(UserRoles.ChiefSpecialist, profile),
                ) && (
                  <SelectPickerField
                    name="regionId"
                    width={300}
                    placeholder="Saralash(hudud)"
                    options={regions}
                    onChanges={onChangeRegionId}
                  />
                )}

                <SelectPickerField
                  name="categoryId"
                  width={300}
                  placeholder="Saralash(buyruq toifasi)"
                  options={categories}
                  onChanges={onChangeCategoryId}
                />
                <InputField
                  name="searchValue"
                  width={300}
                  placeholder="Qidirish..."
                  onChange={(event) =>
                    locationHelpers.pushQuery({ searchValue: event.target.value })
                  }
                />
              </Form>
            )}
          </Formik>
          <Button
            className="px-3 py-2 text-light d-flex align-items-center"
            onClick={() => locationHelpers.pushQuery({ tab: TodoFilterTabs.Form })}
            icon={<AddIcon />}
          >
            Qo'shish
          </Button>
        </div>
      }
      footerComponent={
        <div className="d-flex justify-content-between align-items-center mt-4 pb-3">
          <Button
            disabled={!(deleteDocuments && deleteDocuments?.length > 0)}
            onClick={() => setDeleteModal(true)}
            className="py-2 px-2 text-light"
            bgColor={deleteDocuments && deleteDocuments?.length > 0 ? BgColors.Red : BgColors.White}
          >
            <DeleteIcon color={deleteDocuments && deleteDocuments?.length > 0 ? "#fff" : "#000"} />
          </Button>
          <Paginator
            filter={filter}
            totalPageCount={data?.totalPageCount}
            totalRowCount={data?.totalRowCount}
          />
        </div>
      }
    >
      <TodosTable
        loading={loading}
        data={data?.data}
        edit={editFunction}
        downloadFile={downloadFile}
        selectIds={setDeleteDocuments}
      />
      <Modal
        show={deleteModal}
        closeHandler={() => setDeleteModal(false)}
        className="d-flex justify-content-center align-items-center"
        contentClassName="rounded p-4"
        width="500px"
      >
        <GroupBox>
          <YesOrNoModal
            title="Tanlanganlarni haqiqatdan ham uchurmoqchimisiz?"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  todoIds: deleteDocuments,
                };
                TodosApi.deleteTodos(json)
                  .then((r) => {
                    toast.success(r?.message);
                    window.location.reload();
                  })
                  .catch(showError);
              }
              setDeleteModal(false);
            }}
          />
        </GroupBox>
      </Modal>
    </TabPage>
  );
}
