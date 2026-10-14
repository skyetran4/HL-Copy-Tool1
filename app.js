/* Pure logic (also used by test.js) */
const PH = /\[([^\]]+)\]/g;

function getFields(text) {
  const seen = [];
  for (const m of text.matchAll(PH)) if (!seen.includes(m[1])) seen.push(m[1]);
  return seen;
}

// Splits text into pieces: {text, kind} where kind is "plain" | "filled" | "empty"
function buildParts(text, values) {
  const parts = [];
  let last = 0;
  for (const m of text.matchAll(PH)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), kind: "plain" });
    let v = (values[m[1]] || "").trim();
    if (!v) {
      parts.push({ text: m[0], kind: "empty" });
    } else {
      // avoid "Dr. Dr. Smith" when the template already says "Dr. "
      if (text.slice(Math.max(0, m.index - 4), m.index) === "Dr. ") v = v.replace(/^dr\.?\s+/i, "");
      parts.push({ text: v, kind: "filled" });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), kind: "plain" });
  return parts;
}

function buildText(text, values) {
  return buildParts(text, values).map(p => p.text).join("");
}

if (typeof module !== "undefined") module.exports = { getFields, buildParts, buildText };

/* Browser UI */
if (typeof document !== "undefined") {
  const app = document.getElementById("app");
  const nav = document.getElementById("nav");
  const search = document.getElementById("search");
  const empty = document.getElementById("empty");
  const toast = document.getElementById("toast");
  let toastTimer;

  const el = (tag, cls, txt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  };

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const ta = el("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy") ? resolve() : reject();
      ta.remove();
    });
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function makeCard(t) {
    const card = el("article", "card");
    card.dataset.search = (t.title + " " + t.text).toLowerCase();
    card.appendChild(el("h3", "", t.title));

    const values = {};
    const preview = el("p", "preview");
    const render = () => {
      preview.replaceChildren(...buildParts(t.text, values).map(p => {
        const s = el("span", p.kind === "plain" ? "" : p.kind, p.text);
        return s;
      }));
    };

    const fields = getFields(t.text);
    if (fields.length) {
      const grid = el("div", "fields");
      fields.forEach(label => {
        const input = el("input");
        input.type = "text";
        input.placeholder = label;
        input.setAttribute("aria-label", label);
        input.autocomplete = "off";
        input.addEventListener("input", () => { values[label] = input.value; render(); });
        grid.appendChild(input);
      });
      card.appendChild(grid);
    }

    card.appendChild(preview);
    render();

    const btn = el("button", "copy", "Copy");
    btn.type = "button";
    btn.addEventListener("click", () => {
      copyText(buildText(t.text, values)).then(() => {
        btn.textContent = "Copied";
        btn.classList.add("done");
        showToast("Copied: " + t.title);
        setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1800);
      }, () => showToast("Copy failed. Select the text and copy manually."));
    });
    card.appendChild(btn);
    return card;
  }

  TEMPLATE_DATA.forEach((cat, i) => {
    const id = "cat-" + i;
    const sec = el("section", "category");
    sec.id = id;
    sec.appendChild(el("h2", "", cat.category));
    const list = el("div", "cards");
    cat.templates.forEach(t => list.appendChild(makeCard(t)));
    sec.appendChild(list);
    app.appendChild(sec);

    const a = el("a", "chip", cat.category);
    a.href = "#" + id;
    nav.appendChild(a);
  });

  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    let any = false;
    document.querySelectorAll(".category").forEach(sec => {
      let shown = 0;
      sec.querySelectorAll(".card").forEach(c => {
        const hit = !q || c.dataset.search.includes(q);
        c.hidden = !hit;
        if (hit) shown++;
      });
      sec.hidden = shown === 0;
      if (shown) any = true;
    });
    nav.hidden = !!q;
    empty.hidden = any;
  });
}
