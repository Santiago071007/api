
import React, { useEffect, useState } from 'react';
import { getProductoras, deleteProductora } from '../../services/productoraService';
import ProductoraForm from './ProductoraForm';

export default function ProductoraList() {
  const [productoras, setProductoras] = useState([]);
  const [editProductora, setEditProductora] = useState(null);

  useEffect(() => {
    fetchProductoras();
  }, []);

  const fetchProductoras = async () => {
    try {
      const res = await getProductoras();
      setProductoras(res.data);
    } catch (err) {
      console.error('Error al obtener productoras:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductora(id);
      setProductoras(prev => prev.filter(p => p.id !== id)); // más eficiente
    } catch (err) {
      console.error('Error al eliminar productora:', err);
    }
  };

  return (
    <div>
      <h2>Productoras</h2>

      <ProductoraForm 
        editProductora={editProductora} 
        fetchProductoras={fetchProductoras} 
      />

      <ul>
        {productoras.map((p) => (
          <li key={p.id}>
            {p.nombre} ({p.descripcion})

            <button onClick={() => setEditProductora(p)}>
              Editar
            </button>

            <button onClick={() => handleDelete(p.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}