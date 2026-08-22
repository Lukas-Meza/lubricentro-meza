import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Al cambiar de ruta vuelvo arriba; si hay hash, intento scrollear al ancla
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, search, hash]);

  return null;
}
