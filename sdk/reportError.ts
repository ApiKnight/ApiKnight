import request from "../src/api/request"

/* eslint-disable */
export function reportError(error: any,url:string, type: string) {
  if (url === '' || url === undefined) {
    url = window.location.pathname
  }
  const sendData = {
    url: url,
    type:type,
    message: JSON.stringify(error)
  }
  request.post("/v1/monitor/upload",sendData,{}).then((resp)=>{

  })
}
