"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Github, ExternalLink, Calendar, Code2 } from "lucide-react";
import { Project } from "@/types/projects";

// shadcn carousel (Embla)
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const images = Array.isArray(project.imageUrl) ? project.imageUrl : [];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        <motion.div
          layoutId={`card-container-${project.id}`}
          // ✅ bigger max height on large screens
          className="relative w-full max-w-7xl h-[65vh] bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto"
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Left Side: Carousel */}
          <div className="w-full h-64 md:h-full relative overflow-hidden px-0 md:px-4">
            {images.length > 0 ? (
              <Carousel className="h-full w-full flex justify-center items-center">
                <CarouselContent className="h-full">
                  {images.map((src, idx) => (
                    <CarouselItem key={`${src}-${idx}`} className="h-full">
                      {/* For animation continuity, keep layoutId only on the first image */}
                      <div className="border-none md:border md:border-black md:dark:border-white">
                        <motion.img
                          layoutId={
                            idx === 0 ? `card-image-${project.id}` : undefined
                          }
                          src={src}
                          alt={`${project.title} image ${idx + 1}`}
                          className="w-full h-full object-cover"
                          transition={{
                            duration: 0.4,
                            ease: [0.32, 0.72, 0, 1],
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Controls */}
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-3 bg-black/50 text-white hover:bg-black/70 border-none" />
                    <CarouselNext className="right-3 bg-black/50 text-white hover:bg-black/70 border-none" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
                No images
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 md:hidden pointer-events-none" />
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 flex flex-col overflow-y-auto no-scrollbar relative">
            <div className="p-6 md:p-8 flex flex-col h-full">
              {/* Header */}
              <div className="mb-6">
                <motion.p
                  layoutId={`card-category-${project.id}`}
                  className="text-sm font-semibold text-primary/80 mb-2 uppercase tracking-wide"
                >
                  {project.category}
                </motion.p>

                <div className="flex justify-between items-start">
                  <motion.h2
                    layoutId={`card-title-${project.id}`}
                    className="text-3xl font-bold text-foreground mb-4"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.div layoutId={`card-icon-${project.id}`} />
                </div>

                <div className="flex gap-3">
                  {/* Use project.link if you want */}
                  <a
                    href={project.link || "#"}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noreferrer" : undefined}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-foreground border border-border text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>

              {/* Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex-grow space-y-6"
              >
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <Code2 size={16} /> Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted/50 border border-white/10 rounded-md text-sm text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    About the project
                  </h4>
                  <motion.p
                    layoutId={`card-desc-${project.id}`}
                    className="text-foreground/80 leading-relaxed"
                  >
                    {project.longDescription}
                  </motion.p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-white/5">
                  <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    Recent Updates
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                      Implemented real-time data sync using WebSockets.
                    </li>
                    <li className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      Optimized bundle size by 40% with lazy loading.
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
