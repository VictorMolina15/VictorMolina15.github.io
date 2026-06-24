// src/components/Navbar.tsx
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [lang, setLang] = useState<'ES' | 'EN'>('ES');
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Sincronizar con el tema del sistema al montar el componente
  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(currentTheme);

    const savedLang = localStorage.getItem('language') as 'ES' | 'EN';
    if (savedLang) setLang(savedLang);

    setMounted(true);

    const handleScroll = () => {
      const sections = ['hero', 'projects-timeline', 'about'];
      // Iteramos en reversa para encontrar la sección más profunda que ya está en pantalla
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Si el top de la sección está al menos a 200px del borde superior
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleToggleLang = () => {
    const newLang = lang === 'ES' ? 'EN' : 'ES';
    setLang(newLang);
    localStorage.setItem('language', newLang);
    // Disparamos un evento personalizado para que otras islas de React lo escuchen
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
  };

  // Función para smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Centralizamos las clases para garantizar consistencia absoluta entre estados
  const navStyles = "fixed w-full top-0 z-50 flex justify-between items-center px-8 py-6 bg-cyber-navbar/90 backdrop-blur-md border-b border-cyber-grid transition-colors duration-300";
  const titleStyles = "text-xl font-black uppercase tracking-tighter text-white";
  const linkStyles = "text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-primary transition-colors cursor-pointer hidden md:block";
  const buttonStyles = "border border-cyber-grid-light hover:border-gray-300 px-6 py-2 text-xs font-mono text-gray-300 hover:text-gray-300 uppercase tracking-widest transition-colors flex items-center gap-2 bg-transparent cursor-pointer";

  const dict = {
    ES: { home: 'INICIO', work: 'PORTAFOLIO', about: 'ACERCA DE MÍ' },
    EN: { home: 'HOME', work: 'WORK', about: 'ABOUT ME' }
  };

  // Función auxiliar para renderizar los enlaces con estilos activos
  const NavLink = ({ id, text }: { id: string, text: string }) => {
    const isActive = activeSection === id;
    return (
      <a 
        href={`#${id}`} 
        onClick={(e) => scrollToSection(e, id)} 
        className={`relative text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer hidden md:block group ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-200'}`}
      >
        {text}
        {/* Línea inferior indicadora */}
        <div className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
      </a>
    );
  };

  // Estado del servidor (Pre-hidratación): Misma estructura y estilos visuales
  if (!mounted) {
    return (
      <nav className={navStyles}>
        <div className={titleStyles}>
          Victor_Molina<span className="text-primary">.</span>Dev
        </div>

        <div className="flex gap-8 items-center">
          <span className={linkStyles}>INICIO</span>
          <span className={linkStyles}>PORTAFOLIO</span>
          <span className={linkStyles}>ACERCA DE MÍ</span>
        </div>

        <div className="flex gap-4">
          <div className={buttonStyles}>
            <span>ES</span>
          </div>
          <div className={buttonStyles}>
            <span>Mode</span>
            <div className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-300' : 'bg-primary'}`}></div>
          </div>
        </div>
      </nav>
    );
  }

  // Estado del cliente (Hydrated): Añade la interactividad
 return (
    <nav className={navStyles}>
      <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className={titleStyles}>
        Victor_Molina<span className="text-primary">.</span>Dev
      </a>
      
      <div className="flex gap-8 items-center">
        <NavLink id="hero" text={dict[lang].home} />
        <NavLink id="projects-timeline" text={dict[lang].work} />
        <NavLink id="about" text={dict[lang].about} />
      </div>

      <div className="flex gap-2 md:gap-4">
        <button onClick={handleToggleLang} className={buttonStyles}>
            <span>{lang}</span>
        </button>
        <button onClick={handleToggleTheme} className={buttonStyles}>
            <span className="hidden sm:inline">Mode</span>
            <div className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-300' : 'bg-primary'}`}></div>
        </button>
      </div>
    </nav>
  );
}