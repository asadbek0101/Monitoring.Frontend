import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoInitialProps } from "../../api/todos/TodosDto";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import { useTemplatesApiContext } from "../../api/templates/TemplatesApiContext";
import { useCategoriesApiContext } from "../../api/categories/CategoriesApiContext";
import { showError } from "../../utils/NotificationUtils";
import { TodoFilter } from "../../filters/TodoFilter";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { profileSelector } from "../../reducers/authReducer";
import { CheckRole } from "../../utils/CheckRole";
import { UserRoles } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTodosApiContext } from "../../api/todos/TodosApiContext";
import { update } from "immupdate";

import TabPage from "../tabs/TabPage";
import TodosForm from "./TodosForm";
import Button from "../ui/Button";
import axios from "axios";
import BackIcon from "../icons/BackIcon";

interface Props {
  readonly filter: TodoFilter;
}

export default function TodosFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<TodoInitialProps>({
    regionId: 0,
    templateId: 0,
    categoryId: 0,
    inPercentage: "",
    inPlan: "",
    inProcess: "",
    comment: "",
    fileName: "",
    file: "",
  });

  const [categories, setCategories] = useState<{ label: string; value: number }[]>([]);
  const [templates, setTemplates] = useState<{ label: string; value: number }[]>([]);
  const [regions, setRegions] = useState<{ label: string; value: number }[]>([]);

  const { RegionsApi } = useRegionContext();
  const { TemplatesApi } = useTemplatesApiContext();
  const { CategoriesApi } = useCategoriesApiContext();
  const { TodosApi } = useTodosApiContext();

  const profile = useShallowEqualSelector(profileSelector);

  const navigate = useNavigate();

  const regionId = useMemo(() => Number(profile?.RegionId) || 0, [profile]);

  const todoId = useMemo(() => Number(filter.getTodoId()) || 0, [filter]);

  const checkRegion = useCallback(() => {
    return (
      CheckRole(UserRoles.Programmer, profile) ||
      CheckRole(UserRoles.DepartmentHead, profile) ||
      CheckRole(UserRoles.ChiefSpecialist, profile)
    );
  }, [profile]);

  useEffect(() => {
    if (Boolean(todoId)) {
      TodosApi.getOneTodo({ id: todoId }).then((r: any) => {
        const json = {
          ...r?.data,
          regionId: {
            label: r?.data?.region,
            value: r?.data?.regionId,
          },
          categoryId: {
            label: r?.data?.category,
            value: r?.data?.categoryId,
          },
          templateId: {
            label: r?.data?.name,
            value: r?.data?.templateId,
          },
        };

        setInitialValues(json);
      });
    }
  }, [RegionsApi, todoId, TodosApi]);

  useEffect(() => {
    RegionsApi.getRegionsList().then((r: any) => {
      const _regions = r?.data?.map((re: any) => {
        return {
          label: re.name,
          value: re.id,
        };
      });

      setRegions(_regions);
    });
  }, [RegionsApi]);

  useEffect(() => {
    if (!checkRegion()) {
      const region = regions.filter((item: any) => item.value === regionId);
      if (region.length > 0) {
        setInitialValues((prev: any) =>
          update(prev, {
            regionId: {
              label: region[0]?.label,
              value: region[0]?.value,
            },
          }),
        );
      }
      CategoriesApi.getCategoriesList({
        regionId: Number(regionId) || 0,
        type: "todo",
      }).then((r: any) => {
        const _categories = r?.data?.map((re: any) => {
          return {
            label: re.name,
            value: re.id,
          };
        });

        setCategories(_categories);
      });
    }
  }, [regionId, regions, checkRegion, CategoriesApi]);

  const onChangeRegionId = useCallback(
    (event: any) => {
      CategoriesApi.getCategoriesList({
        regionId: Number(event.value) || 0,
        type: "todo",
      }).then((r: any) => {
        const _categories = r?.data?.map((re: any) => {
          return {
            label: re.name,
            value: re.id,
          };
        });

        setCategories(_categories);
      });

      setInitialValues((prev: any) =>
        update(prev, {
          regionId: event,
          categoryId: {},
          templateId: {},
        }),
      );
      setTemplates([]);
    },
    [setInitialValues, CategoriesApi],
  );

  const onChangeCategoryId = useCallback(
    (event: any) => {
      TemplatesApi.getTemplatesList({
        categoryId: Number(event.value) || 0,
        regionId: Number(initialValues.regionId.value) || 0,
      }).then((r: any) => {
        const _templates = r?.data?.map((re: any) => {
          return {
            label: re.name,
            value: re.id,
          };
        });
        setTemplates(_templates);
      });

      setInitialValues((prev: any) =>
        update(prev, {
          categoryId: event,
          templateId: {},
        }),
      );
    },
    [setInitialValues, TemplatesApi, initialValues.regionId],
  );

  const onSubmit = useCallback(
    (value: any) => {
      if (Number(value.inPlan) >= Number(value.inProcess)) {
        if (todoId) {
          // Update
          if (value.file) {
            const url = `http://172.24.201.4:1000/api/Object/monitoring`;
            const formData = new FormData();
            formData.append("File", value.file);
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };
            axios
              .post(url, formData, config)
              .then((response: any) => {
                const json = {
                  ...value,
                  id: todoId,
                  regionId: value?.regionId?.value,
                  templateId: value?.templateId?.value,
                  categoryId: value?.categoryId?.value,
                  fileName: response?.data?.filename,
                };

                TodosApi.updateTodo(json)
                  .then((r) => {
                    toast.success(r?.message);
                    navigate("/dashboard/todos/table");
                  })
                  .catch(showError);
              })
              .catch(showError);
          } else {
            const json = {
              ...value,
              id: todoId,
              regionId: value?.regionId?.value,
              templateId: value?.templateId?.value,
              categoryId: value?.categoryId?.value,
            };

            TodosApi.updateTodo(json)
              .then((r) => {
                toast.success(r?.message);
                navigate("/dashboard/todos/table");
              })
              .catch(showError);
          }
        } else {
          // Create

          if (value.file) {
            const url = `http://172.24.201.4:1000/api/Object/monitoring`;
            const formData = new FormData();
            formData.append("File", value.file);
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };
            axios
              .post(url, formData, config)
              .then((response: any) => {
                const json = {
                  ...value,
                  regionId: value?.regionId?.value,
                  templateId: value?.templateId?.value,
                  categoryId: value?.categoryId?.value,
                  fileName: response?.data?.filename,
                };

                TodosApi.createTodo(json)
                  .then((r) => {
                    toast.success(r?.message);
                    navigate(
                      `/dashboard/todos?tab=table&todoId=0&regionId=${filter.getRegionId()}&categoryId=${filter.getCategoryId()}`,
                    );
                  })
                  .catch(showError);
              })
              .catch(showError);
          } else {
            const json = {
              ...value,
              regionId: value?.regionId?.value,
              templateId: value?.templateId?.value,
              categoryId: value?.categoryId?.value,
            };

            TodosApi.createTodo(json)
              .then((r) => {
                toast.success(r?.message);
                navigate(
                  `/dashboard/todos?tab=table&todoId=0&regionId=${filter.getRegionId()}&categoryId=${filter.getCategoryId()}`,
                );
              })
              .catch(showError);
          }
        }
      } else {
        toast.error("Plan must be high than Process");
      }
    },
    [TodosApi, navigate, todoId, filter],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between">
          <Button
            className="px-3 py-2 d-flex align-items-center gap-3"
            bgColor={"#fff"}
            onClick={() =>
              navigate(
                `/dashboard/todos?tab=table&todoId=0&regionId=${filter.getRegionId()}&categoryId=${filter.getCategoryId()}`,
              )
            }
          >
            <BackIcon />
            Orqaga
          </Button>
        </div>
      }
    >
      <TodosForm
        todoId={todoId}
        regions={regions}
        categories={categories}
        templates={templates}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onChangeRegionId={onChangeRegionId}
        onChangeCategoryId={onChangeCategoryId}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
