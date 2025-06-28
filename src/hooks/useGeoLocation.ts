import { useEffect, useState } from 'react';

export function useGeoLocation() {
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`
          );
          const data = await res.json();
          const cityName =
            data?.address?.city ||
            null;

          setCity(cityName);
        } catch (err) {
          setError('Ошибка при получении города');
        } finally {
          setLoading(false);
        }
      },
      (geoErr) => {
        setError(geoErr.message);
        setLoading(false);
      }
    );
  }, []);

  return { city, error, loading };
}



