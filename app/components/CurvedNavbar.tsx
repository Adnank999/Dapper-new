"use client";

import { useEffect, useRef } from "react";
import { useMenuContext } from "../context/MenuContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MobileMenu from "./MobileMenu";
import { useTransitionRouter } from "next-view-transitions";
import { ModeToggle } from "./ModeToggle";
import { LogoutButton } from "./LogoutButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LoginButton } from "./LoginButton";
import { AdminButton } from "./AdminButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "WORK", href: "/project" },
  { name: "CONTACT", href: "/contact" },
];

export const CurvedNavbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenuContext();
  const { user, loading } = useCurrentUser();

  console.log("Current User in Navbar:", user);
  const router = useTransitionRouter();
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const lastScroll = useRef(0);

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
    <div className="">
      <div className="fixed top-0 left-0 w-full mt-10 hidden md:block z-50">
        <div className="relative w-full px-6">
          {/* Center nav */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <nav
              ref={navbarRef}
              className="
          max-w-fit cursor-pointer backdrop-blur-md shadow-lg px-8 py-2 rounded-full transition-all duration-300
          bg-white/70 border border-slate-200
          dark:bg-white/10 dark:border-white/20
        "
            >
              <ul className="flex justify-center items-center gap-8 font-normal text-xl text-slate-900 dark:text-white">
                {navLinks.map(({ name, href }) => (
                  <Link
                    href={href}
                    key={name}
                    className="
                relative font-pp-edit-regular tracking-wider text-sm rounded-full px-5 py-1 transition duration-300
                hover:border-b hover:border-b-blue-400 hover:shadow-[0_4px_10px_2px_rgba(59,130,246,0.5)]
              "
                    // onClick={() => router.push(href)}
                    prefetch
                  >
                    {name}
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px hover:bg-linear-to-r from-transparent via-blue-500 to-transparent h-px" />
                  </Link>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right buttons */}
          <div className="flex justify-end px-12">
            <div className="h-auto flex items-start gap-6 py-1">
              <ModeToggle />
              {user && user.roles?.includes("admin") && (
                <AdminButton redirectTo="/admin/dashboard" />
              )}
              {loading ? (
                // placeholder to prevent layout shift
                <div className="h-9 w-24 rounded-md bg-black/10 dark:bg-white/10 animate-pulse" />
              ) : user ? (
                <LogoutButton />
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileMenu />
    </div>
  );
};

export default CurvedNavbar;
