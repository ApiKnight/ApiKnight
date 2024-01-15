import{r as i,j as e,aa as a,U as s}from"./index-86ab2a83.js";import{b as d}from"./index-1569af57.js";function l(t,r,n,o){return`
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
    `}const m=()=>{const[t,r]=i.useState("1"),n=o=>{r(o.key)};return e.jsxs("div",{className:"codeTemplate-content",children:[e.jsx(a,{onClick:n,selectedKeys:[t],mode:"horizontal",items:d}),e.jsx("div",{className:"codeTemplate-content__codeBlock",children:e.jsx(s,{defaultValue:l("http://127.0.0.1/xxx","GET","'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'"),lang:"go",height:"360px",width:"435px"})})]})};export{m as default};
