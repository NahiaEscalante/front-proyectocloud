import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/index.css';
import ProductosRelacionados from './ProductosRelacionados';
import { CartContext } from '../context/CartContext';
import { API_PRODUCTO } from '../../api';

const Producto = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(""); // Inicialmente vacío
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Estado para almacenar varias imágenes si el backend las proporciona

  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_PRODUCTO}/productos/${id}`); // Llamada a la API
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setName(data.nombre);
        setDescription(data.descripcion);
        setPrice(data.precio);
        setSelectedImage(data.imagen || "/src/img/default.png"); // Usa la imagen desde el backend o una predeterminada
        setImages(data.imagenes || []); // Suponiendo que el backend te devuelva un array de imágenes
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Cambiar la imagen principal al hacer clic en una miniatura
  };

  const handleAddToCart = () => {
    const item = {
      id,
      name,
      price,
      description,
      quantity,
      image: selectedImage,
      size: "Mediano",
    };

    addItemToCart(item);
    alert("Producto añadido al carrito!");
  };

  return (
    <div className="product-page">
      <main>
        <section className="product-images">
          <div className="thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}  // Imagen del backend
                alt={`Imagen ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          
          <div className="main-image">
            <img src={selectedImage} alt="Imagen del producto" />
          </div>
        </section>

        <section className="product-details">
          <h1>{name}</h1> 
          <p>Descripción:</p>
          <p>{description}</p> 
          <p>Precio: S/{price.toFixed(2)} </p> 
          <p>Categoría: Galletas</p>

          <div className="quantity-control">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button className="add-to-cart" onClick={handleAddToCart}>Añadir al Carrito</button>
        </section>
      </main>
      <ProductosRelacionados />
    </div>
  );
};

export default Producto;
