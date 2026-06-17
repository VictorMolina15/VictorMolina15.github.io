// src/components/Navbar.tsx
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Al cargar el componente, sincronizar con el tema actual
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

  // Renderizar un botón placeholder mientras se monta
  if (!mounted) {
    return (
      <nav className="fixed w-full top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md transition-colors duration-300 shadow-sm dark:shadow-gray-800">
        <div className="text-2xl font-bold font-mono tracking-tighter text-gray-900 dark:text-white">
          Victor Molina
        </div>
        <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium">
            Mode
        </button>
      </nav>
    );
  }

 return (
  <nav className="fixed w-full top-0 z-50 flex justify-between items-center px-8 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-[#222]">
    <div className="text-xl font-black uppercase tracking-tighter text-white">
      Victor_Molina<span className="text-[#ff4500]">.</span>Dev
    </div>
    
    <button 
      onClick={handleToggleTheme}
      className="border border-[#333] hover:border-[#ff4500] px-6 py-2 text-xs font-mono text-[#888] hover:text-[#ff4500] uppercase tracking-widest transition-colors flex items-center gap-2"
    >
      <span>Mode</span>
      <div className={`w-2 h-2 bg-${theme === 'light' ? 'white' : '#ff4500'}`}></div>
    </button>
  </nav>
);
}