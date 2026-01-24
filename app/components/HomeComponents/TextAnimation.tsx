import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";


interface TextAnimateProps extends HTMLMotionProps<"div"> {
  text: string;
  type?: "whipInUp" | "fadeInUp" | "popIn";
  delay?: number;
  colorfulText?: React.ReactNode;
  className?: string;
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  text,
  type = "fadeInUp",
  delay = 0,
  colorfulText,
  className,
  ...props
}) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i + delay },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: type === "whipInUp" ? 50 : 20,
      scale: type === "popIn" ? 0.5 : 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Split text into words for better animation control
  const words = text.split(" ");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("flex flex-wrap justify-center gap-x-[0.15em] font-my-font-bold", className)}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span variants={childVariants} key={index} className="inline-block text-transparent bg-clip-text bg-black dark:bg-linear-to-b from-white to-zinc-500 drop-shadow-2xl">
          {word}
        </motion.span>
      ))}
      
      {/* If there's a custom component to append (like the Colorful Name) */}
      {colorfulText && (
        <motion.div variants={childVariants} className="inline-block ml-[0.05em]">
          {colorfulText}
        </motion.div>
      )}
    </motion.div>
  );
};
