(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();document.querySelector("#app").innerHTML=`
  <div>
    <header
      class="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex-none"
    >
      <h1 class="text-lg font-semibold">Mini Tailwind Playground — Plus+</h1>
      <div class="flex items-center gap-2">
        <button
          id="btn-run"
          class="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-500"
        >
          Run ▶
        </button>
        <label
          class="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none"
        >
          <input id="auto-run" type="checkbox" class="accent-sky-600" checked />
          Auto
        </label>
        <button
          id="btn-reset"
          class="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Reset
        </button>
        <button
          id="btn-theme"
          class="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          title="Chuyển giao diện"
        >
          🌙 Dark
        </button>
        <label class="ml-2 inline-flex items-center gap-2 text-sm select-none">
          <span>Preview width</span>
          <input
            id="width"
            type="range"
            min="320"
            max="1920"
            value="1024"
            class="w-40"
          />
          <span id="wlabel" class="tabular-nums text-xs text-gray-500"
            >1024px</span
          >
        </label>
      </div>
    </header>

    <main
      class="flex-1 min-h-0 grid grid-cols-[minmax(320px,1fr)_6px_minmax(320px,1fr)]"
    >
      <!-- Editors -->
      <section class="flex flex-col min-h-0">
        <div
          class="flex items-center gap-4 px-4 py-2 border-b border-gray-200 text-sm dark:border-gray-800"
        >
          <span class="font-semibold">Editors</span>
          <span class="text-gray-500">HTML</span>
          <span class="text-gray-500">+ CSS</span>
          <span class="text-gray-500">+ JS</span>
        </div>
        <div class="grid grid-rows-3 flex-1 min-h-0">
          <div id="html-editor" class="min-h-0" style="height: 100%"></div>
          <div id="css-editor" class="min-h-0" style="height: 100%"></div>
          <div id="js-editor" class="min-h-0" style="height: 100%"></div>
        </div>
      </section>

      <!-- Resizer -->
      <div
        id="resizer"
        class="bg-gray-200 dark:bg-gray-800"
        aria-label="Resize editor/preview"
      ></div>

      <!-- Preview -->
      <section class="flex flex-col min-h-0">
        <div
          class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800"
        >
          <span class="text-sm font-semibold">Preview (sandbox)</span>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span>sm ≥ 640</span><span>·</span><span>md ≥ 768</span
            ><span>·</span> <span>lg ≥ 1024</span><span>·</span
            ><span>xl ≥ 1280</span><span>·</span>
            <span>2xl ≥ 1536</span>
          </div>
        </div>
        <div class="flex-1 overflow-auto p-4">
          <div
            id="frameWrap"
            class="mx-auto w-fit max-w-full border rounded-lg shadow-sm border-gray-200 overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-800"
          >
            <iframe
              id="preview"
              class="block"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              referrerpolicy="no-referrer"
            ></iframe>
          </div>
        </div>
      </section>  
    </main>
  </div>
`;const p=document.documentElement,h=document.getElementById("preview");document.getElementById("frameWrap");const _=document.getElementById("btn-run"),D=document.getElementById("btn-reset"),E=document.getElementById("btn-theme"),d=document.getElementById("width"),V=document.getElementById("wlabel"),c=document.getElementById("auto-run"),m="twg_html",g="twg_css",u="twg_js",f="twg_width",k="twg_dark",S=`<!-- Demo responsive Tailwind -->
<div class="bg-gray-600 p-4 text-sm text-white
  sm:bg-green-500 sm:text-base
  md:bg-blue-500 md:text-lg
  lg:bg-purple-500 lg:text-xl
  xl:bg-pink-500 xl:text-2xl
  2xl:bg-red-500 2xl:text-3xl">
  Responsive Demo
</div>`,L="/* Bạn có thể thêm CSS thuần nếu muốn */",I=`// Viết JS ở đây
document.querySelector('div').addEventListener('click',()=>alert('Clicked!'));`;function l(){return p.classList.contains("dark")}function T(){E.textContent=l()?"☀️ Light":"🌙 Dark"}function C(e){p.classList.toggle("dark",!!e);const t=e?"ace/theme/monokai":"ace/theme/github";[window.htmlEditor,window.cssEditor,window.jsEditor].forEach(r=>r?.setTheme(t)),localStorage.setItem(k,JSON.stringify(!!e)),T()}const w=localStorage.getItem(k),j=w?JSON.parse(w):matchMedia("(prefers-color-scheme: dark)").matches;j&&p.classList.add("dark");function R(){const e=ace.edit("html-editor"),t=ace.edit("css-editor"),r=ace.edit("js-editor");e.session.setMode("ace/mode/html"),t.session.setMode("ace/mode/css"),r.session.setMode("ace/mode/javascript");const o=l()?"ace/theme/monokai":"ace/theme/github";[e,t,r].forEach(n=>{n.setTheme(o),n.setOptions({fontSize:"13px",tabSize:2,useSoftTabs:!0,wrap:!0,enableBasicAutocompletion:!0,enableLiveAutocompletion:!0})}),e.setValue(localStorage.getItem(m)??S,-1),t.setValue(localStorage.getItem(g)??L,-1),r.setValue(localStorage.getItem(u)??I,-1);const s=(n,a)=>{let b;return(...M)=>{clearTimeout(b),b=setTimeout(()=>n(...M),a)}};e.on("change",s(()=>{localStorage.setItem(m,e.getValue()),c.checked&&i()},400)),t.on("change",s(()=>{localStorage.setItem(g,t.getValue()),c.checked&&i()},400)),r.on("change",s(()=>{localStorage.setItem(u,r.getValue()),c.checked&&i()},400)),window.htmlEditor=e,window.cssEditor=t,window.jsEditor=r}R();T();function O(e,t,r,o){return`<!doctype html>
<html${o?' class="dark"':""}>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <script>tailwind={config:{darkMode:'class'}}<\/script>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <style>html,body{min-height:100%;}body{padding:24px;}${t||""}</style>
  </head>
  <body class="min-h-screen">${e||""}
    <script>${r||""}<\/script>
  </body>
</html>`}function P(){return window.htmlEditor?.getValue()||""}function z(){return window.cssEditor?.getValue()||""}function A(){return window.jsEditor?.getValue()||""}function i(){try{h.srcdoc=O(P(),z(),A(),l())}catch(e){console.error(e),alert("Render error: "+e.message)}}_.addEventListener("click",i);document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="Enter"&&i()});D.addEventListener("click",()=>{confirm("Reset sẽ xoá code hiện tại, bạn chắc không?")&&(window.htmlEditor.setValue(S,-1),window.cssEditor.setValue(L,-1),window.jsEditor.setValue(I,-1),d.value=1024,[m,g,u,f].forEach(e=>localStorage.removeItem(e)),y(d.value),i())});E.addEventListener("click",()=>C(!l()));i();function y(e){const t=Number(e)||1024;V.textContent=t+"px",h.style.width=t+"px",localStorage.setItem(f,String(t))}y(localStorage.getItem(f)??d.value);d.addEventListener("input",e=>y(e.target.value));const H=document.getElementById("resizer"),v=document.querySelector("main");let x=!1;H.addEventListener("mousedown",e=>{x=!0,e.preventDefault()});window.addEventListener("mouseup",()=>x=!1);window.addEventListener("mousemove",e=>{if(!x)return;const t=v.getBoundingClientRect(),r=e.clientX-t.left,o=240,s=t.width-240,n=Math.min(Math.max(r,o),s);v.style.gridTemplateColumns=n+"px 6px 1fr"});function B(){const e=window.innerHeight,t=Math.max(360,e-180);h.style.minHeight=t+"px"}B();window.addEventListener("resize",B);
