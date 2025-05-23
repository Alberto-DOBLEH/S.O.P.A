import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = {
    home: () => navigate("/"),
    carrito: () => navigate("/carrito"),
    cuenta: () => navigate("/mi-cuenta"),
    notificaciones: () => navigate("/notificaciones"),
    categoria: (path) => navigate(path),
    perfil: () => navigate("/mi-perfil"),
    favoritos: () => navigate("/favoritos"),
    venta: () => navigate("/vender-articulo"),
    historial: () => navigate("/historial-compras"),
    pedidos: () => navigate("/pedidos-activos"),
    tarjetas: () => navigate("/mis-tarjetas"),
    cupones: () => navigate("/cupones-promociones"),
    listaDeseos: () => navigate("/lista-deseos"),
    listaCompras: () => navigate("/lista-compras"),
    ayuda: () => navigate("/centro-ayuda"),
    privacidad: () => navigate("/privacidad-seguridad"),
    soporte: () => navigate("/contactar-soporte"),
    configuracion: () => navigate("/configuracion"),
    logout: () => navigate("/logout"),
    search: (term) => navigate(`/buscar?q=${encodeURIComponent(term)}`),
  };

  return { navigateTo };
};
