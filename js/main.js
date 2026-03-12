/* ── Theme handling ── */
(function () {
  if (typeof CONFIG !== "undefined" && CONFIG.defaultTheme) {
    document.documentElement.setAttribute("data-theme", CONFIG.defaultTheme);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG === "undefined") return;

  /* ── Inject config values ── */
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    const val = CONFIG[key];
    if (val === undefined) return;

    if (el.tagName === "A") {
      if (key.toLowerCase().includes("email")) {
        el.href = "mailto:" + val;
      } else if (key.toLowerCase().includes("url") || key.toLowerCase().includes("website")) {
        el.href = val;
        if (key === "appStoreUrl") return; // keep button text as-is
      }
    }
    el.textContent = val;
  });

  /* ── Navigation: highlight current page ── */
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  /* ── Hamburger ── */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  /* ── Contact form ── */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.style.display = "none";
      document.querySelector(".form-success").classList.add("show");
    });
  }
});
