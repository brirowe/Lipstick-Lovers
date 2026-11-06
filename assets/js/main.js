// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const header = document.querySelector(".site-header");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
}

// Soccer ball back-to-top button
const toTop = document.querySelector(".to-top");
if (toTop) {
  const check = () => toTop.classList.toggle("show", window.scrollY > 300);
  window.addEventListener("scroll", check, { passive: true });
  check();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));
}
