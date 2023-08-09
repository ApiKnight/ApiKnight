import request from "./request";
 const login=(loginData)=>{
    console.log(loginData);
    
   return request.post('v1/user/login', loginData,{})
}
export default login