const navbar = document.getElementById("navbar");
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const dropdownParent = document.querySelector(".has-dropdown");
const dropdownLink = dropdownParent
  ? dropdownParent.querySelector(".menu-link")
  : null;
const burgerIcon = burger.querySelector("i");

// === SCROLL : rétrécit la navbar quand on descend ===
const onScroll = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// === MENU BURGER : ouvre/ferme et change l'icône ===
let savedScrollY = 0;

function closeMenu() {
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Ouvrir le menu");
  menu.classList.remove("open");
  burger.classList.remove("open");
  burgerIcon.className = "fas fa-bars"; // revient à l'icône burger

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, savedScrollY);
}

function openMenu() {
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Fermer le menu");
  menu.classList.add("open");
  burger.classList.add("open");
  burgerIcon.className = "fas fa-times"; // passe en icône croix

  savedScrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.width = "100%";
}

burger.addEventListener("click", () => {
  const isOpen = burger.getAttribute("aria-expanded") === "true";
  isOpen ? closeMenu() : openMenu();
});

// ferme le menu quand on clique sur un lien (mobile)
menu
  .querySelectorAll("a.menu-link:not(.has-dropdown *), .mobile-cta")
  .forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  });

// === DROPDOWN : gestion du sous-menu sur mobile ===
if (dropdownLink) {
  dropdownLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const isOpen = dropdownParent.classList.toggle("open-sub");
      dropdownLink.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  });
}

// === THÈME : bascule entre clair et sombre ===
const root = document.documentElement;

function setTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-moon"; // lune = mode sombre
  } else {
    root.removeAttribute("data-theme");
    themeIcon.className = "fas fa-sun"; // soleil = mode clair
  }
  localStorage.setItem("nova-theme", theme);
}

themeToggle.addEventListener("click", () => {
  const current =
    root.getAttribute("data-theme") === "light" ? "light" : "dark";
  setTheme(current === "light" ? "dark" : "light");
});

// charge le thème sauvegardé
const saved = localStorage.getItem("nova-theme");
if (saved) {
  setTheme(saved);
} else {
  setTheme("dark"); // thème par défaut
}

// === RESIZE : ferme le menu si on repasse en grand écran ===
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeMenu();
});
