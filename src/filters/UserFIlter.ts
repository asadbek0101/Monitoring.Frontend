import { AppFilter, AppFilterProps } from "./AppFilter";

export enum UserFilterTabs {
  UserTable = "table",
  UserForm = "form",
}

interface UserFilterProps extends AppFilterProps<UserFilterTabs> {
  readonly userId: string;
  readonly roleValue: string;
  readonly searchValue: string;
}

export class UserFilter extends AppFilter<UserFilterTabs> {
  private readonly userId: string;
  private readonly roleValue: string;
  private readonly searchValue: string;
  public constructor({ userId, roleValue, searchValue, ...props } = {} as UserFilterProps) {
    super({ ...props });
    this.searchValue = searchValue || "";
    this.userId = userId || "";
    this.roleValue = roleValue || "";
  }

  public getUserId() {
    return this.userId;
  }

  public getUsersFilter() {
    return {
      roleValue: this.roleValue,
      searchValue: this.searchValue,
      pageNumber: this.pageCount,
      pageSize: this.perPage,
    };
  }
}
