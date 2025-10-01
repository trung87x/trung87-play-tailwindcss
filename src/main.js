import "./style.css";

// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a
//       href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
//       target="_blank"
//     >
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>

document.querySelector("#app").innerHTML = `
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
`;

const htmlRoot = document.documentElement;
const iframe = document.getElementById("preview");
const frameWrap = document.getElementById("frameWrap");
const runBtn = document.getElementById("btn-run");
const resetBtn = document.getElementById("btn-reset");
const themeBtn = document.getElementById("btn-theme");
const width = document.getElementById("width");
const wlabel = document.getElementById("wlabel");
const autoRunChk = document.getElementById("auto-run");

const LS_HTML = "twg_html";
const LS_CSS = "twg_css";
const LS_JS = "twg_js";
const LS_W = "twg_width";
const LS_DARK = "twg_dark";

const DEFAULT_HTML = `<!-- Demo responsive Tailwind -->
<div class="bg-gray-600 p-4 text-sm text-white
  sm:bg-green-500 sm:text-base
  md:bg-blue-500 md:text-lg
  lg:bg-purple-500 lg:text-xl
  xl:bg-pink-500 xl:text-2xl
  2xl:bg-red-500 2xl:text-3xl">
  Responsive Demo
</div>`;
const DEFAULT_CSS = `/* Bạn có thể thêm CSS thuần nếu muốn */`;
const DEFAULT_JS = `// Viết JS ở đây
document.querySelector('div').addEventListener('click',()=>alert('Clicked!'));`;

// --- Theme helpers ---
function isDark() {
  return htmlRoot.classList.contains("dark");
}
function setThemeButton() {
  themeBtn.textContent = isDark() ? "☀️ Light" : "🌙 Dark";
}
function setDark(on) {
  htmlRoot.classList.toggle("dark", !!on);
  const theme = on ? "ace/theme/monokai" : "ace/theme/github";
  [window.htmlEditor, window.cssEditor, window.jsEditor].forEach((ed) =>
    ed?.setTheme(theme)
  );
  localStorage.setItem(LS_DARK, JSON.stringify(!!on));
  setThemeButton();
}
const storedDark = localStorage.getItem(LS_DARK);
const initialDark = storedDark
  ? JSON.parse(storedDark)
  : matchMedia("(prefers-color-scheme: dark)").matches;
if (initialDark) htmlRoot.classList.add("dark");

// --- Editors ---
function setupEditors() {
  const htmlEditor = ace.edit("html-editor");
  const cssEditor = ace.edit("css-editor");
  const jsEditor = ace.edit("js-editor");
  htmlEditor.session.setMode("ace/mode/html");
  cssEditor.session.setMode("ace/mode/css");
  jsEditor.session.setMode("ace/mode/javascript");
  const theme = isDark() ? "ace/theme/monokai" : "ace/theme/github";
  [htmlEditor, cssEditor, jsEditor].forEach((ed) => {
    ed.setTheme(theme);
    ed.setOptions({
      fontSize: "13px",
      tabSize: 2,
      useSoftTabs: true,
      wrap: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
    });
  });
  // Load
  htmlEditor.setValue(localStorage.getItem(LS_HTML) ?? DEFAULT_HTML, -1);
  cssEditor.setValue(localStorage.getItem(LS_CSS) ?? DEFAULT_CSS, -1);
  jsEditor.setValue(localStorage.getItem(LS_JS) ?? DEFAULT_JS, -1);
  // Save
  const debounce = (fn, ms) => {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), ms);
    };
  };
  htmlEditor.on(
    "change",
    debounce(() => {
      localStorage.setItem(LS_HTML, htmlEditor.getValue());
      if (autoRunChk.checked) run();
    }, 400)
  );
  cssEditor.on(
    "change",
    debounce(() => {
      localStorage.setItem(LS_CSS, cssEditor.getValue());
      if (autoRunChk.checked) run();
    }, 400)
  );
  jsEditor.on(
    "change",
    debounce(() => {
      localStorage.setItem(LS_JS, jsEditor.getValue());
      if (autoRunChk.checked) run();
    }, 400)
  );
  window.htmlEditor = htmlEditor;
  window.cssEditor = cssEditor;
  window.jsEditor = jsEditor;
}
setupEditors();
setThemeButton();

// --- Build preview ---
function buildSrcDoc(html, css, js, dark) {
  return `<!doctype html>
<html${dark ? ' class="dark"' : ""}>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <script>tailwind={config:{darkMode:'class'}}<\/script>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <style>html,body{min-height:100%;}body{padding:24px;}${css || ""}</style>
  </head>
  <body class="min-h-screen">${html || ""}
    <script>${js || ""}<\/script>
  </body>
</html>`;
}
function getHTML() {
  return window.htmlEditor?.getValue() || "";
}
function getCSS() {
  return window.cssEditor?.getValue() || "";
}
function getJS() {
  return window.jsEditor?.getValue() || "";
}

function run() {
  try {
    iframe.srcdoc = buildSrcDoc(getHTML(), getCSS(), getJS(), isDark());
  } catch (e) {
    console.error(e);
    alert("Render error: " + e.message);
  }
}

runBtn.addEventListener("click", run);
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run();
});
resetBtn.addEventListener("click", () => {
  if (!confirm("Reset sẽ xoá code hiện tại, bạn chắc không?")) return;
  window.htmlEditor.setValue(DEFAULT_HTML, -1);
  window.cssEditor.setValue(DEFAULT_CSS, -1);
  window.jsEditor.setValue(DEFAULT_JS, -1);
  width.value = 1024;
  [LS_HTML, LS_CSS, LS_JS, LS_W].forEach((k) => localStorage.removeItem(k));
  applyWidth(width.value);
  run();
});
themeBtn.addEventListener("click", () => setDark(!isDark()));

// Initial
run();

// Width control
function applyWidth(px) {
  const n = Number(px) || 1024;
  wlabel.textContent = n + "px";
  iframe.style.width = n + "px";
  localStorage.setItem(LS_W, String(n));
}
applyWidth(localStorage.getItem(LS_W) ?? width.value);
width.addEventListener("input", (e) => applyWidth(e.target.value));

// Draggable resizer
const resizer = document.getElementById("resizer");
const grid = document.querySelector("main");
let dragging = false;
resizer.addEventListener("mousedown", (e) => {
  dragging = true;
  e.preventDefault();
});
window.addEventListener("mouseup", () => (dragging = false));
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const rect = grid.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const min = 240,
    max = rect.width - 240;
  const left = Math.min(Math.max(x, min), max);
  grid.style.gridTemplateColumns = left + "px 6px 1fr";
});

// Ensure iframe min height
function ensureHeight() {
  const vh = window.innerHeight;
  const min = Math.max(360, vh - 180);
  iframe.style.minHeight = min + "px";
}
ensureHeight();
window.addEventListener("resize", ensureHeight);
