import{r,j as a,aa as o,U as i}from"./index-b1dba4f0.js";import{a as d}from"./index-03cd1c69.js";function p(e,s,t,n){return`
        Unirest.setTimeouts(0, 0);
        HttpResponse<String> response = Unirest.post("${e}")
        .header(${t})
        .body("<body data here>")
        .asString();
        
    `}function l(e,s,t,n){return`
        OkHttpClient client = new OkHttpClient().newBuilder()
            .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "<body data here>");
        Request request = new Request.Builder()
            .url("${e}")
            .method("${s}", body)
            .addHeader(${t})
            .addHeader("Content-Type", "application/json")
            .build();
        Response response = client.newCall(request).execute();
    `}const x=()=>{const[e,s]=r.useState("1"),t=n=>{s(n.key)};return a.jsxs("div",{className:"codeTemplate-content",children:[a.jsx(o,{onClick:t,selectedKeys:[e],mode:"horizontal",items:d}),a.jsx("div",{className:"codeTemplate-content__codeBlock",children:e==="1"?a.jsx(i,{defaultValue:p("http://127.0.0.1/xxx","GET","'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'"),lang:"java",height:"360px",width:"435px"}):a.jsx(i,{defaultValue:l("http://127.0.0.1/xxx","GET","'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'"),lang:"java",height:"360px",width:"435px"})})]})};export{x as default};
