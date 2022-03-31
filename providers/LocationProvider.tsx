import { useEffect } from 'react';
import { useAppContext } from 'context/AppContext';

export default function LocationProvider() {
  const [context, setContext] = useAppContext();

  useEffect(() => {
    if (window === undefined) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (geolocation) => {
          // Success
          setContext({
            ...context,
            location: {
              latitude: geolocation.coords.latitude,
              longitude: geolocation.coords.longitude,
            },
          });
        },
        (_) => {
          // Error
          setContext({
            ...context,
            error: {
              code: 'ERR_LOCATION_ACCESS_DENIED',
              message: 'Ordnungsdienste müssen aktiviert werden.',
            },
          });
        }
      );
    } else {
      // No GPS available
      setContext({
        ...context,
        error: {
          code: 'ERR_LOCATION_NOT_AVAILABILE',
          message: 'Ordnungsdienste sind nicht verfügbar',
        },
      });
    }
  }, []);

  return <></>;
}
