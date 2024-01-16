import{r as i,j as s,aa as c,U as o}from"./index-396c82d8.js";import{i as p}from"./index-3c558a21.js";function a(e,t,r,n){return`
        var myHeaders = new Headers();
        myHeaders.append(${r});
        
        var requestOptions = {
            method: '${t}',
            headers: myHeaders,
            redirect: '${n}'
        };
        
        fetch("${e}", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    `}function h(e,t,r,n){return`
    var axios = require('axios');

    var config = {
       method: '${t}',
       url: '${e}',
       headers: { 
          ${r}
       }
    };
    
    axios(config)
    .then(function (response) {
       console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
       console.log(error);
    });
    `}function x(e,t,r,n){return`
    var settings = {
        "url": "${e}",
        "method": "${t}",
        "timeout": 0,
        "headers": {
           ${r}
        },
     };
     
     $.ajax(settings).done(function (response) {
        console.log(response);
     });
    `}function l(e,t,r,n){return`
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
        });
        
        xhr.open("${t}", "${e}");
        xhr.setRequestHeader(${r});
        
        xhr.send();
    `}const g=()=>{const[e,t]=i.useState("1"),r=n=>{t(n.key)};return s.jsxs("div",{className:"codeTemplate-content",children:[s.jsx(c,{onClick:r,selectedKeys:[e],mode:"horizontal",items:p}),s.jsx("div",{className:"codeTemplate-content__codeBlock",children:e==="1"?s.jsx(o,{defaultValue:a("http://127.0.0.1/xxx","GET","'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'","follow"),lang:"javascript",height:"360px",width:"435px"}):e==="2"?s.jsx(o,{defaultValue:h("http://127.0.0.1/xxx","GET","'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'"),lang:"javascript",height:"360px",width:"435px"}):e==="3"?s.jsx(o,{defaultValue:x("http://127.0.0.1/xxx","GET","'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'"),lang:"javascript",height:"360px",width:"435px"}):e==="4"?s.jsx(o,{defaultValue:a("http://127.0.0.1/xxx","GET","'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'","follow"),lang:"javascript",height:"360px",width:"435px"}):s.jsx(o,{defaultValue:l("http://127.0.0.1/xxx","GET","'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'")})})]})};export{g as default};
