import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SuggestedProducts = ({ currentProductId, currentProductCategory }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch("/products.json"); 
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();

      // Filtrar productos diferentes al actual y con la misma categoría
      const productosFiltrados = data.filter(
        (producto) =>
          producto.id !== parseInt(currentProductId) &&
          producto.categoria === currentProductCategory
      );

      setProductos(productosFiltrados.slice(0, 4)); 
    } catch (error) {
      console.error("Error al cargar los productos sugeridos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [currentProductId, currentProductCategory]);

  return (
    <div className="mt-5">
      <h4 className="mb-4 d-flex align-items-center justify-content-center">
        Productos que te podrían gustar
      </h4>
      {loading ? (
        <p>Cargando productos sugeridos...</p>
      ) : (
        <div className="row">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div
                key={producto.id}
                className="col-6 col-md-3 mb-4"
              >
                <div className="card h-100">
                  <img
                    src={`/assets/${producto.imagen}`}
                    alt={producto.nombre}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">Precio: ${producto.precio}</p>
                    <Link
                      to={`/item/${producto.id}`}
                      className="btn btn-vermas btn-sm"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos sugeridos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestedProducts;
