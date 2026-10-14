// Run with: node test.js
const DATA = require("./templates.js");
const { getFields, buildText } = require("./app.js");
let n = 0, fail = 0;
const ok = (c, m) => { n++; if (!c) { fail++; console.log("FAIL:", m); } };
for (const cat of DATA) for (const t of cat.templates) {
  ok(buildText(t.text, {}) === t.text, "blank copy differs: " + t.title);
  const vals = {}; getFields(t.text).forEach(f => vals[f] = "<<" + f + ">>");
  const out = buildText(t.text, vals);
  ok(!/\[[^\]]+\]/.test(out), "unfilled bracket left: " + t.title);
  ok(getFields(t.text).every(f => out.includes("<<" + f + ">>")), "field missing in output: " + t.title);
  ok(!/\s{2,}|\s$|^\s/.test(t.text), "spacing issue: " + t.title);
  ok(!/\(/.test(t.text.replace("(316) 686-5300", "")), "stray parentheses: " + t.title);
}
ok(buildText("with Dr. [Provider] on", { Provider: "Dr. Smith" }) === "with Dr. Smith on", "Dr. dedupe");
console.log(n + " checks, " + fail + " failures");
let jsdom; try { jsdom = require("jsdom"); } catch { console.log("jsdom not installed: skipping click test"); process.exit(fail ? 1 : 0); }
const fs = require("fs");
const dom = new jsdom.JSDOM(fs.readFileSync("index.html", "utf8").replace(/<script src[^>]*><\/script>/g, ""), { runScripts: "outside-only", url: "https://x.github.io/" });
const w = dom.window; let copied = null;
Object.defineProperty(w.navigator, "clipboard", { value: { writeText: s => { copied = s; return Promise.resolve(); } } });
w.eval(fs.readFileSync("templates.js", "utf8") + fs.readFileSync("app.js", "utf8"));
(async () => {
  const cards = [...w.document.querySelectorAll(".card")];
  let c = 0;
  for (const card of cards) {
    const title = card.querySelector("h3").textContent;
    const t = DATA.flatMap(x => x.templates).find(x => x.title === title);
    copied = null; card.querySelector(".copy").click(); await new Promise(r => setTimeout(r, 5));
    if (copied !== t.text) { console.log("CLICK FAIL:", title); fail++; } else c++;
  }
  console.log(c + "/" + cards.length + " copy buttons copied the exact template text");
  process.exit(fail ? 1 : 0);
})();
