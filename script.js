// ===== Mobile Menu =====
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // close menu after clicking a link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });

  // close menu when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    const isClickInside = nav.contains(e.target) || menuBtn.contains(e.target);
    if (!isClickInside) nav.classList.remove("open");
  });
}

// ===== Demo "Form" => Creates a prefilled SMS =====
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const service = (data.get("service") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const toNumber = "+19548804250"; // << your business number (E.164)
    const body =
      `Hi! My name is ${name}.%0A` +
      `Service: ${service}%0A` +
      (phone ? `My phone: ${phone}%0A` : "") +
      `Message: ${encodeURIComponent(message)}`;

    // iPhone/Android SMS deep link
    // Some devices use ?body=, some use &body=. This handles most:
    const smsLink = `sms:${toNumber}?&body=${body}`;

    window.location.href = smsLink;
  });
}
