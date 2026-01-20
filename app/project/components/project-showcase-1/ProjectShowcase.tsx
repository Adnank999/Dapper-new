"use client";
import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, Filter } from "lucide-react";
import { Category, Project } from "@/types/projects";
import { ProjectCard } from "@/app/project/components/project-showcase-1/ProjectCard";
import { ProjectModal } from "@/app/project/components/project-showcase-1/ProjectModal";
import { GET_PROJECTS } from "@/src/lib/apollo/project/project.gql";
import { useQuery } from "@apollo/client/react";

type Props = { layout?: "split" | "grid" };

// --- Mock Data ---
// const PROJECTS: Project[] = [
//   {
//     id: "1",
//     title: "Neon Financial Dashboard",
//     category: "Development",
//     shortDescription:
//       "A real-time crypto and stock analytics dashboard with predictive AI modeling.",
//     longDescription:
//       "This dashboard provides institutional-grade analytics for retail investors. It leverages WebSockets for real-time price action and uses a custom trained TensorFlow model to predict market volatility. The UI is built for speed, handling thousands of updates per second without dropping frames.",
//     imageUrl: "https://picsum.photos/800/600?random=1",
//     technologies: ["React", "D3.js", "TypeScript", "Node.js", "WebSockets"],
//   },
//   {
//     id: "2",
//     title: "Aether Lens",
//     category: "AI",
//     shortDescription:
//       "Generative AI tool for creating high-fidelity textures for 3D environments.",
//     longDescription:
//       "Aether Lens allows game developers and 3D artists to generate seamless textures from text prompts. By integrating with Stable Diffusion and creating a custom post-processing pipeline, we ensure that all generated maps (normal, displacement, specular) are game-ready instantly.",
//     imageUrl: "https://picsum.photos/800/600?random=2",
//     technologies: ["Python", "PyTorch", "FastAPI", "React", "Three.js"],
//   },
//   {
//     id: "3",
//     title: "Urban Pulse",
//     category: "Mobile",
//     shortDescription:
//       "Smart city navigation app focusing on accessibility and safety data.",
//     longDescription:
//       "Unlike standard maps, Urban Pulse aggregates city data regarding lighting, construction, and crowd density to provide the safest walking routes. It features an offline-first architecture for reliability in poor signal areas.",
//     imageUrl: "https://picsum.photos/800/600?random=3",
//     technologies: ["React Native", "Expo", "Google Maps API", "Firebase"],
//   },
//   {
//     id: "4",
//     title: "Minimalist E-Commerce",
//     category: "Design",
//     shortDescription:
//       "An award-winning UI kit and design system for luxury fashion brands.",
//     longDescription:
//       "Focusing on negative space and typography, this design system provides a rigid yet flexible grid for showcasing high-end fashion. It includes over 40 reusable components and a comprehensive Figma style guide.",
//     imageUrl: "https://picsum.photos/800/600?random=4",
//     technologies: ["Figma", "Storybook", "Tailwind CSS", "Radix UI"],
//   },
//   {
//     id: "5",
//     title: "Orbit CRM",
//     category: "Development",
//     shortDescription:
//       "Customer relationship management tool designed for remote-first sales teams.",
//     longDescription:
//       "Orbit reimagines the CRM for the async era. It integrates deeply with Slack and Email to automatically log interactions, reducing data entry time by 70%. It features a kanban-style pipeline view and automated follow-up sequences.",
//     imageUrl: "https://picsum.photos/800/600?random=5",
//     technologies: ["Next.js", "PostgreSQL", "Prisma", "TRPC", "Stripe"],
//   },
//   {
//     id: "6",
//     title: "Sonic Stream",
//     category: "Development",
//     shortDescription:
//       "Low-latency audio streaming platform for collaborative music production.",
//     longDescription:
//       "Solving the latency issue in remote music collaboration, Sonic Stream uses WebRTC data channels to transmit high-fidelity audio with under 20ms latency peer-to-peer.",
//     imageUrl: "https://picsum.photos/800/600?random=6",
//     technologies: ["WebRTC", "Svelte", "Rust", "WebAssembly"],
//   },
//   {
//     id: "7",
//     title: "Sonic Stream",
//     category: "Development",
//     shortDescription:
//       "Low-latency audio streaming platform for collaborative music production.",
//     longDescription:
//       "Solving the latency issue in remote music collaboration, Sonic Stream uses WebRTC data channels to transmit high-fidelity audio with under 20ms latency peer-to-peer.",
//     imageUrl: "https://picsum.photos/800/600?random=6",
//     technologies: ["WebRTC", "Svelte", "Rust", "WebAssembly"],
//   },
//   {
//     id: "8",
//     title: "Sonic Stream",
//     category: "Development",
//     shortDescription:
//       "Low-latency audio streaming platform for collaborative music production.",
//     longDescription:
//       "Solving the latency issue in remote music collaboration, Sonic Stream uses WebRTC data channels to transmit high-fidelity audio with under 20ms latency peer-to-peer.",
//     imageUrl: "https://picsum.photos/800/600?random=6",
//     technologies: ["WebRTC", "Svelte", "Rust", "WebAssembly"],
//   },
//   {
//     id: "9",
//     title: "Sonic Stream",
//     category: "Development",
//     shortDescription:
//       "Low-latency audio streaming platform for collaborative music production.",
//     longDescription:
//       "Solving the latency issue in remote music collaboration, Sonic Stream uses WebRTC data channels to transmit high-fidelity audio with under 20ms latency peer-to-peer.",
//     imageUrl: "https://picsum.photos/800/600?random=6",
//     technologies: ["WebRTC", "Svelte", "Rust", "WebAssembly"],
//   },
//   {
//     id: "10",
//     title: "Sonic Stream",
//     category: "Development",
//     shortDescription:
//       "Low-latency audio streaming platform for collaborative music production.",
//     longDescription:
//       "Solving the latency issue in remote music collaboration, Sonic Stream uses WebRTC data channels to transmit high-fidelity audio with under 20ms latency peer-to-peer.",
//     imageUrl: "https://picsum.photos/800/600?random=6",
//     technologies: ["WebRTC", "Svelte", "Rust", "WebAssembly"],
//   },
// ];

const CATEGORIES: Category[] = ["All", "Development", "Design", "AI", "Mobile"];

const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const { data, loading, error } = useQuery(GET_PROJECTS);

  const filteredProjects = useMemo(() => {
    const projects: Project[] = data?.projects ?? [];
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, data?.projects]);

  return (
    <div className="text-foreground selection:bg-primary selection:text-primary-foreground pb-20 ">
      {/* Header Section */}
      {/* <header className="pt-20 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
              <Sparkles size={12} />
              <span>Available for hire</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              Selected Works
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              A collection of digital products, experiments, and open source contributions tailored for the modern web.
            </p>
          </div>
        </div>
      </header> */}

      {/* Filter Tabs */}
      {/* <div className="px-6 md:px-12 max-w-7xl mx-auto mb-10 ">
        <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground mr-2" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted/30 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
        </div>
      </div> */}

      {/* Grid Layout */}
      <main className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <motion.div key={project.id}>
              {" "}
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />{" "}
            </motion.div>
          ))}
        </div>
      </main>

      {/* Shared Layout Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectShowcase;
