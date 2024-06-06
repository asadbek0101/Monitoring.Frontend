import { BaseApi } from "../BaseApi";

export class RegionCategoriesApi extends BaseApi {
  public getAllRegionCategories(query: any): Promise<any[]> {
    return this.get("RegionCategories/GetAll", {
      query,
    });
  }

  public getOneRegionCategory(query: any): Promise<any> {
    return this.get("RegionCategories/GetOne", {
      query,
    });
  }

  public getRegionCategoriesList(): Promise<any[]> {
    return this.get("RegionCategories/GetList");
  }

  public createRegionCategory(json: any): Promise<any> {
    return this.post("RegionCategories/Create", {
      json,
    });
  }

  public updateRegionCategory(json: any): Promise<any> {
    return this.put("RegionCategories/Update", {
      json,
    });
  }

  public deleteRegionCategories(json: any): Promise<any> {
    return this.post("RegionCategories/Delete", {
      json,
    });
  }
}
