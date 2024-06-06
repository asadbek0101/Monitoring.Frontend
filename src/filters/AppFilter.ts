import qs from "qs";
import { toFinite } from "lodash";

export interface AppFilterProps<TTab> {
  readonly tab: TTab;
  readonly status: string;
  readonly page?: number;
  readonly totalCount?: number;
  readonly perPage?: number;
  readonly pageCount?: number;
  readonly perPageStatement?: number;
}

export class AppFilter<TTab> {
  protected readonly tab: TTab;
  protected readonly page: number;
  protected readonly totalCount: number;
  protected readonly perPage: number;
  protected readonly pageCount: number;
  protected readonly perPageStatement: number;
  protected readonly status: string;

  constructor(initial: AppFilterProps<TTab>) {
    this.tab = initial.tab;
    this.page = toFinite(initial.page) || 1;
    this.totalCount = toFinite(initial.totalCount) || 0;
    this.perPage = toFinite(initial.perPage) || 25;
    this.pageCount = toFinite(initial.pageCount) || 1;
    this.perPageStatement = toFinite(initial.perPageStatement) || 25;
    this.status = initial.status || "";
  }

  public getPage(): number {
    return this.page;
  }

  public getTab(): TTab {
    return this.tab;
  }

  public getTotalCount() {
    return this.totalCount;
  }

  public getPageCount(): number {
    return this.pageCount;
  }

  public getPerPage(): number {
    return this.perPage;
  }

  public getPerPageStatement(): number {
    return this.perPageStatement;
  }

  public getStatus(){
    return this.status;
  }

  public getQuery() {
    return {
      tab: this.tab,
      page: this.page,
      perPage: this.perPage,
    };
  }

  public stringify(): string {
    return qs.stringify(this.getQuery());
  }
}
