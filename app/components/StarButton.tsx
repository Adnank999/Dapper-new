
"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export interface StarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const StarButton = React.forwardRef<HTMLButtonElement, StarButtonProps>(
  ({ className, label = "WISHLIST", ...props }, ref) => {
    return (
      <label className="">
         <input type="checkbox" checked className="peer hidden" readOnly/>
        <button
          ref={ref}
          className={cn(
            "group flex justify-center w-full cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-amber-500 fill-none p-2 px-3 font-extrabold text-amber-500 transition-all peer-checked:fill-amber-500 peer-checked:hover:text-white active:scale-90",
            className
          )}
          {...props}
        >
          <div className="z-10 transition group-hover:translate-x-4">
            {label}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 transition duration-500 group-hover:scale-[3000%] group-hover:-translate-x-10"
          >
            <path
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      </label>
    );
  }
);

StarButton.displayName = "StarButton";
