const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      navLinks.classList.remove("is-open");
    }
  });
}

const counters = document.querySelectorAll("[data-count]");
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const start = performance.now();
  const duration = 900;

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

if ("IntersectionObserver" in window && counters.length) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.count;
  });
}
