import { ArrayItemType } from '@/types/arrayToTree'

function createFetchTemplate(
  url: string,
  method: ArrayItemType,
  headers: string,
  redirect: string,
): string {
  return `
        var myHeaders = new Headers();
        myHeaders.append(${headers});
        
        var requestOptions = {
            method: '${method}',
            headers: myHeaders,
            redirect: '${redirect}'
        };
        
        fetch("${url}", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    `
}

export { createFetchTemplate }
