import { useCallback, useEffect, useMemo, useState } from "react";
import { CategoryInitialProps } from "../../api/categories/CategoriesDto";
import { useCategoriesApiContext } from "../../api/categories/CategoriesApiContext";
import { showError } from "../../utils/NotificationUtils";
import { CategoryFilter, CategoryFilterTabs } from "../../filters/CategoriesFilter";
import { toast } from "react-toastify";

import TabPage from "../tabs/TabPage";
import CategoriesForm from "./CategoreisForm";
import Button, { BgColors } from "../ui/Button";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import BackIcon from "../icons/BackIcon";

interface Props {
  readonly filter: CategoryFilter;
}

export default function CategoriesFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<CategoryInitialProps>({
    id: 0,
    name: "",
    info: "",
  });

  const { CategoriesApi } = useCategoriesApiContext();

  const categoryId = useMemo(() => filter.getCategoryId() || 0, [filter]);

  const locationHelpers = useLocationHelpers();

  useEffect(() => {
    if (Boolean(categoryId)) {
      CategoriesApi.getOneCategory({ id: categoryId })
        .then((r: any) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [categoryId, CategoriesApi]);

  const onSubmit = useCallback(
    (value: any) => {
      if (Boolean(categoryId)) {
        const json = {
          id: categoryId,
          ...value,
        };

        CategoriesApi.updateCategory(json)
          .then((r) => {
            toast.success(r?.message);
            locationHelpers.pushQuery({ tab: CategoryFilterTabs.Table });
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
        };

        CategoriesApi.createCategory(json)
          .then((r) => {
            toast.success(r?.message);
            locationHelpers.pushQuery({ tab: CategoryFilterTabs.Table });
          })
          .catch(showError);
      }
    },
    [CategoriesApi, locationHelpers, categoryId],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between">
          <Button
            className="px-3 py-2 d-flex align-items-center gap-3"
            bgColor={"#fff"}
            onClick={() => locationHelpers.pushQuery({ tab: CategoryFilterTabs.Table })}
          >
            <BackIcon />
            Orqaga
          </Button>
        </div>
      }
    >
      <CategoriesForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
