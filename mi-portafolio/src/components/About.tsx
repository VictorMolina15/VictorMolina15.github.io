// src/components/About.tsx
import { useState, useEffect, useRef } from 'react';

// Componente auxiliar modificado para resetearse si el texto cambia
// Componente auxiliar para simular tipeo de terminal (Optimizado y Bug-Free)
const TypingText = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.5 });

    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setCurrentText('');
    
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setCurrentText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, isVisible, delay]);

  return <span ref={containerRef}>{currentText}<span className="animate-pulse">|</span></span>;
};

const SkillBlock = ({ title, level, tech }: { title: string; level: string; tech: string }) => (
  <div className="group border-t border-cyber-grid-light dark:border-cyber-grid pt-3 relative overflow-visible transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-neutral-950/30 p-4 mb-0">
    <div className="absolute -top-[2px] -left-[2px] w-0 h-0 group-hover:w-full group-hover:h-full border-t-[2px] border-l-[2px] border-primary/0 group-hover:border-primary transition-all duration-700 ease-in-out"></div>
    <div className="flex justify-between font-mono text-xs text-gray-500 dark:text-neutral-500 mb-2 relative z-10">
      <span>{title}</span>
      <span className="text-primary font-bold group-hover:animate-pulse">[{level}]</span>
    </div>
    <div className="text-2xl font-black uppercase text-gray-950 dark:text-white tracking-tight relative z-10 transition-transform duration-300 group-hover:translate-x-2">
      {tech}
    </div>
  </div>
);

export default function About() {
  const [activeTab, setActiveTab] = useState<'dev' | 'art'>('dev');
  const [lang, setLang] = useState<'ES' | 'EN'>('ES');

  // <-- LÓGICA DE IDIOMA -->
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ES' | 'EN';
    if (savedLang) setLang(savedLang);

    const handleLangChange = (e: any) => setLang(e.detail);
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  // <-- DICCIONARIO DE TRADUCCIÓN -->
  const dict = {
    ES: {
      title: "ACERCA DE MÍ",
      edu: "NÚCLEO EDUCATIVO",
      cats: "CO-PILOTOS FELINOS",
      catsVal: "02 DETECTADOS",
      env: "ENTORNO OPERATIVO",
      manifestoTitle: "[01 // MANIFIESTO OPERATIVO]",
      manifestoSub: "La convergencia perfecta entre la lógica de programación estructural y la dirección de arte digital interactivo.",
      p1: "Diseño y desarrollo soluciones web escalables de pila completa, combinando arquitecturas robustas en el backend con interfaces de usuario de alto impacto visual y rendimiento optimizado.",
      p2: "Mi formación multimedia me permite entender el pipeline de producción técnica completo: desde el desarrollo de mecánicas lógicas en código puro, hasta el modelado 3D, la animación de componentes y la optimización de assets pesados para entornos interactivos en tiempo real.",
      matrixTitle: "[02 // MATRIZ DE EJECUCIÓN TECNOLÓGICA]",
    },
    EN: {
      title: "ABOUT ME",
      edu: "EDUCATIONAL CORE",
      cats: "FELINE CO-PILOTS",
      catsVal: "02 DETECTED",
      env: "OPERATING ENV.",
      manifestoTitle: "[01 // OPERATIVE MANIFESTO]",
      manifestoSub: "The perfect convergence between structural programming logic and interactive digital art direction.",
      p1: "I design and develop scalable full-stack web solutions, combining robust backend architectures with high visual impact user interfaces and optimized performance.",
      p2: "My multimedia background allows me to understand the entire technical production pipeline: from developing logic mechanics in pure code to 3D modeling, component animation, and heavy asset optimization for real-time interactive environments.",
      matrixTitle: "[02 // TECH EXECUTION MATRIX]",
    }
  };

  const text = dict[lang];

  return (
    <section id="about" className="w-full border-t border-cyber-grid-light dark:border-cyber-grid bg-white dark:bg-cyber-black transition-colors duration-300 relative selection:bg-primary selection:text-white">
      {/* Encabezado */}
      <div className="border-b border-cyber-grid-light dark:border-cyber-grid px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-primary font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-bold block mb-0 animate-pulse">
            // PROFILE_SPECIFICATIONS
          </span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-950 dark:text-white">
            <TypingText text={text.title} delay={80} />
          </h2>
        </div>
        <div className="text-gray-400 dark:text-neutral-600 font-mono text-xs text-right hidden md:block leading-relaxed">
          [METRIC_SYSTEM: <span className="text-gray-950 dark:text-gray-200">ONLINE</span>]<br />
          [LOCATION: <span className="text-gray-950 dark:text-gray-200">NUEVO_LEON_MX</span>]
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* BLOQUE IZQUIERDO */}
        <div className="lg:col-span-4 py-8 px-4 md:py-6 border-b lg:border-b-0 lg:border-r border-cyber-grid-light dark:border-cyber-grid flex flex-col gap-8">
          <div className="relative w-[90%] aspect-[4/5] self-center border-4 border-gray-950 dark:border-white bg-cyber-grid-light dark:bg-cyber-grid overflow-hidden group transition-colors duration-500 hover:border-primary">
            <div className="absolute inset-0 border-4 border-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-20"></div>
            <img src="/images/bg-test-og.png" alt="Victor Molina" className="w-full h-full object-cover filter grayscale contrast-[150%] brightness-[90%] mix-blend-luminosity dark:mix-blend-normal opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:brightness-100" />
            <div className="absolute inset-0 bg-cover opacity-20 pointer-events-none z-10" style={{ backgroundImage: `url('/images/noise.png')` }}></div>
            <div className="absolute bottom-0 right-0 text-white dark:text-gray-950 font-mono text-[10px] px-3 py-1 uppercase tracking-widest z-30 group-hover:bg-primary group-hover:text-white transition-colors">
              Subject: Victor_Molina // ID: FCFM_LMAD
            </div>
          </div>
          
          <div className="border-t border-cyber-grid-light dark:border-cyber-grid pt-5 space-y-2 font-mono text-xs text-gray-500 dark:text-neutral-500 p-4 -mx-4">
            {[
                {label: text.edu, value: "FCFM - LMAD"},
                {label: text.cats, value: text.catsVal},
                {label: text.env, value: "VS_CODE / BLENDER / GODOT"}
            ].map(item => (
                <div key={item.label} className="flex justify-between hover:text-gray-800 dark:hover:text-gray-300 transition-colors">
                    <span>{item.label}:</span>
                    <span className="text-gray-950 dark:text-gray-300 font-bold">{item.value}</span>
                </div>
            ))}
          </div>
        </div>

        {/* BLOQUE DERECHO */}
        <div className="lg:col-span-8 flex flex-col w-full relative">
          <div className="p-4 md:p-8 border-b border-cyber-grid-light dark:border-cyber-grid group/manifesto">
            <span className="text-primary font-mono text-xs tracking-widest uppercase block mb-6 font-bold">
              {text.manifestoTitle}
            </span>
            <p className="text-xl md:text-3xl font-bold text-gray-950 dark:text-gray-200 uppercase tracking-tight leading-tight mb-8">
              {text.manifestoSub}
            </p>
            <div className="space-y-4 text-gray-600 dark:text-neutral-400 font-mono text-sm leading-relaxed relative">
                <div className="absolute left-[-20px] top-0 bottom-0 w-[2px] bg-cyber-grid group-hover/manifesto:bg-primary transition-colors duration-300"></div>
              <p>{text.p1}</p>
              <p>{text.p2}</p>
            </div>
          </div>

          <div className="flex border-b border-cyber-grid-light dark:border-cyber-grid w-full sticky top-[72px] lg:top-0 z-20">
            {(['dev', 'art'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 font-mono text-xs uppercase tracking-widest ${tab === 'dev' ? 'border-r' : 'border-l'} dark:border-cyber-grid text-center font-bold relative group/tab bg-white dark:bg-cyber-black transition-colors duration-300 ${
                    activeTab === tab 
                      ? 'text-primary border-cyber-grid-light animate-pulse' 
                      : 'text-gray-400 dark:text-neutral-600 hover:text-gray-600 dark:hover:text-neutral-400'
                  }`}
                >
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${activeTab === tab ? 'w-full' : 'w-0 group-hover/tab:w-full bg-secondary'}`}></div>
                  [ {tab === 'dev' ? 'DEV_STACK' : 'ART_&_MULTIMEDIA'} ]
                </button>
            ))}
          </div>

          <div className="p-4 md:p-8 flex-1 flex flex-col justify-center relative">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-cyber-grid-light)_2px,transparent_2px),linear-gradient(to_bottom,var(--color-cyber-grid-light)_2px,transparent_2px)] dark:bg-[linear-gradient(to_right,var(--color-cyber-grid)_2px,transparent_2px),linear-gradient(to_bottom,var(--color-cyber-grid)_2px,transparent_2px)] bg-[size:2rem_2rem] opacity-20 -z-10"></div>
            <span className="text-primary font-mono text-xs tracking-widest uppercase block mb-8 font-bold">
              {text.matrixTitle}
            </span>

            {activeTab === 'dev' ? (
              <div className="space-y-6 w-full">
                <SkillBlock title="FRONTEND ARCHITECTURES" level="AVANZADO" tech="React, TypeScript, Next.js, Tailwind CSS" />
                <SkillBlock title="BACKEND & DATABASES" level={lang === 'ES' ? 'INTERMEDIO_AVANZADO' : 'MID_ADVANCED'} tech="Laravel, Node.js, MySQL, REST APIs" />
                <SkillBlock title="LOGIC SYSTEMS" level={lang === 'ES' ? 'INTERMEDIO' : 'INTERMEDIATE'} tech="C#, PHP, Socket.io, State Management" />
              </div>
            ) : (
              <div className="space-y-6 w-full">
                <SkillBlock title="3D PIPELINE & SCULPTING" level={lang === 'ES' ? 'INTERMEDIO_AVANZADO' : 'MID_ADVANCED'} tech="Blender, Maya, ZBrush, Asset Optimization" />
                <SkillBlock title="GAME ENGINES & REALTIME 3D" level={lang === 'ES' ? 'INTERMEDIO' : 'INTERMEDIATE'} tech="Godot Engine, React Three Fiber, Three.js" />
                <SkillBlock title="DIGITAL ART & ANIMATION" level={lang === 'ES' ? 'INTERMEDIO' : 'INTERMEDIATE'} tech="Krita, Photoshop, Rive, Sprite Sheet Generation" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}