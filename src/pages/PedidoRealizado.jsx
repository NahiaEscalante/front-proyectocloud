import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../styles/PedidoRealizado.css'; // Asegúrate de tener los estilos importados

const PedidoRealizado = () => {
  const { idPedido } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleVolverATienda = () => {
    navigate('/'); // Redirige a la página principal (home)
  };

  return (
    <div className="pedido-container">
      <div className="pedido-card">
        <h1 className="pedido-title">¡Gracias por tu compra!</h1>
        <p className="pedido-message">{location.state?.mensaje || "Tu pedido ha sido procesado exitosamente."}</p>
        
        <div className="pedido-info">
          <h3>Detalles del Pedido</h3>
          <p><strong>ID del Pedido:</strong> {idPedido}</p>
        </div>
        
        <div className="pedido-buttons">
          <button onClick={handleVolverATienda} className="pedido-button">Volver a la tienda</button>
          <button className="pedido-button pedido-button-secondary">Ver más detalles</button>
        </div>
      </div>
    </div>
  );
};

export default PedidoRealizado;

