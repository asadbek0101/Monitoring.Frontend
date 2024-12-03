import { useCallback, useEffect, useState } from "react";
import { useUsersContext } from "../../api/users/UsersContext";
import { UserFilter, UserFilterTabs } from "../../filters/UserFIlter";
import { showError } from "../../utils/NotificationUtils";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { SelectPickerField } from "../form/SelectPrickerField";
import { InputField } from "../form/InputField";

import TabPage from "../tabs/TabPage";
import UsersTable from "./UsersTable";
import Button, { BgColors } from "../ui/Button";
import Paginator from "../paginator/Paginator";
import DeleteIcon from "../icons/DeleteIcon";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import AddIcon from "../icons/AddIcon";

interface Props {
  readonly filter: UserFilter;
}

export default function UsersTableWrapper({ filter }: Props) {
  const [roles, setRoles] = useState<{ label: string; value: string | number }[]>([]);
  const [data, setData] = useState<any>({});
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { UsersApi } = useUsersContext();

  const locationHelpers = useLocationHelpers();

  useEffect(() => {
    UsersApi.getRolesList()
      .then((r) => {
        var _roles =
          r?.data &&
          r?.data.map((x: any) => {
            return {
              id: x.id,
              label: x.name,
              value: x.normalizedName,
            };
          });
        _roles.unshift({
          label: "Hammasi",
          value: "",
        });
        setRoles(_roles);
      })
      .catch(showError);
  }, [UsersApi]);

  useEffect(() => {
    UsersApi.getAllUsers(filter.getUsersFilter())
      .then((r) => setData(r?.data))
      .catch(showError);
  }, [UsersApi, filter]);

  const getRole = useCallback(
    (value: any) => {
      const role = roles.filter((x: any) => x.value === value);

      return role.length > 0 && role[0];
    },
    [roles],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <Button
              disabled={!(deleteDocuments && deleteDocuments?.length > 0)}
              onClick={() => setDeleteModal(true)}
              className="py-2 px-2 text-light"
              bgColor={
                deleteDocuments && deleteDocuments?.length > 0 ? BgColors.Red : BgColors.White
              }
            >
              <DeleteIcon
                color={deleteDocuments && deleteDocuments?.length > 0 ? "#fff" : "#000"}
              />
            </Button>
            <Formik
              initialValues={{
                searchValue: filter?.getUsersFilter()?.searchValue,
                roleValue: getRole(filter.getUsersFilter().roleValue),
              }}
              onSubmit={noop}
              enableReinitialize={true}
            >
              {() => (
                <Form className="d-flex gap-3 align-items-center">
                  <SelectPickerField
                    name="roleValue"
                    width={300}
                    options={roles}
                    onChanges={(event) => locationHelpers.pushQuery({ roleValue: event.value })}
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-3">
            <Formik
              initialValues={{
                searchValue: filter?.getUsersFilter()?.searchValue,
                roleValue: getRole(filter.getUsersFilter().roleValue),
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
                    onChange={(event) =>
                      locationHelpers.pushQuery({ searchValue: event.target.value })
                    }
                  />
                </Form>
              )}
            </Formik>
            <Button
              className="px-3 py-2 text-light"
              onClick={() => locationHelpers.pushQuery({ tab: UserFilterTabs.UserForm })}
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
      <UsersTable
        data={data?.data}
        edit={(value) => locationHelpers.pushQuery({ tab: UserFilterTabs.UserForm, userId: value })}
      />
    </TabPage>
  );
}
