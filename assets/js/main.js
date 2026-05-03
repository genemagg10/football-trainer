// Youth Football Trainer — main.js
// Lightweight enhancements: nav toggle, active link, tabs, smooth-scroll for in-page links.

(function () {
  "use strict";

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") navLinks.classList.remove("open");
    });
  }

  // Mark active nav link based on current path
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === path || (href === "index.html" && path === "")) {
      a.classList.add("active");
    }
  });

  // Tabs (resources page)
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = root.querySelectorAll(".tab");
    const panels = root.querySelectorAll(".tab-panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-target");
        tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
        panels.forEach((p) => p.classList.remove("active"));
        tab.setAttribute("aria-selected", "true");
        const panel = root.querySelector(`#${target}`);
        if (panel) panel.classList.add("active");
      });
    });
  });

  // Lazy-load YouTube embeds when card scrolled into view (privacy-friendly)
  const lazyFrames = document.querySelectorAll("[data-yt]");
  if (lazyFrames.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const id = el.getAttribute("data-yt");
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${id}`;
        iframe.title = el.getAttribute("data-title") || "Video";
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        el.appendChild(iframe);
        io.unobserve(el);
      });
    }, { rootMargin: "200px" });
    lazyFrames.forEach((f) => io.observe(f));
  }
})();
