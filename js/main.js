// Cabecera, pie y utilidades compartidas por todas las páginas.
(function () {
  const R = window.RINCON;

  const ICONS = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.1H7.6v3.6h2.8V22H14v-9.9h2.8l.4-3.6H14z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M22 7l-10 6L2 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    cake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9M2 21h20M4 15c1.3 1 2.7 1 4 0s2.7-1 4 0 2.7 1 4 0 2.7-1 4 0M12 10V7M12 4.5c.6-.6.6-1.5 0-2.5-.6 1-.6 1.9 0 2.5z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  window.ICONS = ICONS;

  const waLink = (texto) => `https://wa.me/${R.whatsapp}${texto ? "?text=" + encodeURIComponent(texto) : ""}`;
  window.waLink = waLink;

  // ---- Cabecera ----
  const page = document.body.dataset.page;
  const links = [
    ["index.html", "Inicio", "inicio"],
    ["nosotros.html", "Nosotros", "nosotros"],
    ["ganadores.html", "Ganadores", "ganadores"]
  ];
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap bar">
      <a class="brand" href="index.html" aria-label="El Rincón de los Nietos, inicio">
        <img src="assets/img/logo.webp" alt="El Rincón de los Nietos" width="900" height="450">
      </a>
      <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false">${ICONS.menu}</button>
      <nav class="nav" aria-label="Principal">
        ${links.map(([href, label, id]) => `<a href="${href}"${page === id ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
        <a class="btn" href="cumpleanos.html"${page === "cumpleanos" ? ' aria-current="page"' : ""}>${ICONS.cake} Cumpleaños</a>
      </nav>
    </div>`;
  document.body.prepend(header);

  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    toggle.innerHTML = open ? ICONS.close : ICONS.menu;
  });

  // ---- Pie ----
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <span class="logo-badge"><img src="assets/img/logo.webp" alt="El Rincón de los Nietos" width="900" height="450"></span>
          <p>Salones de entretención familiar con máquinas de garra, juegos de tickets y premios. Aquí todos somos nietos.</p>
          <div class="socials">
            <a href="${R.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="${R.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICONS.facebook}</a>
            <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.whatsapp}</a>
          </div>
        </div>
        <div>
          <h4>Explora</h4>
          <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a href="nosotros.html">Quiénes somos</a></li>
            <li><a href="ganadores.html">Ganadores</a></li>
            <li><a href="cumpleanos.html">Cumpleaños</a></li>
          </ul>
        </div>
        <div>
          <h4>Sucursales</h4>
          <ul>${R.sucursales.map((s) => `<li><a href="nosotros.html#sucursal-${s.id}">${s.nombre}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li><a href="tel:${R.telefono.replace(/\s/g, "")}">${R.telefono}</a></li>
            <li><a href="mailto:${R.correo}">${R.correo}</a></li>
            <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} El Rincón de los Nietos</span>
        <span>Hecho con cariño en el sur de Chile</span>
      </div>
    </div>`;
  document.body.append(footer);

  const wa = document.createElement("a");
  wa.className = "wa-float";
  wa.href = waLink("¡Hola! Quiero información sobre El Rincón de los Nietos.");
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.setAttribute("aria-label", "Escríbenos por WhatsApp");
  wa.innerHTML = ICONS.whatsapp;
  document.body.append(wa);

  // ---- Aparición al hacer scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  window.observeReveal = (el) => io.observe(el);

  // ---- Horario: ¿abierto ahora? (hora de Chile) ----
  window.estadoSucursal = function (s) {
    const parts = new Intl.DateTimeFormat("es-CL", { timeZone: "America/Santiago", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const domingo = /^dom/i.test(get("weekday"));
    const ahora = Number(get("hour")) + Number(get("minute")) / 60;
    const rango = domingo ? s.abre.domingo : s.abre.semana;
    if (!rango) return { abierto: false, texto: "Hoy cerrado" };
    const fmt = (h) => `${Math.floor(h)}:${h % 1 ? "30" : "00"}`;
    if (ahora >= rango[0] && ahora < rango[1]) return { abierto: true, texto: `Abierto · cierra ${fmt(rango[1])}` };
    return { abierto: false, texto: ahora < rango[0] ? `Abre hoy a las ${fmt(rango[0])}` : "Cerrado por hoy" };
  };

  window.mapaUrl = (s) => `https://maps.google.com/maps?q=${encodeURIComponent(s.mapa)}&t=m&z=16&output=embed`;
  window.comoLlegarUrl = (s) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.mapa)}`;
})();
