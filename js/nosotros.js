// Nosotros: pestañas de sucursales con mapa, tarjetas de contacto y formulario por correo.
(function () {
  const R = window.RINCON;
  const I = window.ICONS;

  const tabs = document.getElementById("branchTabs");
  const info = document.getElementById("branchInfo");
  const map = document.getElementById("branchMap");

  tabs.innerHTML = R.sucursales.map((s) => `
    <button role="tab" id="sucursal-${s.id}" data-id="${s.id}" data-c="${s.color}" aria-selected="false">
      <b>${s.nombre}</b><small>${s.lugar}</small>
    </button>`).join("");

  function mostrar(id, scroll) {
    const s = R.sucursales.find((x) => x.id === id) || R.sucursales[0];
    tabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b.dataset.id === s.id));
    const st = window.estadoSucursal(s);
    info.innerHTML = `
      <h3>${s.nombre} <span class="status ${st.abierto ? "open" : "closed"}" style="padding:0">${st.texto}</span></h3>
      <div>
        <dl>
          <dt>Dirección</dt><dd>${s.lugar}</dd>
          ${s.horario.map(([d, h]) => `<dt>${d}</dt><dd>${h}</dd>`).join("")}
        </dl>
      </div>
      <div class="btns">
        <a class="btn btn--sun" href="${window.comoLlegarUrl(s)}" target="_blank" rel="noopener">${I.pin} Cómo llegar</a>
        <a class="btn btn--ghost" href="cumpleanos.html?sucursal=${s.id}">${I.cake} Cumpleaños aquí</a>
      </div>`;
    map.innerHTML = `<iframe src="${window.mapaUrl(s)}" title="Mapa sucursal ${s.nombre}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    if (scroll) document.getElementById("sucursales").scrollIntoView({ behavior: "smooth" });
  }

  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    history.replaceState(null, "", `#sucursal-${b.dataset.id}`);
    mostrar(b.dataset.id);
  });

  const desdeHash = () => {
    const m = location.hash.match(/^#sucursal-(.+)$/);
    mostrar(m ? m[1] : R.sucursales[0].id, !!m);
  };
  addEventListener("hashchange", desdeHash);
  desdeHash();

  // ---- Contacto ----
  const tel = R.telefono.replace(/\s/g, "");
  document.getElementById("contactCards").innerHTML = [
    [window.waLink("¡Hola! Tengo una consulta."), "#25d366", I.whatsapp, "WhatsApp", "Escríbenos ahora"],
    [`tel:${tel}`, "var(--cherry)", I.phone, "Teléfono", R.telefono],
    [`mailto:${R.correo}`, "var(--grape)", I.mail, "Correo", R.correo],
    [R.instagram, "#e1306c", I.instagram, "Instagram", "@elrincondelosnietos.cl"],
    [R.facebook, "#1877f2", I.facebook, "Facebook", "El Rincón de los Nietos"]
  ].map(([href, bg, ico, label, val]) => `
    <a class="contact-card reveal" href="${href}" ${href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
      <span class="ico" style="background:${bg}">${ico}</span>
      <span><small>${label}</small><b>${val}</b></span>
    </a>`).join("");
  document.querySelectorAll("#contactCards .reveal").forEach(window.observeReveal);

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const cuerpo = `Nombre: ${f.get("nombre")}\nTeléfono: ${f.get("telefono") || "-"}\nCorreo: ${f.get("correo")}\n\n${f.get("mensaje")}`;
    location.href = `mailto:${R.correo}?subject=${encodeURIComponent(f.get("motivo") + " · sitio web")}&body=${encodeURIComponent(cuerpo)}`;
  });
})();
