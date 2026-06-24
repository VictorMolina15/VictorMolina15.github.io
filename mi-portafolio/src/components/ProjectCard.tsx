// src/components/ProjectCard.tsx
import { useState, useEffect } from 'react'; // <-- NUEVO IMPORT

interface ProjectProps {
  project: {
    id: string;
    title: string;
    category: string;
    description: { es: string; en: string };
    techStack: string[];
    links: { live: string; github: string };
    image: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectProps) {
  const isEven = index % 2 === 0;
  
  // <-- LÓGICA DE IDIOMA NUEVA -->
  const [lang, setLang] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'ES' | 'EN';
    if (savedLang) setLang(savedLang.toLowerCase() as 'es' | 'en');

    const handleLangChange = (e: any) => {
      setLang(e.detail.toLowerCase());
    };

    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  return (
    <article className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center border-b border-cyber-grid-light dark:border-cyber-grid relative group transition-colors duration-300`}>
             
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] -z-10"></div>
      
      <div className="w-full md:w-1/2 p-8 md:p-16">
        <div className="relative aspect-square md:aspect-video w-full">
          <div className="absolute inset-0 bg-secondary translate-x-4 translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                     
          <div className="w-full h-full border border-cyber-grid-light dark:border-cyber-grid overflow-hidden relative z-10">
            <img 
               src={project.image} 
               alt={project.title} 
               className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-75 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-start">
        <span className="text-primary font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block font-bold">
          // {project.category}
        </span>
                 
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-6 leading-[0.9]">
          {project.title}
        </h2>
                 
        <div className="w-16 h-[2px] bg-primary mb-8"></div>
                 
        {/* <-- APLICAMOS LA TRADUCCIÓN AQUÍ --> */}
        <p className="text-gray-600 dark:text-neutral-400 font-mono text-sm leading-relaxed mb-8 max-w-lg">
          {project.description[lang]}
        </p>
                 
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map(tech => (
            <span key={tech} className="border border-cyber-grid-light dark:border-cyber-grid px-2 py-1 text-xs font-mono text-gray-500 dark:text-neutral-500 uppercase ">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a 
             href={project.links.live || '#'} 
             className="flex items-center gap-3 border border-gray-900 dark:border-white px-8 py-4 font-mono 
             text-sm text-gray-950 dark:text-white uppercase hover:border-secondary hover:text-secondary 
             dark:hover:border-secondary dark:hover:text-secondary transition-colors group/btn"
          >
            {/* <-- TRADUCCIÓN DEL BOTÓN --> */}
            <span>{lang === 'es' ? 'VER PROYECTO' : 'VIEW PROJECT'}</span>
            <svg 
               className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}