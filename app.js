// Lista de productos con imágenes y descripciones
const productos = [
  {
    id: 1,
    nombre: "Cubeta de Huevos Blanco x 30 Tipo A",
    precio: 12000,
    descripcion: "Cubeta de Huevos Blanco x 30 Tipo A.",
    imagenes: ["img/HuevosTipoAx30.jpg"],
  },
  {
    id: 2,
    nombre: "Cubeta de Huevos Rojo x 30 Tipo A",
    precio: 12000,
    descripcion: "ubeta de Huevos Rojo x 30 Tipo A.",
    imagenes: ["img/HuevoRojoTipoA.webp"],
  },
  {
    id: 3,
    nombre: "Huevo Rojo Tipo A x Unidad",
    precio: 400,
    descripcion: "Huevo Tipo A x Unidad.",
    imagenes: ["img/Huevotipoa.jpeg"],
  },
  {
    id: 4,
    nombre: "Huevo Blanco Tipo A x Unidad",
    precio: 400,
    descripcion: "Huevo Blanco Tipo a x Unidad.",
    imagenes: ["img/Huevotipoa.jpeg"],
  },
  {
    id: 5,
    nombre: "Pollo Congelado",
    precio: 20000,
    descripcion: "Pollo congelado 1Kilo.",
    imagenes: ["img/pollocongelado.jpg"],
  },
  {
    id: 6,
    nombre: "Producto 6",
    precio: 20000,
    descripcion: "Descripción detallada del Producto 5.",
    imagenes: ["img/producto3-1.jpg", "img/producto3-2.jpg"],
  },
  {
    id: 7,
    nombre: "Producto 7",
    precio: 20000,
    descripcion: "Descripción detallada del Producto 5.",
    imagenes: ["img/producto3-1.jpg", "img/producto3-2.jpg"],
  },
  {
    id: 8,
    nombre: "Producto 8",
    precio: 20000,
    descripcion: "Descripción detallada del Producto 5.",
    imagenes: ["img/producto3-1.jpg", "img/producto3-2.jpg"],
  },
];

// Elementos del DOM
const productosDiv = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonEnviar = document.getElementById("enviar-pedido");
const campoBusqueda = document.getElementById("busqueda");

let carrito = [];

// Función para mostrar productos
function mostrarProductos(productosAMostrar) {
  productosDiv.innerHTML = "";
  productosAMostrar.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto-card");
    productoDiv.innerHTML = `
      <div class="producto">
        <h3>${producto.nombre}</h3>
        <p class="precio">Precio: $${producto.precio}</p>
        <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="imagen-producto" onclick="abrirGaleria(${producto.id})">
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
      </div>
    `;
    productosDiv.appendChild(productoDiv);
  });
}

// Mostrar todos los productos al inicio
mostrarProductos(productos);

// Función para filtrar productos por nombre
campoBusqueda.addEventListener("input", (e) => {
  const terminoBusqueda = e.target.value.toLowerCase();
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda)
  );
  mostrarProductos(productosFiltrados);
});

// Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const itemEnCarrito = carrito.find((item) => item.id === id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarMensaje("¡Producto agregado al carrito!");
}

// Actualizar carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    const item = document.createElement("li");
    item.classList.add("carrito-item");

    // Mostrar solo una parte del nombre del producto en el carrito
    const nombreCorto = producto.nombre.length > 15 
      ? producto.nombre.substring(0, 15) + "..." 
      : producto.nombre;

    item.innerHTML = `
      <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="imagen-preliminar">
      <div class="carrito-detalles">
        <span class="nombre"><h5>${nombreCorto}</h5></span>
        <span class="precio"><h5>Precio: $${producto.precio}</h5></span>
        <span class="cantidad"><h5>Cantidad: ${producto.cantidad}</h5></span>
        <span class="precio-total"><h5>Subtotal: $${producto.precio * producto.cantidad}</h5></span>
      </div>
      <div class="carrito-acciones">
        <button onclick="aumentarCantidad(${producto.id})">+</button>
        <button onclick="disminuirCantidad(${producto.id})">-</button>
        <button onclick="quitarDelCarrito(${producto.id})">Quitar</button>
      </div>
    `;
    listaCarrito.appendChild(item);

    total += producto.precio * producto.cantidad;
  });

  totalCarrito.textContent = `Total: $${total}`;
}
// Enviar pedido por WhatsApp
botonEnviar.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  // Usar el nombre completo del producto en el mensaje
  const mensaje = carrito
    .map(
      (producto) =>
        `${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}`
    )
    .join("\n");

  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );
  // Mostrar el mensaje de advertencia si el total es menor a 5000
  const mensajeAdvertencia = document.getElementById("mensaje-advertencia");
  if (total < 5000) {
    mensajeAdvertencia.textContent = "El pedido debe ser minímo de $5000 para poder tramitarse.";
    mensajeAdvertencia.style.display = "block"; // Mostrar el mensaje
    return; // No continuar con el envío
  } else {
    mensajeAdvertencia.style.display = "none"; // Ocultar el mensaje si el total es suficiente
  }
// Validar si el total es menor a 5000
if (total < 5000) {
  alert("El pedido debe ser de al menos $5000 para realizar el envío.");
  return;
}
  const mensajeFinal = `Hola, quiero hacer un pedido:\n\n${mensaje}\n\nTotal: $${total}`;
  const numeroWhatsApp = "573174177110"; // Cambia por tu número de WhatsApp
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensajeFinal
  )}`;
  window.open(url, "_blank");
});

// Aumentar cantidad de un producto
function aumentarCantidad(id) {
  const item = carrito.find((producto) => producto.id === id);
  if (item) {
    item.cantidad++;
    actualizarCarrito();
  }
}

// Disminuir cantidad de un producto
function disminuirCantidad(id) {
  const item = carrito.find((producto) => producto.id === id);
  if (item) {
    item.cantidad--;
    if (item.cantidad === 0) {
      quitarDelCarrito(id);
    } else {
      actualizarCarrito();
    }
  }
}

// Quitar un producto del carrito
function quitarDelCarrito(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  actualizarCarrito();
}

// Mostrar mensaje de éxito
function mostrarMensaje(mensaje) {
  const mensajeDiv = document.createElement("div");
  mensajeDiv.classList.add("mensaje");
  mensajeDiv.textContent = mensaje;
  document.body.appendChild(mensajeDiv);

  setTimeout(() => {
    mensajeDiv.remove();
  }, 3000);
}

// Abrir galería de imágenes
function abrirGaleria(id) {
  const producto = productos.find((p) => p.id === id);
  const galeriaDiv = document.createElement("div");
  galeriaDiv.classList.add("galeria");

  let currentImageIndex = 0;

  // Función para actualizar la imagen mostrada
  function updateImage() {
    galeriaDiv.innerHTML = `<img src="${producto.imagenes[currentImageIndex]}" alt="${producto.nombre}" class="imagen-galeria">`;
  }

  // Botones de navegación
  const prevButton = document.createElement("button");
  prevButton.textContent = "←";
  prevButton.classList.add("navegacion");
  prevButton.onclick = () => {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateImage();
    }
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = "→";
  nextButton.classList.add("navegacion");
  nextButton.onclick = () => {
    if (currentImageIndex < producto.imagenes.length - 1) {
      currentImageIndex++;
      updateImage();
    }
  };

  const descripcionDiv = document.createElement("div");
  descripcionDiv.classList.add("descripcion");
  descripcionDiv.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
  `;

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.appendChild(prevButton);
  overlay.appendChild(galeriaDiv);
  overlay.appendChild(nextButton);
  overlay.appendChild(descripcionDiv);
  document.body.appendChild(overlay);

  updateImage();

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}


// Lista de mensajes para alternar
const mensajes = [
  "🚀 Domicilios dentro de Aragua de Primavera son gratuitos 🚀",
//  "🎉 ¡Compra ahora y recibe un descuento del 10%! 🎉",
  "💥 ¡Envíos gratis por compras mayores a $5000! 💥",
 // "🛍️ Nuevos productos disponibles en la tienda 🛍️"
];

// Función para cambiar el mensaje del banner
function cambiarMensajeBanner() {
  let contador = 0;
  const banner = document.getElementById("banner");
  setInterval(() => {
    banner.innerHTML = `<p><b>${mensajes[contador]}</b></p>`;
    contador = (contador + 1) % mensajes.length; // Cambia al siguiente mensaje, vuelve al inicio si llega al final
  }, 3000); // Cambiar cada 5 segundos
}

// Llamar a la función para empezar a alternar los mensajes
cambiarMensajeBanner();

