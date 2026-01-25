"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useMenuContext } from "../context/MenuContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LoginButton from "./LoginLogoutButton";
import { useTransitionRouter } from "next-view-transitions";
import { ModeToggle } from "./ModeToggle";
import { LogoutButton } from "./LogoutButton";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "WORK", href: "/project" },
  { name: "CONTACT", href: "/contact" },
];

export const CurvedNavbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenuContext();
  const router = useTransitionRouter();
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  let lastScroll = useRef(0);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current) {
        // Scroll Down
        gsap.to(navbar, {
          yPercent: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      } else if (currentScroll < lastScroll.current) {
        // Scroll Up
        gsap.to(navbar, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative z-[50] w-full">
      <div className="fixed top-0 left-0 w-full px-6 mt-10 hidden md:flex items-center justify-between z-[100]">
        <div className="w-32 !bg-red-600" />

        {/* ✅ Only changed light-mode styles here */}
        <nav
          ref={navbarRef}
          className="
            max-w-fit cursor-pointer backdrop-blur-md shadow-lg px-8 py-1 rounded-full transition-all duration-300 mx-auto
            bg-white/70 border border-slate-200
            dark:bg-white/10 dark:border-white/20
          "
        >
          {/* ✅ Only changed light-mode text color here */}
          <ul className="flex justify-center items-center gap-8 font-normal text-xl text-slate-900 dark:text-white">
            {navLinks.map(({ name, href }) => (
              <li
                // href={href}
                key={name}
                className="
                  relative font-my-font-bold tracking-wide text-lg rounded-full px-5 py-1 transition duration-300
                  hover:border-b hover:border-b-blue-400 hover:shadow-[0_4px_10px_2px_rgba(59,130,246,0.5)]
                "
                onClick={() => router.push(href)}
                // prefetch={true}
              >
                {name}
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px hover:bg-linear-to-r from-transparent via-blue-500 to-transparent h-px" />
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-32 flex justify-end">
          <ModeToggle />
          <LogoutButton/>
        </div>
      </div>

      <MobileMenu />
    </div>
  );
};

export default CurvedNavbar;
