import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const updateDOM = (isDark: boolean) => {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleTheme: () => {
        const newMode = !get().isDarkMode;
        updateDOM(newMode);
        set({ isDarkMode: newMode });
      },
      setTheme: (isDark) => {
        updateDOM(isDark);
        set({ isDarkMode: isDark });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Inicializar el tema al cargar
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('theme-storage');
  if (stored) {
    try {
      const { state } = JSON.parse(stored);
      updateDOM(state.isDarkMode);
    } catch (e) {
      console.error('Error loading theme:', e);
      updateDOM(false);
    }
  }
}
