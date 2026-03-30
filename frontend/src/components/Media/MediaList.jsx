import React, { useEffect, useState } from 'react';
import { getMedia, deleteMedia } from '../../services/mediaService';
import MediaForm from './MediaForm';

export default function MediaList() {
  const [mediaList, setMediaList] = useState([]);
  const [editMedia, setEditMedia] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await getMedia();
      setMediaList(res.data);
    } catch (err) {
      console.error('Error al obtener media:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      fetchMedia();
    } catch (err) {
      console.error('Error al eliminar media:', err);
    }
  };

  return (
    <div>
      <h2>Media</h2>

      <MediaForm 
        editMedia={editMedia} 
        fetchMedia={fetchMedia} 
      />

      <ul>
        {mediaList.map((m) => (
          <li key={m.id}>
            <strong>{m.titulo}</strong> ({m.anio_estreno}) - {m.genero}, {m.director}, {m.productora}, {m.tipo}

            <button onClick={() => setEditMedia(m)}>
              Editar
            </button>

            <button onClick={() => handleDelete(m.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}