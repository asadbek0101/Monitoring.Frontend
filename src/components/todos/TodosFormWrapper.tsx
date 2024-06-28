import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoInitialProps } from "../../api/todos/TodosDto";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import { useTemplatesApiContext } from "../../api/templates/TemplatesApiContext";
import { useCategoriesApiContext } from "../../api/categories/CategoriesApiContext";
import { showError } from "../../utils/NotificationUtils";
import { TodoFilter, TodoFilterTabs } from "../../filters/TodoFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTodosApiContext } from "../../api/todos/TodosApiContext";

import TabPage from "../tabs/TabPage";
import TodosForm from "./TodosForm";
import Button, { BgColors } from "../ui/Button";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import { update } from "immupdate";
import axios from "axios";

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

  const navigate = useNavigate();

  const locationHelpers = useLocationHelpers();

  const todoId = useMemo(() => Number(filter.getTodoId()) || 0, [filter]);

  useEffect(() => {
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
                    navigate("/dashboard/todos/table");
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
                navigate("/dashboard/todos/table");
              })
              .catch(showError);
          }
        }
      } else {
        toast.error("Plan must be high than Process");
      }
    },
    [TodosApi, navigate, todoId],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between">
          <Button
            className="px-3 py-2 text-light"
            bgColor={BgColors.Green}
            onClick={() => locationHelpers.replaceQuery({ tab: TodoFilterTabs.Table, todoId: "0" })}
          >
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
