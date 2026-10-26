// Datos del negocio. Para cambiar horarios, teléfonos o fotos, edita solo este archivo.
window.RINCON = {
  telefono: "+56 9 5864 1277",
  whatsapp: "56958641277",
  correo: "contacto@elrincondelosnietos.cl",
  instagram: "https://www.instagram.com/elrincondelosnietos.cl/",
  facebook: "https://www.facebook.com/elrincondelosnietos",
  video: "YCSY5pp4B1M",

  sucursales: [
    {
      id: "valdivia",
      nombre: "Valdivia",
      lugar: "Mall Paseo Valdivia, 2° piso",
      mapa: "Mall Paseo Valdivia",
      horario: [["Lunes a sábado", "10:00 – 20:30"], ["Domingo y festivos", "11:00 – 20:30"]],
      abre: { semana: [10, 20.5], domingo: [11, 20.5] },
      color: "cherry"
    },
    {
      id: "alerce",
      nombre: "Alerce",
      lugar: "Outlet Paseo Alerce, 1er piso · Puerto Montt",
      mapa: "Outlet Paseo Alerce, Puerto Montt",
      horario: [["Lunes a sábado", "10:00 – 20:30"], ["Domingo y festivos", "11:00 – 20:30"]],
      abre: { semana: [10, 20.5], domingo: [11, 20.5] },
      color: "sun"
    },
    {
      id: "puerto-montt",
      nombre: "Puerto Montt",
      lugar: "Terminal de Buses Puerto Montt, 2° piso",
      mapa: "Terminal de Buses Puerto Montt",
      horario: [["Lunes a sábado", "11:00 – 19:00"], ["Domingo y festivos", "11:00 – 19:00"]],
      abre: { semana: [11, 19], domingo: [11, 19] },
      color: "sky"
    },
    {
      id: "pitrufquen",
      nombre: "Pitrufquén",
      lugar: "Mall LOV Pitrufquén, 5° piso",
      mapa: "Mall LOV Pitrufquén",
      horario: [["Lunes a sábado", "10:00 – 20:30"], ["Domingo y festivos", "11:00 – 20:30"]],
      abre: { semana: [10, 20.5], domingo: [11, 20.5] },
      color: "mint"
    },
    {
      id: "quillota",
      nombre: "Quillota",
      lugar: "Calle O'Higgins 150, Edificio Caracol",
      mapa: "O'Higgins 150, Quillota",
      horario: [["Lunes a sábado", "10:30 – 19:30"], ["Domingo y festivos", "Cerrado"]],
      abre: { semana: [10.5, 19.5], domingo: null },
      color: "grape"
    }
  ],

  // Fotos de ganadores. Para agregar una, súbela a assets/img/ganadores y añade una línea.
  ganadores: [
    { foto: "assets/img/ganadores/g1.webp", texto: "¡Dos campeones y una mamá orgullosa!" },
    { foto: "assets/img/ganadores/g2.webp", texto: "Premio conseguido" },
    { foto: "assets/img/ganadores/g3.webp", texto: "Directo a casa con su peluche" },
    { foto: "assets/img/ganadores/g4.webp", texto: "Tickets bien invertidos" },
    { foto: "assets/img/ganadores/g5.webp", texto: "La garra no perdona" },
    { foto: "assets/img/ganadores/g6.webp", texto: "Sonrisa de ganador" },
    { foto: "assets/img/ganadores/g7.webp", texto: "Premio mayor" },
    { foto: "assets/img/ganadores/g8.webp", texto: "¡Lo logró!" },
    { foto: "assets/img/ganadores/g9.webp", texto: "Equipo ganador" },
    { foto: "assets/img/ganadores/g10.webp", texto: "Nuevo integrante en la familia" },
    { foto: "assets/img/multimedia/m1.webp", texto: "Un oso más grande que él" },
    { foto: "assets/img/multimedia/m2.webp", texto: "Premio para la colección" },
    { foto: "assets/img/multimedia/m3.webp", texto: "Tarde de premios" },
    { foto: "assets/img/multimedia/m4.webp", texto: "Abrazo de oso" },
    { foto: "assets/img/multimedia/m5.webp", texto: "Con corazón incluido" },
    { foto: "assets/img/multimedia/m6.webp", texto: "Misión cumplida" },
    { foto: "assets/img/multimedia/m7.webp", texto: "Ganador del día" },
    { foto: "assets/img/multimedia/m8.webp", texto: "¡Mira lo que saqué!" },
    { foto: "assets/img/multimedia/m9.webp", texto: "Peluche rescatado" },
    { foto: "assets/img/multimedia/m10.webp", texto: "El mejor panorama" }
  ]
};
