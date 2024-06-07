import { BaseApi } from "../BaseApi";

export class CategoriesApi extends BaseApi {
  public getAllCategories(query: any): Promise<any[]> {
    return this.get("Categories/GetAll", {
      query,
    });
  }

  public getOneCategory(query: any): Promise<any> {
    return this.get("Categories/GetOne", {
      query,
    });
  }

  public getCategoriesList(query: any): Promise<any[]> {
    return this.get("Categories/GetList", {
      query,
    });
  }

  public createCategory(json: any): Promise<any> {
    return this.post("Categories/Create", {
      json,
    });
  }

  public updateCategory(json: any): Promise<any> {
    return this.put("Categories/Update", {
      json,
    });
  }

  public deleteCategories(json: any): Promise<any> {
    return this.post("Categories/Delete", {
      json,
    });
  }
}
