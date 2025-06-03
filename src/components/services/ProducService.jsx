const DATOS_PRODUCTOS = [
  {
    id: "1",
    imagen: "https://via.placeholder.com/200",
    imagenes: [
      "https://via.placeholder.com/200",
      "https://via.placeholder.com/200/0000FF",
      "https://via.placeholder.com/200/FF0000",
    ],
    titulo: "Auriculares Bluetooth con cancelación de ruido",
    precio: 1299,
    precioOriginal: 1499,
    descuento: 13,
    calificacion: 4.8,
    numeroVentas: 1243,
    etiquetas: ["Tendencia", "Envío Gratis"],
    vendedor: "AudioPro México",
    verificado: true,
    categoria: "Audio",
    stock: 50,
    envioGratis: true,
    full: false,
    garantia: "12 meses",
    devolucion: "30 días",
    especificaciones: {
      tipo: "Inalámbrico",
      bateria: "20 horas",
      conectividad: "Bluetooth 5.0",
      color: "Negro",
    },
    descripcion:
      "Auriculares Bluetooth de alta calidad con cancelación activa de ruido, ideales para música y llamadas.",
    esOfertaDestacada: false,
  },
  {
    id: "2",
    imagen: "https://via.placeholder.com/200",
    imagenes: [
      "https://via.placeholder.com/200",
      "https://via.placeholder.com/200/FFFF00",
    ],
    titulo: "Tenis deportivos",
    precio: 999,
    precioOriginal: 1199,
    descuento: 16,
    calificacion: 5.0,
    numeroVentas: 1000,
    etiquetas: ["Tendencia", "Envío Gratis"],
    vendedor: "Adeudo México",
    verificado: true,
    categoria: "Calzado",
    stock: 30,
    envioGratis: true,
    full: false,
    garantia: "6 meses",
    devolucion: "15 días",
    especificaciones: {
      material: "Sintético",
      talla: "25-30 MX",
      color: "Blanco",
    },
    descripcion:
      "Tenis cómodos y duraderos, perfectos para actividades deportivas.",
    esOfertaDestacada: false,
  },
  {
    id: "3",
    imagen: "https://via.placeholder.com/200",
    imagenes: [
      "https://via.placeholder.com/200",
      "https://via.placeholder.com/200/00FF00",
    ],
    titulo: "Cámara deportiva 4K resistente al agua",
    precio: 2999,
    precioOriginal: 4599,
    descuento: 35,
    calificacion: 4.2,
    numeroVentas: 500,
    etiquetas: [],
    vendedor: "Tienda Oficial",
    verificado: true,
    categoria: "Cámaras",
    stock: 3,
    envioGratis: false,
    full: true,
    garantia: "6 meses",
    devolucion: "15 días",
    especificaciones: {
      resolucion: "4K 60fps",
      resistencia: "10m",
      bateria: "2 horas",
      peso: "120g",
    },
    descripcion:
      "Cámara deportiva para capturar tus aventuras en alta calidad.",
    esOfertaDestacada: true,
    tiempoRestante: "3 días",
  },
  {
    id: "4",
    imagen: "https://via.placeholder.com/200",
    imagenes: [
      "https://via.placeholder.com/200",
      "https://via.placeholder.com/200/FF00FF",
    ],
    titulo: "Zapatos deportivos ultralivianos",
    precio: 799,
    precioOriginal: 1299,
    descuento: 40,
    calificacion: 4.7,
    numeroVentas: 800,
    etiquetas: ["Envío Gratis"],
    vendedor: "Tienda Oficial",
    verificado: true,
    categoria: "Deportes",
    stock: 12,
    envioGratis: true,
    full: true,
    garantia: "3 meses",
    devolucion: "15 días",
    especificaciones: {
      material: "Malla transpirable",
      peso: "220g",
      tallas: "22-30",
      color: "Azul/Negro",
    },
    descripcion: "Zapatos ideales para correr con máxima comodidad y ligereza.",
    esOfertaDestacada: true,
    tiempoRestante: "1 día",
  },
];

export const obtenerProductosMasVendidos = async () => {
  try {
    // Simulación de llamada a una API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          DATOS_PRODUCTOS.filter((producto) => !producto.esOfertaDestacada)
        );
      }, 1000);
    });
  } catch (error) {
    throw new Error("Error al obtener productos más vendidos");
  }
};

export const obtenerOfertasDestacadas = async () => {
  try {
    // Simulación de llamada a una API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          DATOS_PRODUCTOS.filter((producto) => producto.esOfertaDestacada)
        );
      }, 800);
    });
  } catch (error) {
    throw new Error("Error al obtener ofertas destacadas");
  }
};
