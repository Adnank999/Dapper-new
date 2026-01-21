import React from 'react';
import { motion } from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/projects';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  console.log("project", project);
  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={() => onClick(project)}
      className="cursor-pointer rounded-2xl bg-card border border-border overflow-hidden relative"
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      {/* Image Container */}
      <div className="aspect-4/3 overflow-hidden w-full relative">
        <motion.img
          layoutId={`card-image-${project.id}`}
          src={project.imageUrl[0]}
          alt={project.title}
          className="w-full h-full object-cover object-top-left"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-black/0"
          variants={{
            initial: { backgroundColor: "rgba(0,0,0,0)" },
            hover: { backgroundColor: "rgba(0,0,0,0.2)" },
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="p-5 flex flex-col gap-3"
        variants={{
          initial: { y: 0 },
          hover: { y: -4 },
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <motion.p
              layoutId={`card-category-${project.id}`}
              className="text-xs font-medium text-primary/70 mb-1 uppercase tracking-wider"
            >
              {project.category}
            </motion.p>
            <motion.h3
              layoutId={`card-title-${project.id}`}
              className="text-xl font-bold text-card-foreground leading-tight"
            >
              {project.title}
            </motion.h3>
          </div>
          <motion.div
            layoutId={`card-icon-${project.id}`}
            className="text-primary"
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>

        <motion.p
          layoutId={`card-desc-${project.id}`}
          className="text-muted-foreground text-sm line-clamp-2"
        >
          {project.shortDescription}
        </motion.p>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
