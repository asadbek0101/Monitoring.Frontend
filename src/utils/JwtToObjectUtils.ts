import { jwtDecode } from "jwt-decode";

export const JwtToObject = (token: string) => {
    return jwtDecode(token);
} 