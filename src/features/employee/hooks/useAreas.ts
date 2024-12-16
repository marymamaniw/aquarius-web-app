import { useState, useEffect } from 'react';
import { Area } from '../../../models/AreaModels';
import { getAllAreas } from '../../../api/area';

const useAreas = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAreas = async () => {
    try {
      setLoading(true);
      const data = await getAllAreas();
      setAreas(data);
      setError(null);
    } catch (error) {
      setError(`Error al obtener las áreas ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return { areas, loading, error };
};

export default useAreas;
