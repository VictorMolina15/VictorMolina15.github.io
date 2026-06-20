// src/components/About.tsx
import { useState, useEffect, useRef } from 'react';

// Componente auxiliar para simular tipeo de terminal
const TypingText = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, delay);
        return () => clearTimeout(timeout);
      }
    }, { threshold: 0.5 });

    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [currentIndex, delay, text]);

  return <span ref={containerRef}>{currentText}<span className="animate-pulse">|</span></span>;
};

// Componente auxiliar para micro-interacción en habilidades
const SkillBlock = ({ title, level, tech }: { title: string; level: string; tech: string }) => (
  <div className="group border-t border-cyber-grid-light dark:border-cyber-grid pt-6 relative overflow-hidden transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-neutral-950/30 p-4 -m-4">
    <div className="absolute inset-0 w-full h-[1px] bg-primary/20 -translate-y-full group-hover:translate-y-[400%] transition-transform duration-700 ease-in-out"></div>
    <div className="flex justify-between font-mono text-xs text-gray-500 dark:text-neutral-500 mb-2 relative z-10">
      <span>{title}</span>
      <span className="text-primary font-bold group-hover:animate-pulse">[{level}]</span>
    </div>
    <div className="text-2xl font-black uppercase text-gray-950 dark:text-white tracking-tight relative z-10 transition-transform duration-300 group-hover:translate-x-1">
      {tech}
    </div>
  </div>
);

export default function About() {
  const [activeTab, setActiveTab] = useState<'dev' | 'art'>('dev');

  return (
    <section id="about" className="w-full border-t border-cyber-grid-light dark:border-cyber-grid bg-white dark:bg-cyber-black transition-colors duration-300 relative selection:bg-primary selection:text-white">
      
      {/* Encabezado de Sección */}
      <div className="border-b border-cyber-grid-light dark:border-cyber-grid px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-primary font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-bold block mb-0 animate-pulse">
            // PROFILE_SPECIFICATIONS
          </span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-950 dark:text-white">
            <TypingText text="ACERCA DE MÍ" delay={80} />
          </h2>
        </div>
        <div className="text-gray-400 dark:text-neutral-600 font-mono text-xs text-right hidden md:block leading-relaxed">
          [METRIC_SYSTEM: <span className="text-gray-950 dark:text-gray-200">ONLINE</span>]<br />
          [LOCATION: <span className="text-gray-950 dark:text-gray-200">NUEVO_LEON_MX</span>]
        </div>
      </div>

      {/* Contenido Principal: Rejilla Asimétrica 4 vs 8 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        
        {/* =========================================================================
           BLOQUE IZQUIERDO: Fotografía y Ficha Técnica (4 Columnas)
           ========================================================================= */}
        <div className="lg:col-span-4 py-8 px-4 md:py-6 border-b lg:border-b-0 lg:border-r border-cyber-grid-light dark:border-cyber-grid flex flex-col gap-8">
          
          {/* FOTOGRAFÍA ESTILIZADA */}
          <div className="relative w-[90%] aspect-[4/5] self-center border-4 border-gray-950 dark:border-white bg-cyber-grid-light dark:bg-cyber-grid overflow-hidden group transition-colors duration-500 hover:border-primary">
            <div className="absolute inset-0 border-4 border-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-20"></div>
            
            <img 
              src="/images/bg-test-og.png" 
              alt="Victor Molina" 
              className="w-full h-full object-cover filter grayscale contrast-[150%] brightness-[90%] mix-blend-luminosity dark:mix-blend-normal opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:brightness-100"
            />

            <div className="absolute inset-0 bg-cover opacity-20 pointer-events-none z-10" style={{ backgroundImage: `url('/images/noise.png')` }}></div>
            
            <div className="absolute bottom-0 right-0 bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-mono text-[10px] px-3 py-1 uppercase tracking-widest z-30 group-hover:bg-primary group-hover:text-white transition-colors">
              Subject: Victor_Molina // ID: FCFM_LMAD
            </div>
          </div>

          {/* Ficha Técnica reubicada debajo de la foto */}
          <div className="border-t border-cyber-grid-light dark:border-cyber-grid pt-5 space-y-2 font-mono text-xs text-gray-500 dark:text-neutral-500 bg-gray-50 dark:bg-transparent p-4 -mx-4">
            {[
                {label: "NÚCLEO EDUCATIVO", value: "FCFM - LMAD"},
                {label: "CO-PILOTOS FELINOS", value: "02 DETECTADOS"},
                {label: "ENTORNO OPERATIVO", value: "VS_CODE / BLENDER / GODOT"}
            ].map(item => (
                <div key={item.label} className="flex justify-between hover:text-gray-800 dark:hover:text-gray-300 transition-colors">
                    <span>{item.label}:</span>
                    <span className="text-gray-950 dark:text-gray-300 font-bold">{item.value}</span>
                </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
           BLOQUE DERECHO: Manifiesto y Matriz de Habilidades (8 Columnas)
           ========================================================================= */}
        <div className="lg:col-span-8 flex flex-col w-full relative">
          
          {/* Manifiesto Textual movido a la parte superior derecha */}
          <div className="p-4 md:p-8 border-b border-cyber-grid-light dark:border-cyber-grid group/manifesto">
            <span className="text-primary font-mono text-xs tracking-widest uppercase block mb-6 font-bold">
              [01 // MANIFIESTO OPERATIVO]
            </span>
            <p className="text-xl md:text-3xl font-bold text-gray-950 dark:text-gray-200 uppercase tracking-tight leading-tight mb-8">
              La convergencia perfecta entre la lógica de programación estructural y la dirección de arte digital interactivo.
            </p>
            <div className="space-y-4 text-gray-600 dark:text-neutral-400 font-mono text-sm leading-relaxed relative">
                {/* Línea decorativa vertical activa en hover, ahora vinculada al grupo del manifiesto */}
                <div className="absolute left-[-20px] top-0 bottom-0 w-[2px] bg-cyber-grid group-hover/manifesto:bg-primary transition-colors duration-300"></div>
              <p>
                Diseño y desarrollo soluciones web escalables de pila completa, combinando arquitecturas robustas en el backend con interfaces de usuario de alto impacto visual y rendimiento optimizado.
              </p>
              <p>
                Mi formación multimedia me permite entender el pipeline de producción técnica completo: desde el desarrollo de mecánicas lógicas en código puro, hasta el modelado 3D, la animación de componentes y la optimización de assets pesados para entornos interactivos en tiempo real.
              </p>
            </div>
          </div>

          {/* Selector de Pestañas Estilo Terminal */}
          <div className="flex border-b border-cyber-grid-light dark:border-cyber-grid w-full bg-gray-50 dark:bg-cyber-navbar sticky top-[72px] lg:top-0 z-20">
            {(['dev', 'art'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 font-mono text-xs uppercase tracking-widest border-r border-cyber-grid-light dark:border-cyber-grid transition-all duration-300 text-center font-bold relative group/tab ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-cyber-black text-primary' 
                      : 'text-gray-400 dark:text-neutral-600 hover:text-gray-600 dark:hover:text-neutral-400 hover:bg-white dark:hover:bg-neutral-950'
                  }`}
                >
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${activeTab === tab ? 'w-full' : 'w-0 group-hover/tab:w-full bg-secondary'}`}></div>
                  [ {tab === 'dev' ? 'DEV_STACK' : 'ART_&_MULTIMEDIA'} ]
                </button>
            ))}
          </div>

          {/* Área de Visualización de la Matriz */}
          <div className="p-4 md:p-8 flex-1 flex flex-col justify-center relative">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-cyber-grid-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-cyber-grid-light)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,var(--color-cyber-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-cyber-grid)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 -z-10"></div>

            <span className="text-primary font-mono text-xs tracking-widest uppercase block mb-8 font-bold animate-pulse">
              [02 // MATRIZ DE EJECUCIÓN TECNOLÓGICA]
            </span>

            {activeTab === 'dev' ? (
              <div className="space-y-6 w-full">
                <SkillBlock title="FRONTEND ARCHITECTURES" level="AVANZADO" tech="React, TypeScript, Next.js, Tailwind CSS" />
                <SkillBlock title="BACKEND & DATABASES" level="INTERMEDIO_AVANZADO" tech="Laravel, Node.js, MySQL, REST APIs" />
                <SkillBlock title="LOGIC SYSTEMS" level="INTERMEDIO" tech="C#, PHP, Socket.io, State Management" />
              </div>
            ) : (
              <div className="space-y-6 w-full">
                <SkillBlock title="3D PIPELINE & SCULPTING" level="INTERMEDIO_AVANZADO" tech="Blender, Maya, ZBrush, Asset Optimization" />
                <SkillBlock title="GAME ENGINES & REALTIME 3D" level="INTERMEDIO" tech="Godot Engine, React Three Fiber, Three.js" />
                <SkillBlock title="DIGITAL ART & ANIMATION" level="INTERMEDIO" tech="Krita, Photoshop, Rive, Sprite Sheet Generation" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}