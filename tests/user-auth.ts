import type { AuthType, LoginWay } from "./user-auth-types.d.ts"

const userAuthMap: Record<LoginWay,AuthType> = {
    defaultLogin: {
        username: "2281487673@qq.com",
        password: "123456"
    },
    phoneLogin: {
        username: 15642356625,
        password: "123456"
    },
    nameLogin: {
        username: "lyy",
        password: "123456"
    }
}

export {userAuthMap}