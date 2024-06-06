import { AppFilter, AppFilterProps } from "./AppFilter";

export enum TodoFilterTabs {
  Form = "form",
  Table = "table",
}

interface TodoFilterProps extends AppFilterProps<TodoFilterTabs> {
  readonly todoId: string;
  readonly regionId: string;
  readonly categoryId: string;
  readonly searchValue: string;
}

export class TodoFilter extends AppFilter<TodoFilterTabs> {
  private readonly todoId: string;
  private readonly regionId: string;
  private readonly categoryId: string;
  private readonly searchValue: string;
  public constructor(
    { todoId, regionId, categoryId, searchValue, ...props } = {} as TodoFilterProps,
  ) {
    super({ ...props });
    this.todoId = todoId || "0";
    this.regionId = regionId || "0";
    this.categoryId = categoryId || "0";
    this.searchValue = searchValue || "";
  }

  public getTodoFilter() {
    return {
      regionId: this.regionId,
      categoryId: this.categoryId,
      searchValue: this.searchValue,
      pageNumber: this.pageCount,
      pageSize: this.perPage,
    };
  }

  public getTodoId() {
    return this.todoId;
  }
}
