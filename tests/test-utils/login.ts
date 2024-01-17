import { userAuthMap } from "../user-auth";
import login from "../../src/api/login"

 async function loginTestFunc(loginWay: string): Promise<void> {
    const user = userAuthMap[loginWay];
    await login({
        usernameOrEmail: user.username,
        password: user.password
    });
}

export {loginTestFunc}