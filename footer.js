(function () {
  var footer = document.getElementById("page-footer");
  if (!footer) return;

  var desde = 2026;
  var hoy = new Date().getFullYear();
  var anios = hoy > desde ? desde + "-" + hoy : String(desde);

  footer.innerHTML =
    '<div class="site-footer__inner">' +
      '<div class="site-footer__brand">' +
        '<a class="brand" href="index.html" aria-label="Merkaly Go, ir al inicio">' +
          '<span class="brand__logo" aria-hidden="true"></span>' +
          '<span class="brand__text">MerkalyGo</span>' +
        '</a>' +
        '<p class="card__text">Software de gestión para almacenes, supermercados y más. Próximamente nuevos rubros.</p>' +
      '</div>' +

      '<div class="site-footer__column">' +
        '<p class="site-footer__title">Sitio</p>' +
        '<a href="index.html">Inicio</a>' +
        '<a href="servicios.html">Módulos</a>' +
        '<a href="postfood.html">PostFood</a>' +
        '<a href="precios.html">Precios</a>' +
        '<a href="nosotros.html">Nosotros</a>' +
        '<a href="garantias.html">Garantías</a>' +
        '<a href="contacto.html">Contacto</a>' +
      '</div>' +

      '<div class="site-footer__column">' +
        '<p class="site-footer__title">Escribinos</p>' +
        '<span>hola@merkalygo.com</span>' +
        '<span>Villa María, Córdoba, Argentina</span>' +
        '<span>Lunes a Domingo, 8 AM a 12 PM</span>' +
      '</div>' +

      '<p class="site-footer__legal">© ' + anios + ' MerkalyGo. Todos los derechos reservados.</p>' +
    '</div>';
})();
