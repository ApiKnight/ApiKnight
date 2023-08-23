import { ArrayItemType } from "@/types/arrayToTree";

function createNativeTemplate(url:string,method: ArrayItemType,headers:any,redirect?:string):string {
    return `
        package main
        import (
        "fmt"
        "strings"
        "net/http"
        "io/ioutil"
        )
        func main() {
        url := "${url}"
        method := "${method}"
        payload := strings.NewReader(\`<body data here>\`)
        client := &http.Client {
        }
        req, err := http.NewRequest(method, url, payload)
        if err != nil {
            fmt.Println(err)
            return
        }
        req.Header.Add("${headers}")
        req.Header.Add("Content-Type", "application/json")
        res, err := client.Do(req)
        if err != nil {
            fmt.Println(err)
            return
        }
        defer res.Body.Close()
        body, err := ioutil.ReadAll(res.Body)
        if err != nil {
            fmt.Println(err)
            return
        }
        fmt.Println(string(body))
        }
    `
}

export { createNativeTemplate }