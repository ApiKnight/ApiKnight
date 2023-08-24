import { ArrayItemType } from '@/types/arrayToTree'

function createXHRTemplate(
  url: string,
  method: ArrayItemType,
  headers: any,
  redirect?: string,
): string {
  return `
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
        });
        
        xhr.open("${method}", "${url}");
        xhr.setRequestHeader(${headers});
        
        xhr.send();
    `
}

export { createXHRTemplate }
