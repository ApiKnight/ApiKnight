import { ArrayItemType } from '@/types/arrayToTree'

function createRequestTemplate(
  url: string,
  method: ArrayItemType,
  headers: any,
  _redirect?: string,
): string {
  return `
        var request = require('request');
        var options = {
            'method': '${method}',
            'url': '${url}',
            'headers': {
                ${headers}
            }
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
            console.log(response.body);
        });
    `
}

export { createRequestTemplate }
