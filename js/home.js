// Landing: muro de fotos en segundo plano que se mueve con el scroll y cambia de color por capítulo.
(function () {
  const R = window.RINCON;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Muro de fotos ----
  const fotos = R.ganadores.map((g) => g.foto).concat(["assets/img/local/arcade.webp", "assets/img/local/garra.webp"]);
  const wall = document.getElementById("wall");
  const COLS = 5;
  const cols = [];
  for (let c = 0; c < COLS; c++) {
    const col = document.createElement("div");
    col.className = "wall-col";
    // cada columna parte en una foto distinta y repite para cubrir toda la altura
    for (let i = 0; i < 8; i++) {
      const img = new Image();
      img.src = fotos[(c * 5 + i * 3) % fotos.length];
      img.alt = "";
      img.decoding = "async";
      if (c > 2 || i > 3) img.loading = "lazy";
      col.append(img);
    }
    wall.append(col);
    cols.push(col);
  }

  const story = document.getElementById("historia");
  let ticking = false;
  function parallax() {
    ticking = false;
    const rect = story.getBoundingClientRect();
    const total = story.offsetHeight - innerHeight;
    const p = Math.min(1, Math.max(0, -rect.top / total));
    cols.forEach((col, i) => {
      const dir = i % 2 ? 1 : -1;
      const speed = 0.55 + (i % 3) * 0.2;
      col.style.transform = `translate3d(0, ${dir * p * speed * 900 - (dir > 0 ? 500 : 0)}px, 0)`;
    });
  }
  if (!reduce) {
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
    addEventListener("resize", parallax);
    parallax();
  }

  // ---- Capítulos: color de fondo + riel de progreso ----
  const tint = document.getElementById("tint");
  const rail = document.getElementById("rail");
  const chapters = [...story.querySelectorAll(".chapter")];
  rail.innerHTML = chapters.map((ch) => `<li><a href="#${ch.id}"><span>${ch.dataset.label}</span></a></li>`).join("");
  const railLinks = [...rail.querySelectorAll("a")];

  const chapterIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const ch = e.target;
      tint.style.setProperty("--tint", ch.dataset.tint);
      tint.style.setProperty("--glow-x", ch.dataset.glow);
      railLinks.forEach((a, i) => a.classList.toggle("active", chapters[i] === ch));
    });
  }, { rootMargin: "-50% 0px -50% 0px" });
  chapters.forEach((ch) => chapterIO.observe(ch));

  const railIO = new IntersectionObserver(([e]) => rail.classList.toggle("show", e.isIntersecting), { threshold: 0.02 });
  railIO.observe(story);

  // ---- Video de fondo opcional (assets/video/fondo.mp4) ----
  const bgVideo = document.getElementById("bgVideo");
  if (!reduce && location.protocol.startsWith("http")) {
    fetch("assets/video/fondo.mp4", { method: "HEAD" }).then((r) => {
      if (!r.ok) return;
      bgVideo.src = "assets/video/fondo.mp4";
      bgVideo.addEventListener("canplay", () => { bgVideo.classList.add("ready"); bgVideo.play().catch(() => {}); }, { once: true });
      bgVideo.load();
    }).catch(() => {});
  }

  // ---- Sucursales ----
  document.getElementById("branches").innerHTML = R.sucursales.map((s) => {
    const st = window.estadoSucursal(s);
    return `
      <a class="branch reveal" data-c="${s.color}" href="nosotros.html#sucursal-${s.id}">
        <h3>${s.nombre}</h3>
        <span class="where">${s.lugar}</span>
        <span class="status ${st.abierto ? "open" : "closed"}">${st.texto}</span>
      </a>`;
  }).join("");
  document.querySelectorAll("#branches .reveal").forEach(window.observeReveal);

  // ---- Video de YouTube (se carga solo al hacer clic) ----
  const frame = document.getElementById("videoFrame");
  frame.style.backgroundImage = `url(https://i.ytimg.com/vi/${R.video}/hqdefault.jpg)`;
  frame.innerHTML = `<button aria-label="Reproducir video"><span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg></span></button>`;
  frame.querySelector("button").addEventListener("click", () => {
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${R.video}?autoplay=1&rel=0&playsinline=1" title="Video El Rincón de los Nietos" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  });

  // ---- Tira de ganadores ----
  const tira = R.ganadores.slice(0, 12).map((g) => `<img src="${g.foto}" alt="${g.texto}" loading="lazy">`).join("");
  document.getElementById("marquee").innerHTML = tira + tira.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
})();
