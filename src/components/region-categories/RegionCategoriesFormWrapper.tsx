import { useCallback, useEffect, useMemo, useState } from "react";
import { RegionCategoryInitialProps } from "../../api/region-categoies/RegionCategoriesDto";
import { SelectBoxProps } from "../../api/AppDto";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import { useCategoriesApiContext } from "../../api/categories/CategoriesApiContext";
import Button, { BgColors } from "../ui/Button";
import { useRegionCateogriesContext } from "../../api/region-categoies/RegionCategoriesApiContext";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { RegionCategoryFilter, RegionCategoryFilterTabs } from "../../filters/RegionCategoryFilter";

import TabPage from "../tabs/TabPage";
import RegionCategoriesForm from "./RegionCategoriesForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: RegionCategoryFilter;
}

export default function RegionCategoriesFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<RegionCategoryInitialProps>({
    id: 0,
    regionId: 0,
    categoryId: 0,
    comment: "",
  });

  const [regions, setRegions] = useState<SelectBoxProps[]>([]);
  const [categories, setCategories] = useState<SelectBoxProps[]>([]);

  const { RegionCategoriesApi } = useRegionCateogriesContext();
  const { CategoriesApi } = useCategoriesApiContext();
  const { RegionsApi } = useRegionContext();

  const locationHelpers = useLocationHelpers();

  const regionCategryId = useMemo(() => filter.getRegionCategoryId() || 0, [filter]);

  useEffect(() => {
    if (Boolean(regionCategryId)) {
      RegionCategoriesApi.getOneRegionCategory({ id: regionCategryId })
        .then((r: any) => {
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
          };

          setInitialValues(json);
        })
        .catch(showError);
    }
  }, [RegionCategoriesApi, regionCategryId]);

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
    CategoriesApi.getCategoriesList({
      regionId: Number(initialValues.regionId.value) || 0,
      type: "region",
    }).then((r: any) => {
      const _categories = r?.data?.map((re: any) => {
        return {
          label: re.name,
          value: re.id,
        };
      });

      setCategories(_categories);
    });
  }, [CategoriesApi, initialValues.regionId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (Boolean(regionCategryId)) {
        const json = {
          id: regionCategryId,
          regionId: value.regionId.value,
          categoryId: value.categoryId.value,
          comment: value.comment,
        };

        RegionCategoriesApi.updateRegionCategory(json)
          .then((r: any) => {
            toast.success(r?.message);
            locationHelpers.pushQuery({ tab: RegionCategoryFilterTabs.Table });
          })
          .catch(showError);
      } else {
        const json = {
          regionId: value.regionId.value,
          categoryId: value.categoryId.value,
          comment: value.comment,
        };

        RegionCategoriesApi.createRegionCategory(json)
          .then((r: any) => {
            toast.success(r?.message);
            locationHelpers.pushQuery({ tab: RegionCategoryFilterTabs.Table });
          })
          .catch(showError);
      }
    },
    [RegionCategoriesApi, locationHelpers, regionCategryId],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between">
          <Button
            className="px-3 py-2 text-light"
            bgColor={BgColors.Green}
            onClick={() => locationHelpers.pushQuery({ tab: RegionCategoryFilterTabs.Table })}
          >
            Orqaga
          </Button>
        </div>
      }
    >
      <RegionCategoriesForm
        isDisabled={Boolean(regionCategryId)}
        regions={regions}
        categories={categories}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
