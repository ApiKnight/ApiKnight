import { ArrayItemType } from '@/types/arrayToTree'

function createJQueryTemplate(
  url: string,
  method: ArrayItemType,
  headers: string,
  _redirect?: string,
): string {
  return `
    var settings = {
        "url": "${url}",
        "method": "${method}",
        "timeout": 0,
        "headers": {
           ${headers}
        },
     };
     
     $.ajax(settings).done(function (response) {
        console.log(response);
     });
    `
}

export { createJQueryTemplate }
