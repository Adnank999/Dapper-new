"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";
import IconCloud from "../IconCloud";

const GlowingEffectDemo = function GlowingEffect() {

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4">
      {/* Top-left */}
      <GridItem
        area=""
        icon={<Box className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Client-First Approach"
        description="Building trust through transparent communication and collaboration."
      />

      {/* Center - Modern Tech Stack, spans 2 rows */}
      <GridItem
        
        area="md:row-span-2"
        icon={<Lock className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Modern Tech Stack"
        description="Technologies and tools I use to build innovative solutions"
        techIcons={[
          { icon: "/icons/React.svg", name: "React" },
          { icon: "/icons/Javascript.svg", name: "Javascript" },
          { icon: "/icons/TypeScript.svg", name: "TypeScript" },
          { icon: "/icons/nextjs.svg", name: "Next.js" },
          // { icon: "/icons/FastAPI.svg", name: "FastAPI" },
          // { icon: "/icons/Nodejs.svg", name: "Node.js" },
          { icon: "/icons/Nuxt.svg", name: "Nuxt" },
          { icon: "/icons/Php.svg", name: "PHP" },
          { icon: "/icons/Spring.svg", name: "Spring" },
          { icon: "/icons/Svelte.svg", name: "Svelte" },
          { icon: "/icons/Python.svg", name: "Python" },
          { icon: "/icons/Laravel.svg", name: "Laravel" },
          { icon: "/icons/Vue.svg", name: "Vue.js" },
          
        ]}
      />

      {/* Top-right */}
      <GridItem
        area=""
        icon={<Sparkles className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="AI-Powered Solutions"
        description="Specializing in intelligent automation and LLM integrations."
      />

      {/* Bottom-left */}
      <GridItem
        area=""
        icon={<Settings className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Global Flexibility"
        description="Available across time zones for seamless worldwide collaboration."
      />

      {/* Bottom-right */}
      <GridItem
        area=""
        icon={<Search className="h-4 w-4 text-white dark:text-neutral-400" />}
        title="Ready to Collaborate"
        description="Let's create something amazing together"
      />
    </ul>
  );
};

export default React.memo(GlowingEffectDemo);

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  techIcons?: Array<{
    icon: string | StaticImport;
    name: string;
  }>;
  title: string;
  description: React.ReactNode;
}


const GridItem = ({ area, icon, title, description, techIcons }: GridItemProps) => {
  return (
    <li className={`min-h-56 list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 border-neutral-200 dark:border-neutral-800">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

        <div
          className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6
                     bg-white text-neutral-900 border border-neutral-200
                     dark:bg-transparent dark:border-neutral-800 dark:text-white
                     dark:shadow-[0px_0px_27px_0px_#2D2D2D]"
        >
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 text-xl/[1.375rem] font-semibold text-balance text-neutral-900 md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>

              <p className="text-sm/[1.125rem] md:text-sm/[1.375rem] text-neutral-700 dark:text-neutral-400 md:[&_b]:font-semibold md:[&_strong]:font-semibold tracking-wider">
                {description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4 mt-6">
                {techIcons?.map((tech, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center px-3 py-2.5 rounded-lg border transition-all duration-300 shadow-lg
                               border-neutral-200 bg-white/80 hover:border-neutral-300 hover:bg-white
                               dark:border-gray-600/70 dark:bg-gray-900/40 dark:hover:border-gray-500 dark:hover:bg-gray-800/50"
                  >
                    <div className="p-1.5 rounded-md bg-neutral-100 dark:bg-gray-800/80">
                      <Image src={tech.icon} alt={tech.name} width={24} height={24} className="h-6 w-6" />
                    </div>
                    <p className="mt-2.5 text-[10px] font-mono font-bold text-neutral-700 dark:text-gray-300">
                      {tech.name}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

