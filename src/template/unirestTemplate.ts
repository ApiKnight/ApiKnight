import { ArrayItemType } from '@/types/arrayToTree'

function createUnirestTemplate(
  url: string,
  method: ArrayItemType,
  headers: any,
  _redirect?: string,
): string {
  return `
        Unirest.setTimeouts(0, 0);
        HttpResponse<String> response = Unirest.${method.toLowerCase()}("${url}")
        .header(${headers})
        .body("<body data here>")
        .asString();
        
    `
}

export { createUnirestTemplate }
