// src/components/Navbar.tsx
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Sincronizar con el tema del sistema al montar el componente
  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(currentTheme);
    setMounted(true);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  // Centralizamos las clases para garantizar consistencia absoluta entre estados
  const navStyles = "fixed w-full top-0 z-50 flex justify-between items-center px-8 py-6 bg-cyber-navbar/90 backdrop-blur-md border-b border-cyber-grid transition-colors duration-300";
  const titleStyles = "text-xl font-black uppercase tracking-tighter text-white";
  const buttonStyles = "border border-cyber-grid-light hover:border-gray-300 px-6 py-2 text-xs font-mono text-gray-300 hover:text-gray-300 uppercase tracking-widest transition-colors flex items-center gap-2 bg-transparent cursor-pointer";

  // Estado del servidor (Pre-hidratación): Misma estructura y estilos visuales
  if (!mounted) {
    return (
      <nav className={navStyles}>
        <div className={titleStyles}>
          Victor_Molina<span className="text-primary">.</span>Dev
        </div>
        <div className={buttonStyles}>
          <span>Mode</span>
          {/* El indicador se adapta automáticamente usando las clases de Tailwind dark: */}
          <div className="w-2 h-2 bg-gray-300 dark:bg-primary"></div>
        </div>
      </nav>
    );
  }

  // Estado del cliente (Hydrated): Añade la interactividad del botón
  return (
    <nav className={navStyles}>
      <div className={titleStyles}>
        Victor_Molina<span className="text-primary">.</span>Dev
      </div>
      
      <button 
        onClick={handleToggleTheme}
        className={buttonStyles}
      >
        <span>Mode</span>
        <div className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-300' : 'bg-primary'}`}></div>
      </button>
    </nav>
  );
}