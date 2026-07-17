// ============================================================
// DOM Practice — Part 2 (Q1 – Q37)
// Each block below is tagged with its question number so it's
// easy to find the answer to a specific task.
// ============================================================

// ---------- Nav index (built from the sections in the DOM) ----------
(function buildNav() {
  const list = document.getElementById("task-nav-list");
  document.querySelectorAll(".task").forEach(section => {
    const id = section.id;
    const num = section.querySelector(".task-id").textContent;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = `${num}`;
    li.appendChild(a);
    list.appendChild(li);
  });

  // Mobile: index starts collapsed, tap "index ▾" to expand/collapse.
  // Tapping a link also closes it again so it doesn't stay open over the content.
  const nav = document.getElementById("task-nav");
  const toggleBtn = document.getElementById("nav-toggle");
  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen);
  });
  list.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && window.matchMedia("(max-width: 760px)").matches) {
      nav.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
})();

// ============================================================
// Q8 / Q26 — Light/Dark theme toggle, persisted to localStorage
// ============================================================
(function themeToggle() {
  const body = document.body;
  const headerBtn = document.getElementById("theme-toggle");
  const demoBtn = document.getElementById("theme-toggle-2");
  const themeLabel = document.getElementById("theme-label");
  const storedThemeLabel = document.getElementById("stored-theme-label");

  function applyTheme(theme) {
    body.classList.toggle("dark-theme", theme === "dark");
    headerBtn.textContent = theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode";
    headerBtn.setAttribute("aria-pressed", theme === "dark");
    themeLabel.textContent = theme;
    storedThemeLabel.textContent = theme;
  }

  function toggle() {
    const current = body.classList.contains("dark-theme") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  headerBtn.addEventListener("click", toggle);
  demoBtn.addEventListener("click", toggle);

  // restore on load (Q26)
  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);
})();

// ============================================================
// Q1 — Color-Cycling Button
// ============================================================
(function colorCycle() {
  const colors = [
    { name: "Sunrise", hex: "#E9A23B" },
    { name: "Lagoon", hex: "#2A9D8F" },
    { name: "Dusk", hex: "#5B5FEF" },
    { name: "Blossom", hex: "#E0574C" }
  ];
  let index = 0;
  const btn = document.getElementById("cycle-btn");
  const label = document.getElementById("cycle-color-label");
  const demo = document.getElementById("demo-16");

  btn.addEventListener("click", () => {
    index = (index + 1) % colors.length;
    demo.style.background = colors[index].hex;
    demo.style.borderRadius = "10px";
    demo.style.padding = "16px";
    label.textContent = colors[index].name;
  });
})();

// ============================================================
// Q2 — Live Character Counter
// ============================================================
(function charCounter() {
  const input = document.getElementById("char-input");
  const count = document.getElementById("char-count");
  input.addEventListener("input", () => {
    count.textContent = input.value.length;
  });
})();

// ============================================================
// Q3 — Read More / Read Less
// ============================================================
(function readMore() {
  const text = document.getElementById("read-more-text");
  const toggle = document.getElementById("read-more-toggle");
  text.classList.add("is-collapsed");
  text.style.maxHeight = "48px";
  text.style.overflow = "hidden";

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const collapsed = text.style.maxHeight === "48px";
    text.style.maxHeight = collapsed ? "500px" : "48px";
    toggle.textContent = collapsed ? "Read less" : "Read more";
  });
})();

// ============================================================
// Q4 — Click Counter App
// ============================================================
(function clickCounter() {
  let count = 0;
  const display = document.getElementById("click-count");
  document.getElementById("click-btn").addEventListener("click", () => {
    count++;
    display.textContent = count;
  });
  document.getElementById("click-reset").addEventListener("click", () => {
    count = 0;
    display.textContent = count;
  });
})();

// ============================================================
// Q5 (was Q20-22) / Q25 — To-Do List: add, delete, mark done, persisted
// ============================================================
(function todoApp() {
  const STORAGE_KEY = "todos";
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
  function save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  let todos = load();

  function render() {
    list.innerHTML = "";
    todos.forEach(todo => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.className = "item-text" + (todo.done ? " done" : "");
      span.textContent = todo.text;
      span.addEventListener("click", () => {
        todo.done = !todo.done;
        save(todos);
        render();
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "✕";
      delBtn.setAttribute("aria-label", "Delete task");
      delBtn.addEventListener("click", () => {
        todos = todos.filter(t => t.id !== todo.id);
        save(todos);
        render();
      });

      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.push({ id: Date.now(), text, done: false });
    save(todos);
    input.value = "";
    render();
  });

  render();
})();

// ============================================================
// Q6 — Live Celsius to Fahrenheit
// ============================================================
(function celsiusConverter() {
  const c = document.getElementById("celsius-input");
  const f = document.getElementById("fahrenheit-output");
  function update() {
    const celsius = parseFloat(c.value) || 0;
    f.textContent = (celsius * 9 / 5 + 32).toFixed(1);
  }
  c.addEventListener("input", update);
  update();
})();

// ============================================================
// Q7 — Live Digital Clock
// ============================================================
(function digitalClock() {
  const el = document.getElementById("digital-clock");
  function tick() {
    el.textContent = new Date().toLocaleTimeString();
  }
  tick();
  setInterval(tick, 1000);
})();

// ============================================================
// Q9 — Required Field Inline Errors
// ============================================================
(function requiredForm() {
  const form = document.getElementById("required-form");
  const success = document.getElementById("required-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("[data-required]").forEach(field => {
      const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
      if (!field.value.trim()) {
        errorEl.textContent = "This field is required.";
        valid = false;
      } else {
        errorEl.textContent = "";
      }
    });
    success.textContent = valid ? "Form looks good ✓" : "";
  });

  form.querySelectorAll("[data-required]").forEach(field => {
    field.addEventListener("input", () => {
      if (field.value.trim()) {
        form.querySelector(`[data-error-for="${field.name}"]`).textContent = "";
      }
    });
  });
})();

// ============================================================
// Q10 — Image Next / Previous Swapper
// ============================================================
(function imageSwapper() {
  const images = [
    { label: "🖼️ Image 1", color: "#2A9D8F" },
    { label: "🖼️ Image 2", color: "#5B5FEF" },
    { label: "🖼️ Image 3", color: "#E9A23B" },
    { label: "🖼️ Image 4", color: "#E0574C" }
  ];
  let index = 0;
  const box = document.getElementById("swap-image");

  function render() {
    box.textContent = images[index].label;
    box.style.background = images[index].color;
  }
  document.getElementById("swap-next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    render();
  });
  document.getElementById("swap-prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    render();
  });
})();

// ============================================================
// Q11 — Save and Load a Note
// ============================================================
(function noteSaver() {
  const NOTE_KEY = "savedNote";
  const textarea = document.getElementById("note-input");
  const status = document.getElementById("note-status");

  textarea.value = localStorage.getItem(NOTE_KEY) || "";

  document.getElementById("note-save").addEventListener("click", () => {
    localStorage.setItem(NOTE_KEY, textarea.value);
    status.textContent = "Saved ✓";
    setTimeout(() => (status.textContent = ""), 1500);
  });
})();

// ============================================================
// Q12 — FAQ Accordion
// ============================================================
(function faqAccordion() {
  const faqs = [
    { q: "What is the event loop?", a: "The mechanism that lets JS handle async callbacks after the call stack is clear." },
    { q: "What is a closure?", a: "A function that remembers the variables from its outer scope even after that scope has closed." },
    { q: "What's the difference between let and var?", a: "let is block-scoped and not hoisted the same way; var is function-scoped." },
    { q: "What does debounce do?", a: "It delays calling a function until a pause in the triggering events has passed." }
  ];
  const container = document.getElementById("faq-list");

  faqs.forEach((faq, i) => {
    const item = document.createElement("div");
    item.className = "accordion-item";

    const btn = document.createElement("button");
    btn.className = "accordion-q";
    btn.innerHTML = `<span>${faq.q}</span><span>+</span>`;

    const answer = document.createElement("div");
    answer.className = "accordion-a";
    answer.textContent = faq.a;

    btn.addEventListener("click", () => {
      const isOpen = answer.classList.contains("open");
      container.querySelectorAll(".accordion-a").forEach(a => a.classList.remove("open"));
      if (!isOpen) answer.classList.add("open");
    });

    item.appendChild(btn);
    item.appendChild(answer);
    container.appendChild(item);
  });
})();

// ============================================================
// Q13 — Tabbed Content Switcher
// ============================================================
(function tabSwitcher() {
  const tabs = [
    { label: "Overview", content: "A short overview panel — this is the default active tab." },
    { label: "Details", content: "More detailed content lives here, hidden until this tab is selected." },
    { label: "Reviews", content: "A third panel, proving the switcher works for any number of tabs." }
  ];
  const buttonBar = document.getElementById("tab-buttons");
  const panelsBox = document.getElementById("tab-panels");

  tabs.forEach((tab, i) => {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (i === 0 ? " active" : "");
    btn.textContent = tab.label;
    btn.setAttribute("role", "tab");

    const panel = document.createElement("div");
    panel.className = "tab-panel" + (i === 0 ? " active" : "");
    panel.textContent = tab.content;

    btn.addEventListener("click", () => {
      buttonBar.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      panelsBox.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      panel.classList.add("active");
    });

    buttonBar.appendChild(btn);
    panelsBox.appendChild(panel);
  });
})();

// ============================================================
// Q14 — Star Rating Widget
// ============================================================
(function starRating() {
  const container = document.getElementById("star-rating");
  const valueLabel = document.getElementById("star-value");
  let rating = 0;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "★";
    star.addEventListener("click", () => {
      rating = i;
      updateStars();
      valueLabel.textContent = rating;
    });
    stars.push(star);
    container.appendChild(star);
  }

  function updateStars() {
    stars.forEach((s, i) => s.classList.toggle("filled", i < rating));
  }
})();

// ============================================================
// Q15 — Live List Search Filter
// ============================================================
(function nameFilter() {
  const names = ["Riya Sharma", "Aarav Patel", "Priya Nair", "Vikram Singh",
                 "Ananya Iyer", "Rohan Mehta", "Sneha Gupta", "Karan Kapoor"];
  const input = document.getElementById("name-filter");
  const list = document.getElementById("name-list");

  function render(filtered) {
    list.innerHTML = "";
    filtered.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      list.appendChild(li);
    });
  }

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase();
    render(names.filter(n => n.toLowerCase().includes(term)));
  });

  render(names);
})();

// ============================================================
// Q16 — Live Password Strength Meter
// ============================================================
(function passwordStrength() {
  const input = document.getElementById("password-input");
  const label = document.getElementById("password-strength");

  input.addEventListener("input", () => {
    const val = input.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    let text = "—";
    if (val.length === 0) text = "—";
    else if (score <= 1) text = "Weak";
    else if (score <= 2) text = "Medium";
    else text = "Strong";

    label.textContent = text;
  });
})();

// ============================================================
// Q17 — Click-Outside-to-Close Modal
// ============================================================
(function modalDemo() {
  const overlay = document.getElementById("modal-overlay");
  document.getElementById("modal-open").addEventListener("click", () => overlay.classList.remove("hidden"));
  document.getElementById("modal-close").addEventListener("click", () => overlay.classList.add("hidden"));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden"); // only closes on overlay itself, not the box
  });
})();

// ============================================================
// Q18 — Custom Dropdown Menu
// ============================================================
(function customDropdown() {
  const btn = document.getElementById("dropdown-btn");
  const menu = document.getElementById("dropdown-menu");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  menu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      btn.textContent = `${item.dataset.value} ▾`;
      menu.classList.add("hidden");
    });
  });

  document.addEventListener("click", () => menu.classList.add("hidden"));
})();

// ============================================================
// Q19 — Mini Shopping Cart Counter
// ============================================================
(function shoppingCart() {
  const products = [
    { name: "Notebook", price: 120 },
    { name: "Pen Set", price: 60 },
    { name: "Backpack", price: 950 }
  ];
  const grid = document.getElementById("shop-products");
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");
  let count = 0, total = 0;

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<strong>${p.name}</strong><p>₹${p.price}</p>`;
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-ghost";
    addBtn.textContent = "Add to cart";
    addBtn.addEventListener("click", () => {
      count++;
      total += p.price;
      countEl.textContent = count;
      totalEl.textContent = total;
    });
    card.appendChild(addBtn);
    grid.appendChild(card);
  });
})();

// ============================================================
// Q20 — Sortable Data Table
// ============================================================
(function sortableTable() {
  let rows = [
    { name: "Notebook", price: 120, category: "Stationery" },
    { name: "Backpack", price: 950, category: "Bags" },
    { name: "Pen Set", price: 60, category: "Stationery" },
    { name: "Water Bottle", price: 300, category: "Accessories" }
  ];
  const tbody = document.getElementById("sort-table-body");
  const headers = document.querySelectorAll("#sort-table th");
  let sortKey = null, sortAsc = true;

  function render() {
    tbody.innerHTML = "";
    rows.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${r.name}</td><td>₹${r.price}</td><td>${r.category}</td>`;
      tbody.appendChild(tr);
    });
  }

  headers.forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      const type = th.dataset.type;
      sortAsc = sortKey === key ? !sortAsc : true;
      sortKey = key;

      rows.sort((a, b) => {
        let result;
        if (type === "number") result = a[key] - b[key];
        else result = String(a[key]).localeCompare(String(b[key]));
        return sortAsc ? result : -result;
      });
      render();
    });
  });

  render();
})();

// ============================================================
// Q21 — Stopwatch with Start / Pause / Reset
// ============================================================
(function stopwatch() {
  const display = document.getElementById("stopwatch-display");
  let elapsedMs = 0;
  let intervalId = null;
  let lastTick = null;

  function format(ms) {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const tenths = Math.floor((ms % 1000) / 100);
    return `${minutes}:${seconds}.${tenths}`;
  }

  document.getElementById("sw-start").addEventListener("click", () => {
    if (intervalId) return; // already running
    lastTick = Date.now();
    intervalId = setInterval(() => {
      const now = Date.now();
      elapsedMs += now - lastTick;
      lastTick = now;
      display.textContent = format(elapsedMs);
    }, 100);
  });

  document.getElementById("sw-pause").addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
  });

  document.getElementById("sw-reset").addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    elapsedMs = 0;
    display.textContent = format(0);
  });
})();

// ============================================================
// Q22 — Multi-Step Form Wizard
// ============================================================
(function formWizard() {
  const steps = [
    "Step 1: Tell us your name and email.",
    "Step 2: Choose your plan and billing cycle.",
    "Step 3: Review and confirm your details."
  ];
  const stepsBox = document.getElementById("wizard-steps");
  const progress = document.getElementById("wizard-progress");
  const backBtn = document.getElementById("wizard-back");
  const nextBtn = document.getElementById("wizard-next");
  let current = 0;

  steps.forEach((text, i) => {
    const panel = document.createElement("div");
    panel.className = "wizard-panel" + (i === 0 ? " active" : "");
    panel.textContent = text;
    stepsBox.appendChild(panel);
  });

  function render() {
    stepsBox.querySelectorAll(".wizard-panel").forEach((p, i) => {
      p.classList.toggle("active", i === current);
    });
    progress.textContent = `Step ${current + 1} of ${steps.length}`;
    backBtn.disabled = current === 0;
    nextBtn.textContent = current === steps.length - 1 ? "Finish" : "Next";
  }

  backBtn.addEventListener("click", () => {
    if (current > 0) { current--; render(); }
  });
  nextBtn.addEventListener("click", () => {
    if (current < steps.length - 1) { current++; render(); }
    else { progress.textContent = "All done! 🎉"; }
  });

  render();
})();

// ============================================================
// Q23 — Auto-Dismissing Toast Notifications
// ============================================================
(function toastDemo() {
  const container = document.getElementById("toast-container");
  document.getElementById("toast-btn").addEventListener("click", () => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = "Saved successfully!";
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  });
})();

// ============================================================
// Q24 — Lightbox Image Gallery
// ============================================================
(function lightboxGallery() {
  const images = [
    { label: "Peak 1", color: "#2A9D8F" },
    { label: "Peak 2", color: "#5B5FEF" },
    { label: "Peak 3", color: "#E9A23B" },
    { label: "Peak 4", color: "#E0574C" }
  ];
  const thumbBox = document.getElementById("lightbox-thumbs");
  const overlay = document.getElementById("lightbox-overlay");
  const largeBox = document.getElementById("lightbox-large");

  images.forEach(img => {
    const thumb = document.createElement("div");
    thumb.className = "swatch";
    thumb.style.width = "100%";
    thumb.style.height = "70px";
    thumb.style.background = img.color;
    thumb.style.fontSize = "12px";
    thumb.textContent = img.label;
    thumb.addEventListener("click", () => {
      largeBox.style.background = img.color;
      largeBox.textContent = img.label;
      overlay.classList.remove("hidden");
    });
    thumbBox.appendChild(thumb);
  });

  document.getElementById("lightbox-close").addEventListener("click", () => overlay.classList.add("hidden"));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });
})();

// ============================================================
// Q27 — Render-Function To-Do App (state array -> single render())
// ============================================================
(function renderFnTodo() {
  let tasks = [
    { id: 1, text: "Learn render functions", done: false }
  ];
  const list = document.getElementById("render-todo-list");
  const form = document.getElementById("render-todo-form");
  const input = document.getElementById("render-todo-input");

  // The single source of truth for the DOM: always redraws everything
  // from the `tasks` array. No manual DOM patching anywhere else.
  function render() {
    list.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.className = "item-text" + (task.done ? " done" : "");
      span.textContent = task.text;
      span.addEventListener("click", () => {
        tasks = tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t);
        render();
      });
      const delBtn = document.createElement("button");
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        render();
      });
      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    tasks = [...tasks, { id: Date.now(), text, done: false }];
    input.value = "";
    render();
  });

  render();
})();

// ============================================================
// Q28 — Infinite Scrolling List
// ============================================================
(function infiniteScroll() {
  const box = document.getElementById("infinite-scroll-box");
  const list = document.getElementById("infinite-list");
  const loadingLabel = document.getElementById("infinite-loading");
  let loaded = 0;
  const batchSize = 10;
  const maxItems = 50;

  function loadMore() {
    if (loaded >= maxItems) {
      loadingLabel.textContent = "No more items.";
      return;
    }
    for (let i = 0; i < batchSize && loaded < maxItems; i++, loaded++) {
      const li = document.createElement("li");
      li.textContent = `Item #${loaded + 1}`;
      list.appendChild(li);
    }
  }

  box.addEventListener("scroll", () => {
    const nearBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 20;
    if (nearBottom) loadMore();
  });

  loadMore();
})();

// ============================================================
// Q29 — API-Powered Dashboard Cards
// ============================================================
(function dashboardCards() {
  const container = document.getElementById("dashboard-cards");

  fetch("https://dummyjson.com/products?limit=6")
    .then(res => {
      if (!res.ok) throw new Error("Request failed with status " + res.status);
      return res.json();
    })
    .then(data => {
      container.innerHTML = "";
      data.products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `<strong>${p.title}</strong><p>₹${p.price}</p>`;
        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = `<p class="hint">Couldn't load data: ${err.message}</p>`;
    });
})();

// ============================================================
// Q30 — Debounced Live API Search
// ============================================================
(function debouncedApiSearch() {
  const input = document.getElementById("api-search-input");
  const list = document.getElementById("api-search-results");
  let timer = null;

  input.addEventListener("input", () => {
    clearTimeout(timer);
    const term = input.value.trim();
    if (!term) { list.innerHTML = ""; return; }

    timer = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(term)}&limit=6`)
        .then(res => res.json())
        .then(data => {
          list.innerHTML = "";
          if (!data.products || data.products.length === 0) {
            list.innerHTML = `<li>No results</li>`;
            return;
          }
          data.products.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.title} — ₹${p.price}`;
            list.appendChild(li);
          });
        })
        .catch(() => {
          list.innerHTML = `<li>Search failed — check your connection</li>`;
        });
    }, 400);
  });
})();

// ============================================================
// Q31 — Decoupled Cart via Custom Events
// ============================================================
(function customEventCart() {
  let itemCount = 0;
  const summary = document.getElementById("event-cart-summary");

  // Producer: dispatches a custom event, knows nothing about who's listening
  document.getElementById("event-add-btn").addEventListener("click", () => {
    const event = new CustomEvent("itemAdded", { detail: { name: "Wireless Mouse" } });
    document.dispatchEvent(event);
  });

  // Consumer: fully decoupled, just listens for the event
  document.addEventListener("itemAdded", (e) => {
    itemCount++;
    summary.textContent = `Cart summary listener heard: ${itemCount} item(s) — last added "${e.detail.name}"`;
  });
})();

// ============================================================
// Q32 — Drag-and-Drop Sortable List
// ============================================================
(function dragAndDropList() {
  const items = ["Design the schema", "Build the API", "Write the tests", "Ship it"];
  const list = document.getElementById("dnd-list");
  let draggedEl = null;

  items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    li.draggable = true;

    li.addEventListener("dragstart", () => {
      draggedEl = li;
      li.classList.add("dragging");
    });
    li.addEventListener("dragend", () => li.classList.remove("dragging"));

    list.appendChild(li);
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterEl = getDragAfterElement(list, e.clientY);
    if (afterEl == null) {
      list.appendChild(draggedEl);
    } else {
      list.insertBefore(draggedEl, afterEl);
    }
  });

  function getDragAfterElement(container, y) {
    const els = [...container.querySelectorAll("li:not(.dragging)")];
    return els.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
})();

// ============================================================
// Q33 — Kanban Board with Draggable Cards
// ============================================================
(function kanbanBoard() {
  const columns = {
    "To Do": ["Design homepage", "Write copy"],
    "In Progress": ["Build nav bar"],
    "Done": ["Set up repo"]
  };
  const board = document.getElementById("kanban-board");
  let draggedCard = null;

  Object.entries(columns).forEach(([colName, cards]) => {
    const col = document.createElement("div");
    col.className = "kanban-col";
    col.dataset.column = colName;
    col.innerHTML = `<h4>${colName}</h4>`;

    cards.forEach(cardText => col.appendChild(makeCard(cardText)));

    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.classList.add("drag-over");
    });
    col.addEventListener("dragleave", () => col.classList.remove("drag-over"));
    col.addEventListener("drop", () => {
      col.classList.remove("drag-over");
      if (draggedCard) col.appendChild(draggedCard);
    });

    board.appendChild(col);
  });

  function makeCard(text) {
    const card = document.createElement("div");
    card.className = "kanban-card";
    card.textContent = text;
    card.draggable = true;
    card.addEventListener("dragstart", () => (draggedCard = card));
    return card;
  }
})();

// ============================================================
// Q34 — Form Validation via Event Delegation
// ============================================================
(function delegatedFormValidation() {
  const form = document.getElementById("delegated-form");
  const success = document.getElementById("delegated-success");

  const rules = {
    username: (v) => v.length >= 3 || "Must be at least 3 characters.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email.",
    password: (v) => v.length >= 6 || "Must be at least 6 characters."
  };

  // Single delegated listener on the form itself
  form.addEventListener("input", (e) => {
    validateField(e.target);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;
    ["username", "email", "password"].forEach(name => {
      const field = form.elements[name];
      if (!validateField(field)) allValid = false;
    });
    success.textContent = allValid ? "Account created ✓" : "";
  });

  function validateField(field) {
    if (!field || !rules[field.name]) return true;
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    const result = rules[field.name](field.value);
    errorEl.textContent = result === true ? "" : result;
    return result === true;
  }
})();

// ============================================================
// Q35 — Lazy-Loaded Image Gallery (IntersectionObserver)
// ============================================================
(function lazyGallery() {
  const gallery = document.getElementById("lazy-gallery");
  const colors = ["2A9D8F", "5B5FEF", "E9A23B", "E0574C", "8E44AD", "16A085"];

  colors.forEach((hex, i) => {
    const img = document.createElement("img");
    img.className = "lazy-img";
    img.alt = `Lazy image ${i + 1}`;
    // 1x1 transparent placeholder until it's in view
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7";
    img.dataset.src = `https://placehold.co/300x120/${hex}/ffffff?text=Image+${i + 1}`;
    gallery.appendChild(img);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { root: gallery, threshold: 0.1 });

  gallery.querySelectorAll(".lazy-img").forEach(img => observer.observe(img));
})();

// ============================================================
// Q36 — Nested Comment Thread
// ============================================================
(function nestedComments() {
  const data = [
    {
      author: "Meera", text: "Great write-up on closures!",
      replies: [
        { author: "Dev", text: "Agreed, the counter example made it click.", replies: [] }
      ]
    },
    { author: "Sahil", text: "Could you cover currying next?", replies: [] }
  ];

  const root = document.getElementById("comment-thread");

  function renderComment(comment) {
    const wrapper = document.createElement("div");
    wrapper.className = "comment";

    wrapper.innerHTML = `
      <div class="comment-meta">${comment.author}</div>
      <div class="comment-body">${comment.text}</div>
    `;

    const replyBtn = document.createElement("button");
    replyBtn.className = "comment-reply-btn";
    replyBtn.textContent = "Reply";
    wrapper.appendChild(replyBtn);

    const replyForm = document.createElement("div");
    replyForm.className = "reply-form";
    replyForm.innerHTML = `<input class="input" type="text" placeholder="Write a reply…"><button class="btn">Post</button>`;
    wrapper.appendChild(replyForm);

    const childrenBox = document.createElement("div");
    comment.replies.forEach(reply => childrenBox.appendChild(renderComment(reply)));
    wrapper.appendChild(childrenBox);

    replyBtn.addEventListener("click", () => replyForm.classList.toggle("open"));

    replyForm.querySelector("button").addEventListener("click", () => {
      const input = replyForm.querySelector("input");
      const text = input.value.trim();
      if (!text) return;
      const newReply = { author: "You", text, replies: [] };
      comment.replies.push(newReply);
      childrenBox.appendChild(renderComment(newReply));
      input.value = "";
      replyForm.classList.remove("open");
    });

    return wrapper;
  }

  data.forEach(comment => root.appendChild(renderComment(comment)));
})();

// ============================================================
// Q37 — localStorage vs sessionStorage Visit Tracker
// ============================================================
(function visitTracker() {
  const localLabel = document.getElementById("visits-local");
  const sessionLabel = document.getElementById("visits-session");

  const localVisits = (parseInt(localStorage.getItem("visits"), 10) || 0) + 1;
  localStorage.setItem("visits", localVisits);

  const sessionVisits = (parseInt(sessionStorage.getItem("visits"), 10) || 0) + 1;
  sessionStorage.setItem("visits", sessionVisits);

  localLabel.textContent = localVisits;
  sessionLabel.textContent = sessionVisits;

  document.getElementById("visits-clear").addEventListener("click", () => {
    localStorage.removeItem("visits");
    sessionStorage.removeItem("visits");
    localLabel.textContent = "1";
    sessionLabel.textContent = "1";
  });
})();