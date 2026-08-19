import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeInitializer = () => {
  const isDarkMode = useTheme((state) => state.isDarkMode);

  useEffect(() => {
    const html = document.documentElement;
    
    // SIEMPRE limpiar dark primero
    html.classList.remove('dark');
    
    // Solo agregar si está activado
    if (isDarkMode) {
      html.classList.add('dark');
    }
  }, [isDarkMode]);

  // Efecto de limpieza inicial al montar
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark');
    
    if (isDarkMode) {
      html.classList.add('dark');
    }
  }, []);

  return null;
};
