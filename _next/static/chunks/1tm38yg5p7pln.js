(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,642636,e=>{"use strict";var t=e.i(843476),r=e.i(271645),a=e.i(861745),i=e.i(948148),o=e.i(88217),n=e.i(93944),s=e.i(895477);let l=`
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
.hf{
  --field:#15170F; --panel:#1D2016; --panel2:#232719;
  --bone:#E9E5D8; --bone-dim:#A9A998;
  --moss:#39402C; --moss-line:#2D3322;
  --olive:#8B9A5B; --olive-deep:#5E6C3A;
  --timber:#9C7A47; --signal:#E5662B; --ok:#7CA05A; --warn:#D9A441;
  --mono:'JetBrains Mono',ui-monospace,monospace;
  --disp:'Saira Condensed','Arial Narrow',sans-serif;
  --body:'Inter',system-ui,-apple-system,sans-serif;
  width:100%;max-width:860px;font-family:var(--body);color:var(--bone);font-size:15px;line-height:1.55;
  -webkit-font-smoothing:antialiased;margin:0 auto;
}
.hf *,.hf *::before,.hf *::after{box-sizing:border-box}
.hf-card{border:1px solid var(--moss-line);border-radius:14px;overflow:hidden;background:#101209}
.hf-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px 22px;
  background:linear-gradient(160deg,#1f2415,#181c10);border-bottom:1px solid var(--moss-line)}
.hf-title{font-family:var(--disp);font-weight:700;font-size:23px;letter-spacing:.06em;text-transform:uppercase;line-height:1}
.hf-sub{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--bone-dim);margin-top:5px}
.hf-guide{font-family:var(--mono);font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--olive);
  background:transparent;border:1px solid var(--olive-deep);border-radius:6px;padding:8px 12px;cursor:pointer;white-space:nowrap;transition:.15s}
.hf-guide:hover{background:var(--olive);color:#0f110a}
.hf-body{display:grid;grid-template-columns:1fr 320px;gap:0}
@media(max-width:760px){.hf-body{grid-template-columns:1fr}}
.hf-form{padding:22px 24px;border-right:1px solid var(--moss-line)}
@media(max-width:760px){.hf-form{border-right:0;border-bottom:1px solid var(--moss-line)}}
.hf-step{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--signal);margin:0 0 9px}
.hf-gender{display:flex;gap:10px;margin-bottom:22px}
.hf-gbtn{flex:1;background:#0f110a;border:1px solid var(--moss-line);border-radius:8px;padding:13px;
  font-family:var(--disp);font-weight:600;font-size:16px;text-transform:uppercase;letter-spacing:.04em;color:var(--bone-dim);
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:.15s}
.hf-gbtn[aria-pressed="true"]{border-color:var(--olive);background:var(--moss);color:#fff}
.hf-params{display:grid;grid-template-columns:1fr 1fr;gap:14px 22px}
@media(max-width:480px){.hf-params{grid-template-columns:1fr}}
.hf-field{touch-action:pan-y}
.hf-ft{display:flex;justify-content:space-between;font-size:12.5px;color:var(--bone-dim);margin-bottom:7px}
.hf-ft b{font-family:var(--mono);color:var(--olive);font-weight:500}
.hf-track{position:relative;height:4px;background:var(--moss);border-radius:3px;margin:9px 4px}
.hf-fill{position:absolute;left:0;height:100%;background:var(--olive-deep);border-radius:3px}
.hf-knob{position:absolute;top:50%;width:17px;height:17px;border-radius:50%;background:var(--bone);
  border:3px solid var(--olive-deep);transform:translate(-50%,-50%);cursor:grab;touch-action:none}
.hf-knob:active{cursor:grabbing;border-color:var(--signal)}
.hf-knob:focus-visible{outline:2px solid var(--olive);outline-offset:2px}
.hf-result{padding:22px 24px;background:linear-gradient(160deg,#1c2114,#15180e);display:flex;flex-direction:column}
.hf-rlbl{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--bone-dim);text-align:center}
.hf-big{font-family:var(--disp);font-weight:700;font-size:64px;color:var(--signal);line-height:1;text-align:center;margin:6px 0 2px}
.hf-rsub{text-align:center;font-family:var(--mono);font-size:13px;color:var(--olive)}
.hf-rows{margin:16px 0 0;border-top:1px dashed var(--moss);padding-top:14px}
.hf-row{display:flex;justify-content:space-between;font-size:13px;padding:5px 0;color:var(--bone-dim)}
.hf-row b{color:#fff;font-family:var(--mono);font-size:13px;font-weight:500}
.hf-oversize{margin-top:12px;border:1px solid var(--warn);border-radius:7px;padding:9px 11px;font-size:11.5px;color:var(--warn);line-height:1.4}
.hf-btn{width:100%;background:var(--signal);color:#180c05;border:0;border-radius:8px;padding:13px;
  font-family:var(--disp);font-weight:700;font-size:15px;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;transition:.15s}
.hf-btn:hover{filter:brightness(1.08)} .hf-btn:active{transform:translateY(1px)}
.hf-btn.ghost{background:transparent;border:1px solid var(--olive-deep);color:var(--olive);margin-top:10px}
.hf-btn.ghost:hover{background:var(--olive);color:#0f110a}
.hf-result .hf-btn:first-of-type{margin-top:auto}
.hf-reveal{border-top:1px solid var(--moss-line);padding:20px 24px}
.hf-rev-h{font-family:var(--disp);font-weight:700;font-size:16px;text-transform:uppercase;letter-spacing:.04em;color:var(--olive);margin:0 0 14px}
.hf-rev-h span{color:var(--signal)}
.hf-products{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:13px}
.hf-p{border:1px solid var(--moss-line);border-radius:8px;overflow:hidden;background:var(--panel);transition:.15s;color:inherit;text-decoration:none;display:block}
.hf-p:hover{border-color:var(--olive-deep);transform:translateY(-2px)}
.hf-p .ph{height:96px;display:grid;place-items:center;position:relative;background-size:cover;background-position:center}
.hf-p .ph .ico{font-size:32px;opacity:.5}
.hf-p .ph .bdg{position:absolute;top:6px;left:6px;font-family:var(--mono);font-size:8px;text-transform:uppercase;
  background:var(--olive);color:#0f110a;font-weight:700;padding:2px 6px;border-radius:3px}
.hf-p .pb{padding:9px 11px}
.hf-p .ln{font-family:var(--mono);font-size:8.5px;letter-spacing:.05em;color:var(--olive);text-transform:uppercase}
.hf-p .nm{font-size:12.5px;font-weight:600;margin:3px 0 7px;line-height:1.25}
.hf-p .pr{font-family:var(--disp);font-weight:700;font-size:16px;color:#fff}
.hf-p .pr span{font-size:9px;color:var(--bone-dim);font-family:var(--mono)}
.hf-saved{margin-top:16px;border:1px solid var(--olive);border-radius:8px;background:rgba(139,154,91,.08);padding:16px 18px}
.hf-saved .ok{font-family:var(--disp);font-weight:700;font-size:16px;text-transform:uppercase;color:var(--ok);margin-bottom:6px}
.hf-saved p{font-size:13px;color:var(--bone-dim);margin:0 0 11px}
.hf-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.hf-chip{font-family:var(--mono);font-size:10px;letter-spacing:.03em;padding:3px 10px;border-radius:20px;background:var(--olive);color:#0f110a;font-weight:700}
.hf-club{display:flex;flex-wrap:wrap;align-items:center;gap:12px;border-top:1px dashed var(--moss);padding-top:13px}
.hf-club .ct{font-size:13px;color:var(--bone)}
.hf-club .ct b{color:var(--olive)}
.hf-club a,.hf-club button{background:#0f110a;border:1px solid var(--signal);color:var(--signal);font-family:var(--disp);font-weight:700;
  font-size:13px;text-transform:uppercase;letter-spacing:.04em;padding:9px 16px;border-radius:7px;cursor:pointer;transition:.15s;text-decoration:none;display:inline-block}
.hf-club a:hover,.hf-club button:hover{background:var(--signal);color:#180c05}
.hf-guidepanel{border-top:1px solid var(--moss-line);padding:18px 24px;background:#0f110a}
.hf-guidepanel h4{font-family:var(--disp);font-weight:700;font-size:15px;text-transform:uppercase;letter-spacing:.04em;margin:0 0 12px}
.hf-gt{width:100%;border-collapse:collapse;font-size:12.5px}
.hf-gt th{font-family:var(--mono);font-size:9px;text-transform:uppercase;letter-spacing:.05em;color:var(--olive);text-align:left;padding:7px 10px;border-bottom:1px solid var(--olive-deep)}
.hf-gt td{padding:7px 10px;border-bottom:1px solid var(--moss-line);color:var(--bone-dim)}
.hf-gt td b{color:#fff;font-family:var(--mono)}
.hf-note{font-family:var(--mono);font-size:10px;color:var(--moss);margin-top:11px;line-height:1.5}
.hf [hidden]{display:none!important}
`;function d({k:e,min:r,max:a,val:i,unit:o,label:n}){return(0,t.jsxs)("div",{className:"hf-field","data-k":e,"data-min":r,"data-max":a,"data-val":i,"data-unit":o,children:[(0,t.jsxs)("div",{className:"hf-ft",children:[(0,t.jsx)("span",{children:n}),(0,t.jsx)("b",{children:"—"})]}),(0,t.jsxs)("div",{className:"hf-track",children:[(0,t.jsx)("div",{className:"hf-fill"}),(0,t.jsx)("div",{className:"hf-knob",tabIndex:0,role:"slider","aria-label":n,"aria-valuemin":r,"aria-valuemax":a,"aria-valuenow":i})]})]})}e.s(["FitWidget",0,function(){let e=(0,a.useLocale)(),p=(0,i.useTranslations)("fitUI"),c=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=c.current;if(!t)return;let r={height:178,weight:80},a=[];function i(){var e;let t=(0,s.recommendSize)(r.height,r.weight);return{gender:"m",body:{...r},intl:(0,s.catalogSize)(t.alpha),ru:t.ru,band:(e=r.height)<164?"158–164":e<170?"164–170":e<176?"170–176":e<182?"176–182":e<188?"182–188":"188–194",fit:"",oversize:t.outOfRange}}t.querySelectorAll(".hf-field").forEach(function(e){let t=e.dataset.k,i=+e.dataset.min,o=+e.dataset.max,n=+e.dataset.val,s=e.dataset.unit,l=e.querySelector(".hf-ft b"),d=e.querySelector(".hf-fill"),p=e.querySelector(".hf-knob"),c=e.querySelector(".hf-track");r[t]=n;let h=e=>(e-i)/(o-i)*100;function f(){p.style.left=h(n)+"%",d.style.width=h(n)+"%",l.textContent=n+" "+s,p.setAttribute("aria-valuemin",String(i)),p.setAttribute("aria-valuemax",String(o)),p.setAttribute("aria-valuenow",String(n))}function m(e){n=Math.min(o,Math.max(i,Math.round(e))),r[t]=n,f(),u()}f();let x=e=>{e.preventDefault(),p.setPointerCapture(e.pointerId);let t=c.getBoundingClientRect(),r=e=>m(i+(e.clientX-t.left)/t.width*(o-i)),a=()=>{window.removeEventListener("pointermove",r),window.removeEventListener("pointerup",a)};window.addEventListener("pointermove",r),window.addEventListener("pointerup",a)},g=e=>{("ArrowRight"===e.key||"ArrowUp"===e.key)&&(m(n+1),e.preventDefault()),("ArrowLeft"===e.key||"ArrowDown"===e.key)&&(m(n-1),e.preventDefault())};p.addEventListener("pointerdown",x),p.addEventListener("keydown",g),a.push(()=>{p.removeEventListener("pointerdown",x),p.removeEventListener("keydown",g)})});let n=t.querySelector("[data-intl]"),l=t.querySelector("[data-intl2]"),d=t.querySelector("[data-rusub]"),h=t.querySelector("[data-ru2]"),f=t.querySelector("[data-band]"),m=t.querySelector("[data-oversize]"),x=t.querySelector("[data-revsize]"),g=t.querySelector("[data-reveal]"),v=t.querySelector("[data-saved]");function u(){let e=i();n.textContent=e.intl,l.textContent=e.intl,d.textContent=p("cis")+" "+e.ru,h.textContent=String(e.ru),f.textContent=e.band,x.textContent=e.intl,m.hidden=!e.oversize,g.hidden||k(e.intl),v.hidden||z(e)}let b=t.querySelector("[data-products]");function y(e){return e.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]??e)}function w(t,r){if(b.innerHTML="",0===t.length){b.innerHTML=`<p role="status">${y(p("empty"))} <a href="${y((0,o.localizedNavigationHref)("/catalog",e))}">${y(p("openCatalog"))}</a></p>`;return}t.forEach(t=>{let a,i=t.image?`background-image:url('${y(t.image)}')`:"background:linear-gradient(135deg,#33302a,#222019)",n=`<div class="ph" style="${i}"><span class="bdg">${y(p("sizeLabel",{size:r}))}</span>${t.image?"":`<span class="ico">🧥</span>`}</div><div class="pb"><div class="ln">${y(t.ln||"HONOR")}</div><div class="nm">${y(t.nm)}</div><div class="pr">${"number"==typeof t.pr&&Number.isFinite(t.pr)?`${t.pr.toLocaleString(e)} <span>₸</span>`:y(p("priceAfterLogin"))}</div></div>`;if(t.slug){let r=document.createElement("a");r.href=(0,o.localizedNavigationHref)("/product/"+t.slug,e),r.className="hf-p",a=r}else(a=document.createElement("div")).className="hf-p";a.innerHTML=n,b.appendChild(a)})}let j=0;function k(e){let t=++j;Promise.resolve(O.fetchProducts(e,i())).then(r=>{t===j&&w(r,e)}).catch(()=>{t===j&&w([],e)})}a.push(()=>{j+=1});let N=t.querySelector("[data-chips]");function z(e){N.innerHTML=[p("sizeLabel",{size:e.intl}),...e.body.height>=190?[p("tall")]:[]].map(e=>'<span class="hf-chip">'+y(e)+"</span>").join("")}let S=t.querySelector("[data-show]"),L=()=>{g.hidden=!1,k(i().intl),g.scrollIntoView({behavior:"smooth",block:"nearest"})};S.addEventListener("click",L),a.push(()=>S.removeEventListener("click",L));let C=t.querySelector("[data-save]"),E=()=>{let e=i();g.hidden=!1,k(e.intl),v.hidden=!1,z(e),v.scrollIntoView({behavior:"smooth",block:"nearest"});try{let t;O.saveProfile(e,(t=["Размер "+e.intl],e.body.height>=190&&t.push("Высокий рост 190+"),t))}catch{}};C.addEventListener("click",E),a.push(()=>C.removeEventListener("click",E));let A=t.querySelector("[data-guidepanel]"),T=t.querySelector("[data-guide-toggle]"),q=()=>{A.hidden=!A.hidden};T.addEventListener("click",q),a.push(()=>T.removeEventListener("click",q));let O={fetchProducts:async(e,t)=>{try{let r=await fetch("/api/fit/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({size:e,gender:t.gender})});if(!r.ok)return[];let a=await r.json();return Array.isArray(a.items)?a.items:[]}catch{return[]}},saveProfile:(e,t)=>{try{localStorage.setItem("honor_fit_profile",JSON.stringify({...e,segments:t}))}catch{}fetch("/api/fit/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...e,segments:t}),keepalive:!0}).catch(()=>{})}};return u(),()=>a.forEach(e=>e())},[e,p]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{dangerouslySetInnerHTML:{__html:l}}),(0,t.jsx)("div",{className:"hf",id:"honorFit",ref:c,children:(0,t.jsxs)("div",{className:"hf-card",children:[(0,t.jsxs)("div",{className:"hf-head",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"hf-title",children:p("title")}),(0,t.jsx)("div",{className:"hf-sub",children:p("subtitle")})]}),(0,t.jsx)("button",{className:"hf-guide","data-guide-toggle":!0,type:"button",children:p("chart")})]}),(0,t.jsxs)("div",{className:"hf-body",children:[(0,t.jsxs)("div",{className:"hf-form",children:[(0,t.jsx)("div",{className:"hf-step",children:p("step")}),(0,t.jsxs)("div",{className:"hf-params","data-params":!0,children:[(0,t.jsx)(d,{k:"height",...s.CONSULTANT_BODY_LIMITS.height,val:178,unit:p("cm"),label:p("height")}),(0,t.jsx)(d,{k:"weight",...s.CONSULTANT_BODY_LIMITS.weight,val:80,unit:p("kg"),label:p("weight")})]})]}),(0,t.jsxs)("div",{className:"hf-result",children:[(0,t.jsx)("div",{className:"hf-rlbl",children:p("yourSize")}),(0,t.jsx)("div",{className:"hf-big","data-intl":!0,children:"M"}),(0,t.jsxs)("div",{className:"hf-rsub","data-rusub":!0,children:[p("cis")," 48"]}),(0,t.jsxs)("div",{className:"hf-rows",children:[(0,t.jsxs)("div",{className:"hf-row",children:[(0,t.jsx)("span",{children:p("international")}),(0,t.jsx)("b",{"data-intl2":!0,children:"M"})]}),(0,t.jsxs)("div",{className:"hf-row",children:[(0,t.jsx)("span",{children:p("cisSize")}),(0,t.jsx)("b",{"data-ru2":!0,children:"48"})]}),(0,t.jsxs)("div",{className:"hf-row",children:[(0,t.jsx)("span",{children:p("heightBand")}),(0,t.jsx)("b",{"data-band":!0,children:"176–182"})]})]}),(0,t.jsx)("div",{className:"hf-oversize","data-oversize":!0,hidden:!0,children:p("outsideRange")}),(0,t.jsx)("button",{className:"hf-btn","data-show":!0,type:"button",children:p("showProducts")}),(0,t.jsx)("button",{className:"hf-btn ghost","data-save":!0,type:"button",children:p("saveProfile")})]})]}),(0,t.jsxs)("div",{className:"hf-reveal","data-reveal":!0,hidden:!0,children:[(0,t.jsxs)("div",{className:"hf-rev-h",children:[p("matching")," ",(0,t.jsx)("span",{"data-revsize":!0,children:"M"})]}),(0,t.jsx)("div",{className:"hf-products","data-products":!0}),(0,t.jsxs)("div",{className:"hf-saved","data-saved":!0,hidden:!0,children:[(0,t.jsxs)("div",{className:"ok",children:["✓ ",p("profileSaved")]}),(0,t.jsx)("p",{children:p("savedDescription")}),(0,t.jsx)("div",{className:"hf-chips","data-chips":!0}),(0,t.jsxs)("div",{className:"hf-club",children:[(0,t.jsxs)("div",{className:"ct",children:[(0,t.jsx)("b",{children:"HONOR Club:"})," ",p("clubDescription")]}),(0,t.jsx)(n.RegisterCtaLink,{"data-join":!0,children:p("joinClub")})]})]})]}),(0,t.jsxs)("div",{className:"hf-guidepanel","data-guidepanel":!0,hidden:!0,children:[(0,t.jsx)("h4",{children:p("chartTitle")}),(0,t.jsx)("table",{className:"hf-gt",children:(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:p("heightCm")}),(0,t.jsx)("th",{children:p("weightKg")}),(0,t.jsx)("th",{children:p("international")}),(0,t.jsx)("th",{children:p("cis")})]}),s.SIZE_TABLE.map(e=>(0,t.jsxs)("tr",{children:[(0,t.jsxs)("td",{children:[e.height[0],"–",e.height[1]]}),(0,t.jsxs)("td",{children:[e.weight[0],"–",e.weight[1]]}),(0,t.jsx)("td",{children:(0,t.jsx)("b",{children:(0,s.catalogSize)(e.alpha)})}),(0,t.jsx)("td",{children:e.ru})]},e.alpha))]})}),(0,t.jsx)("div",{className:"hf-note",children:p("chartNote")})]})]})})]})}])}]);