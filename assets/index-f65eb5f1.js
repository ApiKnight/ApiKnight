import{y as S,r,C as ae,c as J,ak as ve,al as Ce,g as je,m as Ee,b as Me,am as Ne,an as Ie,a as le,ao as Pe,ap as ce,aq as ze,ar as Le,S as Oe,h as F,j as i,ai as Be,d as we,as as _e,at as Ae,p as He,B as W,M as Te,H as de,au as ke,a6 as P,av as Re}from"./index-d6cefc45.js";import{P as We}from"./index-3c259240.js";const ie=S.createContext({});ie.Consumer;var pe=globalThis&&globalThis.__rest||function(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,o=Object.getOwnPropertySymbols(t);s<o.length;s++)e.indexOf(o[s])<0&&Object.prototype.propertyIsEnumerable.call(t,o[s])&&(n[o[s]]=t[o[s]]);return n};const Ge=t=>{var{prefixCls:e,className:n,avatar:o,title:s,description:d}=t,f=pe(t,["prefixCls","className","avatar","title","description"]);const{getPrefixCls:y}=r.useContext(ae),h=y("list",e),v=J(`${h}-item-meta`,n),C=S.createElement("div",{className:`${h}-item-meta-content`},s&&S.createElement("h4",{className:`${h}-item-meta-title`},s),d&&S.createElement("div",{className:`${h}-item-meta-description`},d));return S.createElement("div",Object.assign({},f,{className:v}),o&&S.createElement("div",{className:`${h}-item-meta-avatar`},o),(s||d)&&C)},De=(t,e)=>{var{prefixCls:n,children:o,actions:s,extra:d,className:f,colStyle:y}=t,h=pe(t,["prefixCls","children","actions","extra","className","colStyle"]);const{grid:v,itemLayout:C}=r.useContext(ie),{getPrefixCls:O}=r.useContext(ae),c=()=>{let b;return r.Children.forEach(o,E=>{typeof E=="string"&&(b=!0)}),b&&r.Children.count(o)>1},N=()=>C==="vertical"?!!d:!c(),g=O("list",n),j=s&&s.length>0&&S.createElement("ul",{className:`${g}-item-action`,key:"actions"},s.map((b,E)=>S.createElement("li",{key:`${g}-item-action-${E}`},b,E!==s.length-1&&S.createElement("em",{className:`${g}-item-action-split`})))),z=v?"div":"li",p=S.createElement(z,Object.assign({},h,v?{}:{ref:e},{className:J(`${g}-item`,{[`${g}-item-no-flex`]:!N()},f)}),C==="vertical"&&d?[S.createElement("div",{className:`${g}-item-main`,key:"content"},o,j),S.createElement("div",{className:`${g}-item-extra`,key:"extra"},d)]:[o,j,ve(d,{key:"extra"})]);return v?S.createElement(Ce,{ref:e,flex:1,style:y},p):p},ue=r.forwardRef(De);ue.Meta=Ge;const Xe=ue,Fe=t=>{const{listBorderedCls:e,componentCls:n,paddingLG:o,margin:s,itemPaddingSM:d,itemPaddingLG:f,marginLG:y,borderRadiusLG:h}=t;return{[`${e}`]:{border:`${t.lineWidth}px ${t.lineType} ${t.colorBorder}`,borderRadius:h,[`${n}-header,${n}-footer,${n}-item`]:{paddingInline:o},[`${n}-pagination`]:{margin:`${s}px ${y}px`}},[`${e}${n}-sm`]:{[`${n}-item,${n}-header,${n}-footer`]:{padding:d}},[`${e}${n}-lg`]:{[`${n}-item,${n}-header,${n}-footer`]:{padding:f}}}},qe=t=>{const{componentCls:e,screenSM:n,screenMD:o,marginLG:s,marginSM:d,margin:f}=t;return{[`@media screen and (max-width:${o})`]:{[`${e}`]:{[`${e}-item`]:{[`${e}-item-action`]:{marginInlineStart:s}}},[`${e}-vertical`]:{[`${e}-item`]:{[`${e}-item-extra`]:{marginInlineStart:s}}}},[`@media screen and (max-width: ${n})`]:{[`${e}`]:{[`${e}-item`]:{flexWrap:"wrap",[`${e}-action`]:{marginInlineStart:d}}},[`${e}-vertical`]:{[`${e}-item`]:{flexWrap:"wrap-reverse",[`${e}-item-main`]:{minWidth:t.contentWidth},[`${e}-item-extra`]:{margin:`auto auto ${f}px`}}}}}},Ve=t=>{const{componentCls:e,antCls:n,controlHeight:o,minHeight:s,paddingSM:d,marginLG:f,padding:y,itemPadding:h,colorPrimary:v,itemPaddingSM:C,itemPaddingLG:O,paddingXS:c,margin:N,colorText:g,colorTextDescription:j,motionDurationSlow:z,lineWidth:p,headerBg:b,footerBg:E,emptyTextPadding:B,metaMarginBottom:I,avatarMarginRight:w,titleMarginBottom:G,descriptionFontSize:D}=t,H={};return["start","center","end"].forEach(T=>{H[`&-align-${T}`]={textAlign:T}}),{[`${e}`]:Object.assign(Object.assign({},Me(t)),{position:"relative","*":{outline:"none"},[`${e}-header`]:{background:b},[`${e}-footer`]:{background:E},[`${e}-header, ${e}-footer`]:{paddingBlock:d},[`${e}-pagination`]:Object.assign(Object.assign({marginBlockStart:f},H),{[`${n}-pagination-options`]:{textAlign:"start"}}),[`${e}-spin`]:{minHeight:s,textAlign:"center"},[`${e}-items`]:{margin:0,padding:0,listStyle:"none"},[`${e}-item`]:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:h,color:g,[`${e}-item-meta`]:{display:"flex",flex:1,alignItems:"flex-start",maxWidth:"100%",[`${e}-item-meta-avatar`]:{marginInlineEnd:w},[`${e}-item-meta-content`]:{flex:"1 0",width:0,color:g},[`${e}-item-meta-title`]:{margin:`0 0 ${t.marginXXS}px 0`,color:g,fontSize:t.fontSize,lineHeight:t.lineHeight,"> a":{color:g,transition:`all ${z}`,"&:hover":{color:v}}},[`${e}-item-meta-description`]:{color:j,fontSize:D,lineHeight:t.lineHeight}},[`${e}-item-action`]:{flex:"0 0 auto",marginInlineStart:t.marginXXL,padding:0,fontSize:0,listStyle:"none","& > li":{position:"relative",display:"inline-block",padding:`0 ${c}px`,color:j,fontSize:t.fontSize,lineHeight:t.lineHeight,textAlign:"center","&:first-child":{paddingInlineStart:0}},[`${e}-item-action-split`]:{position:"absolute",insetBlockStart:"50%",insetInlineEnd:0,width:p,height:Math.ceil(t.fontSize*t.lineHeight)-t.marginXXS*2,transform:"translateY(-50%)",backgroundColor:t.colorSplit}}},[`${e}-empty`]:{padding:`${y}px 0`,color:j,fontSize:t.fontSizeSM,textAlign:"center"},[`${e}-empty-text`]:{padding:B,color:t.colorTextDisabled,fontSize:t.fontSize,textAlign:"center"},[`${e}-item-no-flex`]:{display:"block"}}),[`${e}-grid ${n}-col > ${e}-item`]:{display:"block",maxWidth:"100%",marginBlockEnd:N,paddingBlock:0,borderBlockEnd:"none"},[`${e}-vertical ${e}-item`]:{alignItems:"initial",[`${e}-item-main`]:{display:"block",flex:1},[`${e}-item-extra`]:{marginInlineStart:f},[`${e}-item-meta`]:{marginBlockEnd:I,[`${e}-item-meta-title`]:{marginBlockStart:0,marginBlockEnd:G,color:g,fontSize:t.fontSizeLG,lineHeight:t.lineHeightLG}},[`${e}-item-action`]:{marginBlockStart:y,marginInlineStart:"auto","> li":{padding:`0 ${y}px`,"&:first-child":{paddingInlineStart:0}}}},[`${e}-split ${e}-item`]:{borderBlockEnd:`${t.lineWidth}px ${t.lineType} ${t.colorSplit}`,"&:last-child":{borderBlockEnd:"none"}},[`${e}-split ${e}-header`]:{borderBlockEnd:`${t.lineWidth}px ${t.lineType} ${t.colorSplit}`},[`${e}-split${e}-empty ${e}-footer`]:{borderTop:`${t.lineWidth}px ${t.lineType} ${t.colorSplit}`},[`${e}-loading ${e}-spin-nested-loading`]:{minHeight:o},[`${e}-split${e}-something-after-last-item ${n}-spin-container > ${e}-items > ${e}-item:last-child`]:{borderBlockEnd:`${t.lineWidth}px ${t.lineType} ${t.colorSplit}`},[`${e}-lg ${e}-item`]:{padding:O},[`${e}-sm ${e}-item`]:{padding:C},[`${e}:not(${e}-vertical)`]:{[`${e}-item-no-flex`]:{[`${e}-item-action`]:{float:"right"}}}}},Ke=je("List",t=>{const e=Ee(t,{listBorderedCls:`${t.componentCls}-bordered`,minHeight:t.controlHeightLG});return[Ve(e),Fe(e),qe(e)]},t=>({contentWidth:220,itemPadding:`${t.paddingContentVertical}px 0`,itemPaddingSM:`${t.paddingContentVerticalSM}px ${t.paddingContentHorizontal}px`,itemPaddingLG:`${t.paddingContentVerticalLG}px ${t.paddingContentHorizontalLG}px`,headerBg:"transparent",footerBg:"transparent",emptyTextPadding:t.padding,metaMarginBottom:t.padding,avatarMarginRight:t.padding,titleMarginBottom:t.paddingSM,descriptionFontSize:t.fontSize}));var Ue=globalThis&&globalThis.__rest||function(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,o=Object.getOwnPropertySymbols(t);s<o.length;s++)e.indexOf(o[s])<0&&Object.prototype.propertyIsEnumerable.call(t,o[s])&&(n[o[s]]=t[o[s]]);return n};function A(t){var e,{pagination:n=!1,prefixCls:o,bordered:s=!1,split:d=!0,className:f,rootClassName:y,style:h,children:v,itemLayout:C,loadMore:O,grid:c,dataSource:N=[],size:g,header:j,footer:z,loading:p=!1,rowKey:b,renderItem:E,locale:B}=t,I=Ue(t,["pagination","prefixCls","bordered","split","className","rootClassName","style","children","itemLayout","loadMore","grid","dataSource","size","header","footer","loading","rowKey","renderItem","locale"]);const w=n&&typeof n=="object"?n:{},[G,D]=r.useState(w.defaultCurrent||1),[H,T]=r.useState(w.defaultPageSize||10),{getPrefixCls:k,renderEmpty:X,direction:Y,list:_}=r.useContext(ae),Q={current:1,total:0},q=l=>($,M)=>{var ne;D($),T(M),n&&n[l]&&((ne=n==null?void 0:n[l])===null||ne===void 0||ne.call(n,$,M))},a=q("onChange"),m=q("onShowSizeChange"),L=(l,$)=>{if(!E)return null;let M;return typeof b=="function"?M=b(l):b?M=l[b]:M=l.key,M||(M=`list-item-${$}`),r.createElement(r.Fragment,{key:M},E(l,$))},he=()=>!!(O||n||z),u=k("list",o),[$e,fe]=Ke(u);let R=p;typeof R=="boolean"&&(R={spinning:R});const Z=R&&R.spinning;let V="";switch(g){case"large":V="lg";break;case"small":V="sm";break}const xe=J(u,{[`${u}-vertical`]:C==="vertical",[`${u}-${V}`]:V,[`${u}-split`]:d,[`${u}-bordered`]:s,[`${u}-loading`]:Z,[`${u}-grid`]:!!c,[`${u}-something-after-last-item`]:he(),[`${u}-rtl`]:Y==="rtl"},_==null?void 0:_.className,f,y,fe),x=Ne(Q,{total:N.length,current:G,pageSize:H},n||{}),re=Math.ceil(x.total/x.pageSize);x.current>re&&(x.current=re);const oe=n?r.createElement("div",{className:J(`${u}-pagination`,`${u}-pagination-align-${(e=x==null?void 0:x.align)!==null&&e!==void 0?e:"end"}`)},r.createElement(Ie,Object.assign({},x,{onChange:a,onShowSizeChange:m}))):null;let ee=le(N);n&&N.length>(x.current-1)*x.pageSize&&(ee=le(N).splice((x.current-1)*x.pageSize,x.pageSize));const ye=Object.keys(c||{}).some(l=>["xs","sm","md","lg","xl","xxl"].includes(l)),se=Pe(ye),K=r.useMemo(()=>{for(let l=0;l<ce.length;l+=1){const $=ce[l];if(se[$])return $}},[se]),be=r.useMemo(()=>{if(!c)return;const l=K&&c[K]?c[K]:c.column;if(l)return{width:`${100/l}%`,maxWidth:`${100/l}%`}},[c==null?void 0:c.column,K]);let te=Z&&r.createElement("div",{style:{minHeight:53}});if(ee.length>0){const l=ee.map(($,M)=>L($,M));te=c?r.createElement(ze,{gutter:c.gutter},r.Children.map(l,$=>r.createElement("div",{key:$==null?void 0:$.key,style:be},$))):r.createElement("ul",{className:`${u}-items`},l)}else!v&&!Z&&(te=r.createElement("div",{className:`${u}-empty-text`},B&&B.emptyText||(X==null?void 0:X("List"))||r.createElement(Le,{componentName:"List"})));const U=x.position||"bottom",Se=r.useMemo(()=>({grid:c,itemLayout:C}),[JSON.stringify(c),C]);return $e(r.createElement(ie.Provider,{value:Se},r.createElement("div",Object.assign({style:Object.assign(Object.assign({},_==null?void 0:_.style),h),className:xe},I),(U==="top"||U==="both")&&oe,j&&r.createElement("div",{className:`${u}-header`},j),r.createElement(Oe,Object.assign({},R),te,v),z&&r.createElement("div",{className:`${u}-footer`},z),O||(U==="bottom"||U==="both")&&oe)))}A.Item=Xe;const me=t=>F.post("v1/invite/wlist",{projectid:t}),ge=t=>F.post("v1/invite/updatestatus",t,{}),Je=t=>F.post("v1/members/update",t,{}),Ye=(t,e)=>F.post("v1/members/delete",{project_id:t,user_id:e}),Qe=({project_id:t,user_id:e})=>F.post("/v1/members/convert",{project_id:t,user_id:e});const Ze=t=>i.jsxs("div",{className:"memberInfo",children:[i.jsx("h1",{children:t.data.count}),i.jsx("p",{children:t.data.label})]});const et=t=>{const e=[{key:"1",count:t.data.numberCount,label:"成员"},{key:"2",count:t.data.dNumberCount,label:"申请"}];return i.jsx("div",{className:"showMember",children:e.map(n=>i.jsx(Ze,{data:n},n.key))})},at=()=>{Be().start();const t=we().state,{project_id:e}=t,[n,o]=r.useState(!1),[s,d]=r.useState(!0),[f]=r.useState(!1),[y,h]=r.useState(),[v,C]=r.useState([]),[O,c]=r.useState(0),[N,g]=r.useState(1);r.useEffect(()=>{me(e).then(a=>{a.data.code===200&&c(a.data.data.length)})},[e]);const[j,z]=r.useState(""),[p,b]=r.useState(0),E=()=>{B(),o(!0)},B=()=>{me(e).then(a=>{a.data.code===200&&C(a.data.data.reverse())})},I=r.useCallback(()=>_e(e).then(a=>{if(a.data.code===200){const m=a.data.data;g(m.length),h(m.map(L=>(d(!1),L.key=L.user_id,L)))}}),[e]),w=r.useCallback(async a=>{const m=await Ae(a);m.data.code===200&&b(m.data.data.role),I()},[I]);r.useEffect(()=>{w(e)},[w,e]);const G=()=>{o(!1)},D=!s&&!f?i.jsx("div",{style:{textAlign:"center",marginTop:12,height:32,lineHeight:"32px"}}):null,H=a=>()=>{ge({projectid:e,status:"1",id:a}).then(L=>{L.data.code===200?(P.success("已同意"),B(),I()):P.error("操作失败")})},T=a=>()=>{ge({projectid:e,status:"-1",id:a}).then(L=>{L.data.code===200?(P.success("已拒绝"),B()):P.error("操作失败")})},k=a=>()=>{a==="admin"?Qe({user_id:j,project_id:e}).then(m=>{m.data.code===200?(P.success("修改成功"),w(e),I()):P.error("修改失败")}):Je({user_id:j,project_id:e,role:a==="member"?3:a==="operator"?2:a==="admin"?1:4}).then(m=>{m.data.code===200?(P.success("修改成功"),I()):P.error("修改失败")})},X=[{label:i.jsx("div",{onClick:k("tourist"),children:"设为游客"}),key:"4"},{label:i.jsx("div",{onClick:k("member"),children:"设为成员"}),key:"3"},{label:i.jsx("div",{onClick:k("operator"),children:"设为管理者"}),key:"2"},{label:i.jsx("div",{onClick:k("admin"),children:"设为所有者"}),key:"1"}],Y=a=>a===localStorage.getItem("user_id")?"":p===1?i.jsx(Re,{menu:{items:X},trigger:["click"],children:i.jsx("a",{onClick:()=>z(a),children:"权限设置"})}):"",_=a=>{Ye(e,a).then(m=>{m.data.code===200?(P.success("移除成功"),I()):P.error("移除失败")})},Q=(a,m)=>m===localStorage.getItem("user_id")?"":p<a&&p!==0?i.jsx(We,{title:"谨慎操作！",description:"确定移除该成员吗?",onConfirm:()=>{_(m)},okText:"确定",cancelText:"取消",children:i.jsx(W,{danger:!0,children:"移除"})}):"",q={numberCount:N,dNumberCount:O};return i.jsx(He,{children:i.jsxs("div",{className:"membermgt",children:[i.jsx(et,{data:q}),p===1||p===2?i.jsxs("div",{className:"apply",children:[i.jsxs("div",{className:"title-wrap",children:[i.jsx("h3",{children:"成员管理"}),i.jsx(W,{type:"primary",onClick:E,className:"button",children:"审批列表"})]}),i.jsx("div",{children:i.jsx(Te,{title:"申请人",open:n,onCancel:G,footer:null,children:i.jsx(A,{className:"list",loading:s,itemLayout:"horizontal",dataSource:v,renderItem:a=>i.jsx(A.Item,{actions:[i.jsx(i.Fragment,{children:a.status===0?i.jsxs(i.Fragment,{children:[i.jsx(W,{type:"primary",danger:!0,onClick:T(a.id),disabled:p!==1&&p!==2,children:"拒绝"}),",",i.jsx(W,{type:"primary",onClick:H(a.id),disabled:p!==1&&p!==2,children:"同意"})]}):a.status===1?i.jsx(W,{disabled:!0,type:"default",children:"已同意"}):a.status===-1?i.jsx(W,{disabled:!0,type:"primary",style:{backgroundColor:"red",opacity:"50%",color:"black"},children:"已拒绝"}):""})],children:i.jsx(de,{avatar:!0,title:!1,loading:s,active:!0,children:i.jsx(A.Item.Meta,{title:a.name})})},a.id)})})})]}):"",i.jsx("div",{className:"apply-modal",children:i.jsx(A,{className:"list",loading:s,itemLayout:"horizontal",loadMore:D,dataSource:y,renderItem:a=>i.jsx(A.Item,{actions:[Y(a.user_id),Q(a.role,a.user_id)],children:i.jsx(de,{avatar:!0,title:!1,loading:s,active:!0,children:i.jsx(A.Item.Meta,{avatar:i.jsx(ke,{src:a.avatar_url,alt:"头像"}),title:a.name,description:`身份：${a.role===1?"管理者":a.role===2?"管理员":a.role===3?"成员":"游客"}`})})},a.user_id)})})]})})};export{at as default};
