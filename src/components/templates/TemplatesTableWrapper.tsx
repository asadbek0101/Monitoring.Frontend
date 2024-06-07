import { useEffect, useState } from "react";
import { useTemplatesApiContext } from "../../api/templates/TemplatesApiContext";
import { showError } from "../../utils/NotificationUtils";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { InputField } from "../form/InputField";
import { TempalteFilterTabs, TemplateFilter } from "../../filters/TemplateFilter";
import { toast } from "react-toastify";
import { GroupBox } from "../ui/GroupBox";

import TabPage from "../tabs/TabPage";
import TemplatesTable from "./TemplatesTable";
import Button, { BgColors } from "../ui/Button";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";

interface Props {
  readonly filter: TemplateFilter;
}

export default function TemplatesTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>({});
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { TemplatesApi } = useTemplatesApiContext();

  const locationHelpers = useLocationHelpers();

  useEffect(() => {
    setLoading(true);
    TemplatesApi.getAllTemplates(filter.getTemplateFilter())
      .then((r: any) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [TemplatesApi, filter]);

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between align-items-center">
          <Button
            className="px-3 py-2 text-light"
            bgColor={BgColors.Green}
            onClick={() => locationHelpers.pushQuery({ tab: TempalteFilterTabs.Form })}
          >
            Qo'shish
          </Button>
          <Formik
            initialValues={{ searchValue: filter.getTemplateFilter().searchValue }}
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
      <TemplatesTable
        loading={loading}
        data={data?.data}
        edit={(value: any) =>
          locationHelpers.pushQuery({ tab: TempalteFilterTabs.Form, templateId: value })
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
                  templateIds: deleteDocuments,
                };
                TemplatesApi.deleteTemplates(json)
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
