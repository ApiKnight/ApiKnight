import { ArrayItemType } from "@/types/arrayToTree";

function createAxiosTemplate(url:string,method: ArrayItemType,headers:any,redirect?:string):string {
    return `
    var axios = require('axios');

    var config = {
       method: '${method}',
       url: '${url}',
       headers: { 
          ${headers}
       }
    };
    
    axios(config)
    .then(function (response) {
       console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
       console.log(error);
    });
    `
}

export { createAxiosTemplate }