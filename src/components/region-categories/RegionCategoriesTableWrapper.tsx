import { useCallback, useEffect, useState } from "react";
import { useRegionCateogriesContext } from "../../api/region-categoies/RegionCategoriesApiContext";
import { showError } from "../../utils/NotificationUtils";
import Button, { BgColors } from "../ui/Button";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { SelectPickerField } from "../form/SelectPrickerField";
import { SelectBoxProps } from "../../api/AppDto";
import { InputField } from "../form/InputField";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import { useCategoriesApiContext } from "../../api/categories/CategoriesApiContext";
import { toast } from "react-toastify";
import { GroupBox } from "../ui/GroupBox";
import { RegionCategoryFilter, RegionCategoryFilterTabs } from "../../filters/RegionCategoryFilter";

import TabPage from "../tabs/TabPage";
import RegionCategoriesTable from "./RegionCategoriesTable";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import AddIcon from "../icons/AddIcon";
import RegionIcon from "../icons/RegionIcon";
import ProductsIcon from "../icons/ProductsIcon";

interface Props {
  readonly filter: RegionCategoryFilter;
}

export default function RegionCategoriesTableWrapper({ filter }: Props) {
  const [regions, setRegions] = useState<SelectBoxProps[]>([]);
  const [categories, setCategories] = useState<SelectBoxProps[]>([]);
  const [data, setData] = useState<any>({});
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { RegionCategoriesApi } = useRegionCateogriesContext();
  const { RegionsApi } = useRegionContext();
  const { CategoriesApi } = useCategoriesApiContext();

  const locationHelpers = useLocationHelpers();

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
    RegionCategoriesApi.getAllRegionCategories(filter.getRegionCategoryFilter())
      .then((r: any) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [RegionCategoriesApi, filter]);

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

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <Button
              bgColor={deleteDocuments && deleteDocuments?.length > 0 ? "" : "#fff"}
              disabled={!(deleteDocuments && deleteDocuments?.length > 0)}
              onClick={() => setDeleteModal(true)}
            >
              <DeleteIcon
                color={
                  deleteDocuments && deleteDocuments?.length > 0 ? "#fff" : "rgba(85, 88, 102, 1)"
                }
              />
            </Button>
            <Formik
              initialValues={{
                regionId: getRegion(filter?.getRegionCategoryFilter()?.regionId),
                categoryId: getCategory(filter?.getRegionCategoryFilter()?.categoryId),
              }}
              onSubmit={noop}
              enableReinitialize={true}
            >
              {() => (
                <Form className="d-flex gap-3 align-items-center">
                  <SelectPickerField
                    icon={<RegionIcon size={22} />}
                    name="regionId"
                    width={300}
                    placeholder="Saralash(hudud)"
                    options={regions}
                    onChanges={(event: any) =>
                      locationHelpers.pushQuery({ regionId: Number(event.value) })
                    }
                  />
                  <SelectPickerField
                    icon={<ProductsIcon size={22} color="rgba(85, 88, 102, 1)" />}
                    name="categoryId"
                    width={300}
                    placeholder="Saralash(buyruq toifasi)"
                    options={categories}
                    onChanges={(event: any) =>
                      locationHelpers.pushQuery({ categoryId: Number(event.value) })
                    }
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-3">
            <Formik
              initialValues={{
                searchValue: filter?.getRegionCategoryFilter()?.searchValue,
              }}
              onSubmit={noop}
              enableReinitialize={true}
            >
              {() => (
                <Form className="d-flex gap-3 align-items-center">
                  <InputField
                    name="searchValue"
                    width={300}
                    placeholder="Qidirish..."
                    value={filter.getRegionCategoryFilter().searchValue}
                    onChange={(event) =>
                      locationHelpers.pushQuery({ searchValue: event.target.value })
                    }
                  />
                </Form>
              )}
            </Formik>
            <Button
              className="px-3 py-2 text-light"
              onClick={() => locationHelpers.pushQuery({ tab: RegionCategoryFilterTabs.Form })}
            >
              <AddIcon />
              Qo'shish
            </Button>
          </div>
        </div>
      }
      footerComponent={
        <div className="d-flex justify-content-between align-items-center mt-4 pb-3">
          <Paginator
            filter={filter}
            totalPageCount={data?.totalPageCount}
            totalRowCount={data?.totalRowCount}
          />
        </div>
      }
    >
      <RegionCategoriesTable
        loading={loading}
        data={data?.data}
        edit={(value) =>
          locationHelpers.pushQuery({ tab: RegionCategoryFilterTabs.Form, regionCategoryId: value })
        }
        selectIds={setDeleteDocuments}
      />
      <Modal
        show={deleteModal}
        closeHandler={() => setDeleteModal(false)}
        className="d-flex justify-content-center align-items-center"
        contentClassName="rounded p-2"
        width="400px"
      >
        <GroupBox>
          <YesOrNoModal
            title="Tanlanganlarni haqiqatdan ham uchurmoqchimisiz?"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  regionCategoryIds: deleteDocuments,
                };
                RegionCategoriesApi.deleteRegionCategories(json)
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
