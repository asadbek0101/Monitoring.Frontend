import { BaseApi } from "../BaseApi";

export class RegionsApi extends BaseApi {
  public getAllRegions(query: any): Promise<any[]> {
    return this.get("Regions/GetAll", {
       query,
    });
  }

  public getRegionsList(): Promise<any[]> {
    return this.get("Regions/GetList");
  }
}
