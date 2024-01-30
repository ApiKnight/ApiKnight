import{r as i,q as s,j as e,aa as d,U as l}from"./index-6c0c0bd2.js";import{b as c}from"./index-dbb2e08a.js";function p(t,r,n,o){return`
        package main
        import (
        "fmt"
        "strings"
        "net/http"
        "io/ioutil"
        )
        func main() {
        url := "${t}"
        method := "${r}"
        payload := strings.NewReader(\`<body data here>\`)
        client := &http.Client {
        }
        req, err := http.NewRequest(method, url, payload)
        if err != nil {
            fmt.Println(err)
            return
        }
        req.Header.Add("${n}")
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
    `}const f=()=>{const[t,r]=i.useState("1"),n=a=>{r(a.key)},{baseInfo:o}=s(a=>({baseInfo:a.document.apiData.apiInfo.base}));return e.jsxs("div",{className:"codeTemplate-content",children:[e.jsx(d,{onClick:n,selectedKeys:[t],mode:"horizontal",items:c}),e.jsx("div",{className:"codeTemplate-content__codeBlock",children:e.jsx(l,{defaultValue:p(`http://127.0.0.1/${o.path}`,o.method,"'User-Agent', 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'"),lang:"go",height:"360px",width:"435px"})})]})};export{f as default};
