// src/components/ProjectCard.tsx
import { useState } from 'react';

// Interfaz basada en tu esquema JSON
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
  // Alternar el diseño: imagen izquierda vs imagen derecha
  const isEven = index % 2 === 0;

  return (
    <article className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center border-b border-[#222] relative group`}>
      
      {/* Línea vertical de fondo (Estilo Grid) */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#222] -z-10"></div>

      {/* Contenedor de la Imagen */}
      <div className="w-full md:w-1/2 p-8 md:p-16">
        <div className="relative aspect-square md:aspect-video w-full">
          {/* Cuadro de acento Neón que se desplaza en Hover */}
          <div className="absolute inset-0 bg-[#ff4500] translate-x-4 translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
          
          {/* Imagen con filtro de escala de grises */}
          <div className="w-full h-full border border-[#333] bg-[#111] overflow-hidden relative z-10">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-70 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Contenedor del Texto */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-start">
        <span className="text-[#ff4500] font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block">
          // {project.category}
        </span>
        
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
          {project.title}
        </h2>
        
        <div className="w-16 h-[2px] bg-[#ff4500] mb-8"></div>
        
        <p className="text-[#888] font-mono text-sm leading-relaxed mb-8 max-w-lg">
          {project.description.es}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map(tech => (
            <span key={tech} className="border border-[#333] px-2 py-1 text-xs font-mono text-[#666] uppercase">
              {tech}
            </span>
          ))}
        </div>

        {/* Botón con Icono animado estilo Animate-UI */}
        <div className="flex gap-4">
          <a 
            href={project.links.live || '#'} 
            className="flex items-center gap-3 border border-white px-8 py-4 font-mono text-sm text-white uppercase hover:border-[#ff4500] hover:text-[#ff4500] transition-colors group/btn"
          >
            <span>View Project</span>
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