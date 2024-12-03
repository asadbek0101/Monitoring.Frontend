import { useEffect, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";
import { profileSelector, tokenSelector } from "../reducers/authReducer";
import { CheckRole } from "../utils/CheckRole";
import { UserRoles } from "../api/AppDto";

import AppContainer from "./AppContainer";
import UsersContainer from "./UsersContainer";
import AuthContainer from "./AuthContainer";
import TodosContainer from "./TodosContainer";
import CategoriesContainer from "./CategoriesContainer";
import TemplatesContainer from "./TemplatesContainer";
import DashboardContainer from "./DashboardContainer";
import RegionCategoriesContainer from "./RegionCategoriesContainer";
import NotFoundContainer from "./NotFoundContainer";

export default function RootContainer() {
  const token = useShallowEqualSelector(tokenSelector);
  const profile = useShallowEqualSelector(profileSelector);

  const isAuthorized = useMemo(() => Boolean(token), [token]);

  const locatonPath = useLocation().pathname;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized || locatonPath === "/") {
      navigate("auth");
    }
    if (isAuthorized && locatonPath === "/") {
      navigate("/dashboard/statistic");
    }
  }, [isAuthorized, navigate, locatonPath]);

  return (
    <Routes>
      {isAuthorized && (
        <Route path="/dashboard" element={<AppContainer />}>
          <Route path="todos/:tab?" element={<TodosContainer />} />
          <Route path="statistic/:tab?" element={<DashboardContainer />} />
          {(CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile)) && (
            <Route path="categories/:tab?" element={<CategoriesContainer />} />
          )}
          {(CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile)) && (
            <Route path="reg-cate/:tab?" element={<RegionCategoriesContainer />} />
          )}
          {(CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile)) && (
            <Route path="templates/:tab?" element={<TemplatesContainer />} />
          )}
          {CheckRole(UserRoles.Programmer, profile) && (
            <Route path="users/:tab?" element={<UsersContainer />} />
          )}
          <Route path="*" element={<NotFoundContainer />} />
        </Route>
      )}
      <Route path="/auth" element={<AuthContainer />} />
    </Routes>
  );
}
