// Reserva de cumpleaños: horarios según sucursal y día, resumen en vivo y envío por WhatsApp.
(function () {
  const R = window.RINCON;
  const form = document.getElementById("bookingForm");
  const selSuc = document.getElementById("bSucursal");
  const fecha = document.getElementById("bFecha");
  const fechaHint = document.getElementById("fechaHint");
  const slots = document.getElementById("slots");
  const summary = document.getElementById("summary");
  const toast = document.getElementById("toast");
  const DURACION = 2; // horas que dura un cumpleaños

  selSuc.innerHTML = `<option value="">Elige una sucursal</option>` +
    R.sucursales.map((s) => `<option value="${s.id}">${s.nombre} · ${s.lugar}</option>`).join("");
  const pre = new URLSearchParams(location.search).get("sucursal");
  if (pre) selSuc.value = pre;

  // Fecha mínima: hoy + 3 días
  const min = new Date();
  min.setDate(min.getDate() + 3);
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  fecha.min = iso(min);

  const fmt = (h) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;
  const sucursal = () => R.sucursales.find((s) => s.id === selSuc.value);
  const fechaDate = () => (fecha.value ? new Date(fecha.value + "T12:00:00") : null);

  function renderSlots() {
    const s = sucursal();
    const d = fechaDate();
    const prev = form.hora && form.hora.value;
    fechaHint.textContent = "Reserva con al menos 3 días de anticipación.";
    fechaHint.style.color = "";
    if (!s || !d) { slots.innerHTML = `<span class="empty">Elige sucursal y fecha para ver los horarios.</span>`; return; }
    const rango = d.getDay() === 0 ? s.abre.domingo : s.abre.semana;
    if (!rango) {
      slots.innerHTML = `<span class="empty">${s.nombre} no abre ese día. Prueba con otra fecha.</span>`;
      fechaHint.textContent = `${s.nombre} cierra los domingos y festivos.`;
      fechaHint.style.color = "var(--cherry)";
      return;
    }
    const horas = [];
    for (let h = Math.ceil(rango[0]); h + DURACION <= rango[1]; h += 1) horas.push(h);
    slots.innerHTML = horas.map((h) => `
      <label><input type="radio" name="hora" value="${fmt(h)}"${fmt(h) === prev ? " checked" : ""}><span>${fmt(h)}</span></label>`).join("");
  }

  function renderSummary() {
    const s = sucursal();
    const d = fechaDate();
    const f = new FormData(form);
    const fechaTxt = d ? d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" }) : "";
    const rows = [
      ["Festejado", f.get("festejado") ? `${f.get("festejado")}${f.get("edad") ? ` · ${f.get("edad")} años` : ""}` : ""],
      ["Sucursal", s ? s.nombre : ""],
      ["Fecha", fechaTxt],
      ["Hora", f.get("hora") ? `${f.get("hora")} hrs` : ""],
      ["Paquete", f.get("paquete")],
      ["Invitados", f.get("invitados")]
    ];
    summary.innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd class="${v ? "" : "empty"}">${v || "Por definir"}</dd></div>`).join("");
  }

  selSuc.addEventListener("change", () => { renderSlots(); renderSummary(); });
  fecha.addEventListener("change", () => { renderSlots(); renderSummary(); });
  form.addEventListener("input", renderSummary);
  form.addEventListener("change", renderSummary);

  // Botones "Elegir" de los paquetes
  document.querySelectorAll("[data-plan]").forEach((a) => a.addEventListener("click", () => {
    document.getElementById("bPaquete").value = a.dataset.plan;
    renderSummary();
  }));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    toast.classList.remove("show");
    if (!form.hora || !form.hora.value) {
      if (form.checkValidity()) {
        toast.textContent = "Elige una hora de inicio para tu cumpleaños.";
        toast.style.cssText = "background:#ffe8ee;color:#b0103c";
        toast.classList.add("show");
        slots.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const s = sucursal();
    const f = new FormData(form);
    const d = fechaDate().toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const detalle = [
      `• Sucursal: ${s.nombre} (${s.lugar})`,
      `• Fecha: ${d}`,
      `• Hora: ${f.get("hora")} hrs`,
      `• Paquete: ${f.get("paquete")}`,
      `• Invitados: ${f.get("invitados")}`,
      `• Festejado: ${f.get("festejado")}, cumple ${f.get("edad")} años`,
      `• Adulto responsable: ${f.get("adulto")}`,
      `• Teléfono: ${f.get("telefono")}`,
      f.get("correo") ? `• Correo: ${f.get("correo")}` : "",
      f.get("notas") ? `• Comentarios: ${f.get("notas")}` : ""
    ].filter(Boolean);
    const msg = ["¡Hola! Quiero reservar un cumpleaños 🎉", "", ...detalle].join("\n");

    window.open(window.waLink(msg), "_blank", "noopener");
    toast.style.cssText = "";
    toast.textContent = "¡Listo! Se abrió WhatsApp con tu solicitud. Solo presiona enviar y te confirmamos la disponibilidad.";
    toast.classList.add("show");
  });

  renderSlots();
  renderSummary();
})();
