// import React from "react";
// import { logoLetras } from "../assets/imagenes/imagenes";

// const CarritoCompras = () => {
//   return (
//     <div className="min-h-screen bg-[#f4f6fc] p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-bold mb-6 text-[#123e9d]">
//           Mi Carrito de Compras
//         </h1>

//         <div className="flex flex-col items-center justify-center py-12">
//           <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
//           <button
//             className="bg-[#123e9d] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             onClick={() => window.history.back()}
//           >
//             Regresar a comprar
//           </button>
//         </div>

//         <footer className="mt-12 py-4 border-t flex justify-center">
//           <img
//             src={logoLetras}
//             alt="SOAP Logo"
//             className="w-[100px] hover:scale-110 transition-transform duration-200"
//           />
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default CarritoCompras;

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart as CartIcon,
  MapPin,
  Edit3,
  Check,
  X,
} from "lucide-react";
import Header from "../components/Heaader"; // Importar tu header existente
import Footer from "../components/Footer";
const ShoppingCart = () => {
  // *** INTERRUPTOR MANUAL PARA TESTING ***
  // Cambiar a true para mostrar productos, false para carrito vacío
  const [hasItems, setHasItems] = useState(false);

  // Estado para los productos del carrito
  const [cartItems, setCartItems] = useState([]);
  const [userAddress, setUserAddress] = useState({});
  const [loading, setLoading] = useState(false);

  // Estados para la gestión de direcciones
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "México",
    isDefault: false,
  });

  // Datos de ejemplo - REEMPLAZAR CON LLAMADA A LA API
  useEffect(() => {
    if (hasItems) {
      // TODO: Reemplazar con llamada real a la API
      // fetch('/api/cart')
      //   .then(response => response.json())
      //   .then(data => setCartItems(data.items))

      // Datos de ejemplo
      const exampleData = [
        {
          id: 1,
          name: "Auriculares Bluetooth con cancelación de ruido",
          price: 1299,
          quantity: 1,
          image: "/placeholder-product-1.jpg",
          discount: 20,
          stock: 15, // Stock disponible
        },
        {
          id: 2,
          name: "Tablet Android 10 pulgadas",
          price: 899,
          quantity: 1,
          image: "/placeholder-product-2.jpg",
          discount: 15,
          stock: 8, // Stock disponible
        },
      ];

      setCartItems(exampleData);

      // TODO: Obtener dirección del usuario de la API
      // fetch('/api/user/address')
      //   .then(response => response.json())
      //   .then(data => setUserAddress(data))

      setUserAddress({
        street: "Calle Constitución",
        city: "Culiacán",
        state: "Sinaloa",
        zipCode: "81893",
        country: "México",
      });

      // TODO: Obtener direcciones guardadas de la API
      // fetch('/api/user/addresses')
      //   .then(response => response.json())
      //   .then(data => setSavedAddresses(data))

      setSavedAddresses([
        {
          id: 1,
          street: "Calle Constitución 123",
          city: "Culiacán",
          state: "Sinaloa",
          zipCode: "81893",
          country: "México",
          isDefault: true,
        },
        {
          id: 2,
          street: "Av. Álvaro Obregón 456",
          city: "Culiacán",
          state: "Sinaloa",
          zipCode: "80020",
          country: "México",
          isDefault: false,
        },
      ]);
    } else {
      setCartItems([]);
    }
  }, [hasItems]);

  // Función para actualizar cantidad
  // const updateQuantity = (id, newQuantity) => {
  //   const item = cartItems.find((item) => item.id === id);
  //   if (newQuantity <= 0 || newQuantity > item.stock) return;

  //   // TODO: Llamada a API para actualizar cantidad
  //   // fetch(`/api/cart/update/${id}`, {
  //   //   method: 'PATCH',
  //   //   body: JSON.stringify({ quantity: newQuantity })
  //   // })

  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  const updateQuantity = (id, newQuantity) => {
    const item = cartItems.find((item) => item.id === id);
    if (newQuantity <= 0 || newQuantity > item.stock) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              // Actualizamos el stock mostrado (esto es solo para UI, en producción vendría de la API)
              stock: item.stock - (newQuantity - item.quantity),
            }
          : item
      )
    );
  };

  // Función para eliminar producto
  const removeItem = (id) => {
    // TODO: Llamada a API para eliminar producto
    // fetch(`/api/cart/remove/${id}`, { method: 'DELETE' })

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Función para guardar para después
  const saveForLater = (id) => {
    // TODO: Llamada a API para guardar producto
    // fetch(`/api/cart/save-later/${id}`, { method: 'POST' })

    console.log("Producto guardado para después:", id);
  };

  // Función para comprar ahora
  const buyNow = (id) => {
    // TODO: Redirigir a checkout con producto específico
    // window.location.href = `/checkout?product=${id}`;

    console.log("Comprar ahora producto:", id);
  };

  // Calcular total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  // Funciones para gestión de direcciones
  const openAddressModal = () => {
    setShowAddressModal(true);
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
    setIsEditingAddress(false);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "México",
      isDefault: false,
    });
  };

  const selectAddress = (address) => {
    setUserAddress(address);
    // TODO: Llamada a API para actualizar dirección seleccionada
    // fetch('/api/user/select-address', {
    //   method: 'POST',
    //   body: JSON.stringify({ addressId: address.id })
    // })
    closeAddressModal();
  };

  const saveNewAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.zipCode) return;

    const addressToSave = {
      ...newAddress,
      id: Date.now(), // En producción, la API generará el ID
    };

    // TODO: Llamada a API para guardar nueva dirección
    // fetch('/api/user/addresses', {
    //   method: 'POST',
    //   body: JSON.stringify(addressToSave)
    // })

    setSavedAddresses((prev) => [...prev, addressToSave]);

    if (addressToSave.isDefault) {
      setUserAddress(addressToSave);
    }

    closeAddressModal();
  };

  const deleteAddress = (addressId) => {
    // TODO: Llamada a API para eliminar dirección
    // fetch(`/api/user/addresses/${addressId}`, { method: 'DELETE' })

    setSavedAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
  };

  // Función para proceder al checkout
  const handleCheckout = () => {
    setLoading(true);

    // TODO: Llamada a API para procesar compra
    // fetch('/api/checkout', {
    //   method: 'POST',
    //   body: JSON.stringify({ items: cartItems, address: userAddress })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   window.location.href = `/checkout/${data.orderId}`;
    // })

    setTimeout(() => {
      setLoading(false);
      alert("Redirigiendo al checkout...");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc]">
      {/* Header */}
      <Header />

      {/* Panel de control para testing */}
      <div className="bg-yellow-100 border border-yellow-400 p-4 mb-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <span className="text-sm font-medium text-yellow-800">
            🧪 Panel de Testing - Eliminar ya que este la Api implementada (Es
            para calar pue)
          </span>
          <button
            onClick={() => setHasItems(!hasItems)}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
              hasItems
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {hasItems ? "🛒 Vaciar Carrito" : "📦 Llenar Carrito"}
          </button>
        </div>
      </div>

      <div className="container mx-auto bg-white rounded-lg shadow-lg p-6 mx-4 lg:mx-6 xl:mx-8">
        <h1 className="text-2xl font-bold mb-6 text-[#123e9d]">
          Mi Carrito de Compras
        </h1>

        {cartItems.length === 0 ? (
          // Carrito vacío - usando tu diseño
          <div className="flex flex-col items-center justify-center py-12">
            <CartIcon size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
            <button
              className="bg-[#123e9d] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => window.history.back()}
            >
              Regresar a comprar
            </button>
          </div>
        ) : (
          // Carrito con productos
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div className="p-6 flex items-center space-x-4">
                    {/* Imagen del producto */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded"></div>
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Artículo {item.id}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{item.name}</p>

                      {/* Información de stock */}
                      <div className="flex items-center mb-2">
                        <span className="text-xs text-gray-500 mr-2">
                          En almacén:
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            item.stock > 10
                              ? "bg-green-100 text-green-800"
                              : item.stock > 5
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.stock} unidades
                        </span>
                      </div>

                      {/* Precio con descuento */}
                      <div className="flex items-center space-x-2">
                        {item.discount > 0 && (
                          <span className="text-sm line-through text-gray-400">
                            ${item.price}
                          </span>
                        )}
                        <span className="font-bold text-lg text-gray-800">
                          ${Math.round(item.price * (1 - item.discount / 100))}
                        </span>
                        {item.discount > 0 && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                            -{item.discount}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Eliminar
                      </button>
                      <button
                        onClick={() => saveForLater(item.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => buyNow(item.id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Comprar Ahora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del pedido */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <div className="flex items-center mb-4">
                  <CartIcon className="text-gray-400 mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-gray-800">
                    Resumen
                  </h2>
                </div>

                {/* Dirección */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Dirección</h3>
                  <div className="text-sm text-gray-600">
                    <p>{userAddress.street}</p>
                    <p>Código Postal: {userAddress.zipCode}</p>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-gray-800">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-gray-800">
                      ${Math.round(calculateTotal())}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0 || loading}
                    className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      "Comprar"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Direcciones */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#123e9d] flex items-center">
                    <MapPin className="mr-2" />
                    Gestionar Direcciones
                  </h2>
                  <button
                    onClick={closeAddressModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Direcciones guardadas */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Direcciones guardadas
                  </h3>
                  <div className="space-y-3">
                    {savedAddresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          address.id === userAddress.id
                            ? "border-[#123e9d] bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => selectAddress(address)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <p className="font-medium text-gray-800">
                                {address.street}
                              </p>
                              {address.isDefault && (
                                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  Predeterminada
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.country}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAddress(address.id);
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agregar nueva dirección */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800">
                      Nueva dirección
                    </h3>
                    <button
                      onClick={() => setIsEditingAddress(!isEditingAddress)}
                      className="text-[#123e9d] hover:text-blue-700 text-sm"
                    >
                      {isEditingAddress ? "Cancelar" : "Agregar nueva"}
                    </button>
                  </div>

                  {isEditingAddress && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Calle y número
                          </label>
                          <input
                            type="text"
                            value={newAddress.street}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                street: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#123e9d] focus:border-transparent"
                            placeholder="Av. Ejemplo 123"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad
                          </label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                city: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#123e9d] focus:border-transparent"
                            placeholder="Culiacán"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado
                          </label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                state: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#123e9d] focus:border-transparent"
                            placeholder="Sinaloa"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Código Postal
                          </label>
                          <input
                            type="text"
                            value={newAddress.zipCode}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                zipCode: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#123e9d] focus:border-transparent"
                            placeholder="81893"
                          />
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={newAddress.isDefault}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              isDefault: e.target.checked,
                            })
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor="isDefault"
                          className="text-sm text-gray-700"
                        >
                          Establecer como dirección predeterminada
                        </label>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={saveNewAddress}
                          className="bg-[#123e9d] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                        >
                          <Check size={16} className="mr-1" />
                          Guardar dirección
                        </button>
                        <button
                          onClick={() => setIsEditingAddress(false)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer*/}
      <Footer />
    </div>
  );
};

export default ShoppingCart;
