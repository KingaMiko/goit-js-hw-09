const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let r;function o(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}e.addEventListener("click",(()=>{e.disabled=!0,d.style.backgroundColor=o(),r=setInterval((()=>{d.style.backgroundColor=o()}),1e3),t.disabled=!1})),t.addEventListener("click",(()=>{e.disabled=!1,clearInterval(r),t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.fd1eb1fd.js.map