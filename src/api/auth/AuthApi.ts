import { BaseApi } from "../BaseApi";
import { AuthProps} from "./AuthDto";

export class AuthApi extends BaseApi {

    public Login(json: AuthProps){
        return this.post("Auth/Login", {
            json   
        })
    }
}
