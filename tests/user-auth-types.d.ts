interface AuthType {
    username: string | number;
    password: string;
}
type LoginWay = "defaultLogin" | "phoneLogin" | "nameLogin";
export type {AuthType,LoginWay};