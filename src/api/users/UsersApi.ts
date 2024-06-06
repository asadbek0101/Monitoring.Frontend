import { BaseApi } from "../BaseApi";

export class UsersApi extends BaseApi {
  public getAllUsers(query: any) {
    return this.get("Users/GetAll", {
      query,
    });
  }

  public getOneUser(query: any) {
    return this.get("Users/GetOne", {
      query,
    });
  }

  public getRolesList() {
    return this.get("Users/GetRoleList");
  }

  public createUser(json: any) {
    return this.post("Users/Create", {
      json,
    });
  }

  public updateUser(json: any) {
    return this.put("Users/Update", {
      json,
    });
  }
}
