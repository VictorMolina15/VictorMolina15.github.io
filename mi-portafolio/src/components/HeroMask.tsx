// src/components/HeroMask.tsx
import { useRef, useState, useEffect } from 'react';
import DitherBackground from './DitherBackground';

const DiagonalLoader = ({ className, reverse = false }: { className?: string, reverse?: boolean }) => (
  <div className="overflow-hidden border border-primary/40 bg-cyber-grid-light/5 dark:bg-cyber-grid/20 w-full h-full">
    <div
      className={`w-full h-full opacity-80 ${reverse ? 'animate-diagonal-reverse' : 'animate-diagonal'}`}
      style={{
        backgroundImage: `linear-gradient(45deg, var(--color-primary) 25%, transparent 25%, transparent 50%, var(--color-primary) 50%, var(--color-primary) 75%, transparent 75%, transparent)`,
        backgroundSize: '16px 16px'
      }}
    ></div>
  </div>
);

export default function HeroMask() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
  // 1. Activar las transiciones del Hero
  setIsMounted(true);

  // 2. Sincronizar la aparición del contenedor de proyectos externo
  const timelineContainer = document.getElementById('projects-timeline');
  if (timelineContainer) {
    timelineContainer.classList.remove('opacity-0', 'pointer-events-none');
  }

  // 3. Sincronizar estado inicial del tema
  const checkTheme = () => {
    setIsDark(document.documentElement.classList.contains('dark'));
  };
  checkTheme();

  // 4. MutationObserver para detectar el cambio de modo claro/oscuro
  const observer = new MutationObserver(() => {
    checkTheme();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  return () => observer.disconnect();
}, []);

  // Definición de colores para pasárselos al Canvas [R, G, B] mapeados de 0 a 1
  const waveColor: [number, number, number] = isDark ? [0.44, 0.08, 0.08] : [.8, .8, .8];
  const bgColor: [number, number, number] = isDark ? [0.0, 0.0, 0.0] : [0, 0, 0];

  return (
      <section id="hero" className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-cyber-black transition-colors 
    duration-700 selection:bg-primary selection:text-white ${isDark ? 'shadow-[0_0_25px_2px_var(--color-primary)]' : 'shadow-[0_0_0px_0px]'}`}>

      {/* =========================================================================
         [CAPA Z-0] FONDO INTERACTIVO DITHER CON SOPORTE DE TEMA
         ========================================================================= */}
      <div className="w-full h-full absolute inset-0 z-0  opacity-100 dark:opacity-70 transition-opacity duration-1000">
        <DitherBackground
          waveColor={waveColor}
          bgColor={bgColor}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.1}
          colorNum={40}
          waveAmplitude={0.6}
          waveFrequency={4.0}
          waveSpeed={0.03}
        />
      </div>

      {/* Cortina Negra Inicial: Se desvanece suavemente al cargar */}
      <div className={`absolute inset-0 bg-cyber-black z-50 pointer-events-none transition-opacity duration-1000 ${isMounted ? 'opacity-0' : 'opacity-100'}`}></div>

      <style>{`
        @keyframes slide-diagonal { 0% { background-position: 0 0; } 100% { background-position: 0 16px; } }
        @keyframes slide-diagonal-reverse { 0% { background-position: 0 16px; } 100% { background-position: 0 0; } }
        .animate-diagonal { animation: slide-diagonal 1s linear infinite; }
        .animate-diagonal-reverse { animation: slide-diagonal-reverse 1s linear infinite; }
      `}</style>

      {/* =========================================================================
         CAPAS DE ATMÓSFERA Y HUD (Marcos laterales) - Z-40
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-40 opacity-[0.04] dark:opacity-15 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

      {/* Marco Izquierdo */}
      <div className="absolute left-0 top-20 bottom-0 w-16 bg-black/40 border-r border-cyber-grid-light dark:border-cyber-grid z-40 flex flex-col items-center py-12 gap-8 hidden sm:flex">
        <div className="absolute pl-5 md:left-16 flex flex-col">
          <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase font-bold animate-pulse">// SYS.INIT</span>
          <span className="text-secondary dark:text-neutral-500 font-mono text-xs tracking-widest mt-2">DEV_PROTOCOL</span>
        </div>
        <div className="w-4 h-40 mt-20"><DiagonalLoader /></div>
        <div className="w-4 h-24 opacity-50"><DiagonalLoader reverse /></div>
      </div>

      {/* Marco Derecho */}
      <div className="absolute right-0 top-20 bottom-0 w-16 bg-black/40 border-l border-cyber-grid-light dark:border-cyber-grid z-40 flex flex-col items-center py-12 gap-8 hidden sm:flex">
        <div className="w-4 h-24 mt-20 opacity-50"><DiagonalLoader /></div>
        <div className="w-4 h-48"><DiagonalLoader reverse /></div>
        <div className="absolute bottom-5 right-18 w-25 text-secondary/70 dark:text-gray-300/70 font-bold text-xs tracking-wider">[REWORK-TEST]</div>
      </div>

      {/* =========================================================================
         EL SÁNDWICH DE TEXTO Y PERSONAJE CON TRANSICIONES DE ENTRADA
         ========================================================================= */}
      <div className="relative flex flex-col items-center justify-center w-full h-full max-w-[1600px] px-4 pointer-events-none mt-12">

        {/* [CAPA Z-10] TEXTO TRASERO (VICTOR) - Aparece con fundido y escalado */}
        <h1 
          className={`text-[20vw] md:text-[15vw] font-black uppercase leading-[0.75] tracking-wide z-10 dark:text-transparent text-primary/70 transition-all duration-1000 ease-out ${
            isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ WebkitTextStroke: isDark ? '3px var(--color-primary)' : '3px rgba(0, 0, 0, 0)' }}
        >
          VICTOR
        </h1>

        {/* [CAPA Z-20] PERSONAJE (DANTE) - Surge desde abajo hacia arriba */}
        <div className="absolute inset-0 flex items-center justify-center z-20 overflow-hidden">
          <img
            src="/images/Dante.png"
            alt="Dante"
            className={`h-[90%] w-auto object-contain opacity-90 drop-shadow-2xl transition-all duration-1000 delay-300 ease-out ${
              isMounted ? 'translate-y-[6%] scale-100' : 'translate-y-[50%] scale-95 opacity-0'
            }`}
          />
        </div>

        {/* [CAPA Z-30] TEXTO DELANTERO (MOLINA) - Aparece con fundido y ligero retraso */}
        <h1 
          className={`text-[20vw] md:text-[15vw] font-black uppercase leading-[0.75] tracking-tighter z-30 text-gray-950 dark:text-gray-100 transition-all duration-1000 delay-500 ease-out ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{ textShadow: isDark ? '0 10px 30px rgba(0,0,0,0.9)' : '0 10px 20px rgba(0,0,0,0.15)', 
            WebkitTextStroke: isDark ? '3px rgba(255, 255, 255, 0)' : '3px rgba(255, 255, 255, 0.8)' }}
        >
          MOLINA
        </h1>

        {/* SUBTÍTULO FLOTANTE (Z-40) */}
        <h2 
          className={`mt-8 md:mt-16 text-gray-100 dark:font-black font-mono text-lg md:text-3xl tracking-[0.4em] uppercase font-bold text-center z-40 transition-all duration-1000 delay-700 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ 
            textShadow:'0 0 10px var(--color-primary)',
            WebkitTextStroke: isDark ? '2px rgba(255, 255, 255, 0)' : '2px rgba(0,0,0,0.1)' 
          }}
        >
          DEV & MULTIMEDIA ARTIST
        </h2>
      </div>

    </section>
  );
}