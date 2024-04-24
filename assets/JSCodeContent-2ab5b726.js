import{r as p,w as h,j as o,ad as l,X as a}from"./index-0d704dc5.js";import{i as c}from"./index-93ccc94b.js";function i(t,s,r,e){return`
        var myHeaders = new Headers();
        myHeaders.append(${r});
        
        var requestOptions = {
            method: '${s}',
            headers: myHeaders,
            redirect: '${e}'
        };
        
        fetch("${t}", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    `}function d(t,s,r,e){return`
    var axios = require('axios');

    var config = {
       method: '${s}',
       url: '${t}',
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
    `}function u(t,s,r,e){return`
    var settings = {
        "url": "${t}",
        "method": "${s}",
        "timeout": 0,
        "headers": {
           ${r}
        },
     };
     
     $.ajax(settings).done(function (response) {
        console.log(response);
     });
    `}function x(t,s,r,e){return`
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
        });
        
        xhr.open("${s}", "${t}");
        xhr.setRequestHeader(${r});
        
        xhr.send();
    `}const m=()=>{const[t,s]=p.useState("1"),r=n=>{s(n.key)},{baseInfo:e}=h(n=>({baseInfo:n.document.apiData.apiInfo.base}));return o.jsxs("div",{className:"codeTemplate-content",children:[o.jsx(l,{onClick:r,selectedKeys:[t],mode:"horizontal",items:c}),o.jsx("div",{className:"codeTemplate-content__codeBlock",children:t==="1"?o.jsx(a,{defaultValue:i(`http://127.0.0.1/${e.path}`,e.method,"'User-Agent', 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'","follow"),lang:"javascript",height:"360px",width:"435px"}):t==="2"?o.jsx(a,{defaultValue:d(`http://127.0.0.1/${e.path}`,e.method,"'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'"),lang:"javascript",height:"360px",width:"435px"}):t==="3"?o.jsx(a,{defaultValue:u(`http://127.0.0.1/${e.path}`,e.method,"'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'"),lang:"javascript",height:"360px",width:"435px"}):t==="4"?o.jsx(a,{defaultValue:i(`http://127.0.0.1/${e.path}`,e.method,"'User-Agent', 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'","follow"),lang:"javascript",height:"360px",width:"435px"}):o.jsx(a,{defaultValue:x(`http://127.0.0.1/${e.path}`,e.method,"'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'")})})]})};export{m as default};
