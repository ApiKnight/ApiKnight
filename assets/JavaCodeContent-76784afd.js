import{r as i,q as d,j as n,aa as p,U as r}from"./index-33f1548d.js";import{a as l}from"./index-c909b83a.js";function c(e,a,s,t){return`
        Unirest.setTimeouts(0, 0);
        HttpResponse<String> response = Unirest.${a.toLowerCase()}("${e}")
        .header(${s})
        .body("<body data here>")
        .asString();
        
    `}function u(e,a,s,t){return`
        OkHttpClient client = new OkHttpClient().newBuilder()
            .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "<body data here>");
        Request request = new Request.Builder()
            .url("${e}")
            .method("${a}", body)
            .addHeader(${s})
            .addHeader("Content-Type", "application/json")
            .build();
        Response response = client.newCall(request).execute();
    `}const y=()=>{const[e,a]=i.useState("1"),s=o=>{a(o.key)},{baseInfo:t}=d(o=>({baseInfo:o.document.apiData.apiInfo.base}));return n.jsxs("div",{className:"codeTemplate-content",children:[n.jsx(p,{onClick:s,selectedKeys:[e],mode:"horizontal",items:l}),n.jsx("div",{className:"codeTemplate-content__codeBlock",children:e==="1"?n.jsx(r,{defaultValue:c(`http://127.0.0.1/${t.path}`,t.method,"'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'"),lang:"java",height:"360px",width:"435px"}):n.jsx(r,{defaultValue:u(`http://127.0.0.1/${t.path}`,t.method,"'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'"),lang:"java",height:"360px",width:"435px"})})]})};export{y as default};
