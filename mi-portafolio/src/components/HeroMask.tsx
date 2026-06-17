// src/components/HeroMask.tsx
import { useState, useRef, useEffect } from 'react';

const DiagonalLoader = ({ className, reverse = false }: { className?: string, reverse?: boolean }) => (
  <div className={`overflow-hidden border border-primary/40 bg-cyber-grid-light/5 dark:bg-cyber-grid/20 ${className}`}>
    <div
      className={`w-full h-full opacity-80 ${reverse ? 'animate-diagonal-reverse' : 'animate-diagonal'}`}
      style={{
        backgroundImage: `linear-gradient(
          45deg, 
          var(--color-primary) 25%, 
          transparent 25%, 
          transparent 50%, 
          var(--color-primary) 50%, 
          var(--color-primary) 75%, 
          transparent 75%, 
          transparent
        )`,
        backgroundSize: '16px 16px' 
      }}
    ></div>
  </div>
);
export default function HeroMask() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [readout, setReadout] = useState("ADDR: 0x0000");
  const [binaryStream, setBinaryStream] = useState("0110010101");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const hex = `ADDR: 0x${Math.floor(Math.random()*0x10000).toString(16).toUpperCase().padStart(4, '0')}`;
      setReadout(hex);
      const bin = Math.random().toString(2).substring(2, 12);
      setBinaryStream(bin);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-cyber-black transition-colors duration-300"
    >
      {/* Inyección de CSS para la animación de las barras diagonales */}
      <style>{`
        @keyframes slide-diagonal {
          0% { background-position: 0 0; }
          100% { background-position: 0 16px; } /* Movimiento en el eje Y hacia abajo */
        }
        @keyframes slide-diagonal-reverse {
          0% { background-position: 0 16px; }
          100% { background-position: 0 0; } /* Movimiento en el eje Y hacia arriba */
        }
        .animate-diagonal {
          animation: slide-diagonal 1s linear infinite;
        }
        .animate-diagonal-reverse {
          animation: slide-diagonal-reverse 1s linear infinite;
        }
      `}</style>

      {/* Capa Atmosférica y Cuadrícula 3D */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03] dark:opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      

      <div className="absolute bottom-0 left-0 right-0 h-1/2 w-full opacity-20 pointer-events-none -z-10"
           style={{
             backgroundImage: `linear-gradient(var(--color-cyber-grid-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-cyber-grid-light) 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             transform: 'perspective(500px) rotateX(60deg)',
             transformOrigin: 'bottom',
             maskImage: 'linear-gradient(to top, black, transparent)'
           }}></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none hidden dark:block"></div>

      {/* MARCO IZQUIERDO */}
      <div className="absolute left-0 top-32 bottom-20 w-16 border-r border-cyber-grid-light dark:border-cyber-grid z-20 flex flex-col items-center py-12 gap-8 hidden sm:flex">
        <div className="absolute top-0 left-8 md:left-16 flex flex-col">
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase font-bold animate-pulse">
                // SYS.INIT
            </span>
            <span className="text-gray-500 dark:text-neutral-500 font-mono text-xs tracking-widest mt-2">
                DEV_PROTOCOL
            </span>
        </div>
        
        {/* Barras Diagonales Izquierdas */}
        <DiagonalLoader className="w-4 h-32 mt-4" />
        <DiagonalLoader className="w-4 h-16 opacity-50" reverse />

        <div className="absolute bottom-2 left-18 text-primary/70 font-mono text-xs tracking-wider font-bold">
            {readout}
        </div>
      </div>

      {/* MARCO DERECHO */}
      <div className="absolute right-0 top-32 bottom-20 w-16 border-l border-cyber-grid-light dark:border-cyber-grid z-20 flex flex-col items-center py-12 gap-8 hidden sm:flex">
         <div className="absolute top-0 right-6 text-primary/60 font-mono text-xs tracking-wider rotate-180" style={{writingMode: 'vertical-lr'}}>
            {binaryStream}
         </div>

         {/* Barras Diagonales Derechas */}
         <DiagonalLoader className="w-4 h-16 mt-8 opacity-50" />
         <DiagonalLoader className="w-4 h-40" reverse />
         
         <div className="absolute bottom-0 right-8 font-black/70 font-mono text-xs tracking-wider">
            [REACT][TYPESCRIPT][TAILWIND]
         </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 border-t border-cyber-grid-light dark:border-cyber-grid z-20 px-8 flex justify-center items-center">
        <div className="w-1/3 h-1 flex border border-primary/40 p-[2px]">
            <div className="h-full bg-primary animate-pulse" style={{width: '65%'}}></div>
        </div>
      </div>

      {/* Contenedor Principal del Texto */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1600px] px-4">
        
        {/* Wrapper Relativo para H1 para mantener la estructura flex */}
        <div className="relative w-full flex justify-center text-center">
          <h1
            className="text-[18vw] md:text-[14vw] font-black uppercase leading-[0.8] tracking-wide w-full"
            style={{
              backgroundImage: `url('/images/bg-test.png')`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: '110%', 
              height: '23vw',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'background-position 0.15s ease-out',
            }}
          >
            VICTOR<br />MOLINA
          </h1>

          <h1
            className="absolute top-0 left-0 text-[18vw] md:text-[14vw] font-black uppercase leading-[0.8] tracking-wide w-full pointer-events-none"
            style={{
              WebkitTextStroke: '3px var(--color-primary)',
              WebkitTextFillColor: 'transparent',
              opacity: 0.8,
              filter: 'drop-shadow(0 0 15px var(--color-primary)) blur(1px)',
              transform: `translate(${(mousePos.x - 50) * -0.1}%, ${(mousePos.y - 50) * -0.1}%)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            VICTOR<br />MOLINA
          </h1>
        </div>
        <h2 
          className="mt-8 md:mt-12 font-black font-mono text-lg md:text-3xl tracking-[0.4em] uppercase font-bold text-center z-20"
          style={{ textShadow: '0 0 10px var(--color-gray-300), 0 0 20px var(--color-gray-300)' }}
        >
          DEV & 2D/3D ARTIST
        </h2>
      </div>
    </section>
  );
}