import { useEffect, useState } from "react";
import { useCategoriesApiContext } from "../../api/categories/CategoriesApiContext";
import { showError } from "../../utils/NotificationUtils";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { CategoryFilter, CategoryFilterTabs } from "../../filters/CategoriesFilter";
import { InputField } from "../form/InputField";

import TabPage from "../tabs/TabPage";
import CategoriesTable from "./CategoriesTable";
import Button, { BgColors } from "../ui/Button";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import { GroupBox } from "../ui/GroupBox";
import YesOrNoModal from "../ui/YesOrNoModal";
import { toast } from "react-toastify";

interface Props {
  readonly filter: CategoryFilter;
}

export default function CategoriesTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>({});
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const { CategoriesApi } = useCategoriesApiContext();

  const locationHelpers = useLocationHelpers();

  useEffect(() => {
    setLoading(true);
    CategoriesApi.getAllCategories(filter.getCategoryFilter())
      .then((r: any) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [CategoriesApi, filter]);

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between align-items-center">
          <Button
            className="px-3 py-2 text-light"
            bgColor={BgColors.Green}
            onClick={() => locationHelpers.pushQuery({ tab: CategoryFilterTabs.Form })}
          >
            Qo'shish
          </Button>
          <Formik
            initialValues={{ searchValue: filter.getCategoryFilter().searchValue }}
            onSubmit={noop}
            enableReinitialize={true}
          >
            {() => (
              <Form className="d-flex gap-3 align-items-center">
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
      <CategoriesTable
        loading={loading}
        data={data?.data}
        edit={(value) =>
          locationHelpers.pushQuery({ tab: CategoryFilterTabs.Form, categoryId: value })
        }
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
                  categoryIds: deleteDocuments,
                };
                CategoriesApi.deleteCategories(json)
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
