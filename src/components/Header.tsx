"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "NEWS", href: "/news" },
    { label: "ARTICLES", href: "/articles" },
    { label: "MOVIE", href: "/youtube" },
    { label: "PROFILE", href: "/profile" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xs transition-all duration-300 border-b ${
        isScrolled ? "border-zinc-200/90 shadow-2xs py-0" : "border-zinc-200/60 py-1"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-18"}`}>
          
          {/* Logo & Subtitle */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-1 h-5 sm:h-6 bg-yellow-500 rounded-none group-hover:bg-amber-600 transition-colors" />
            <div className="flex flex-col">
              <span className={`font-extrabold tracking-tight text-zinc-950 leading-tight group-hover:text-amber-900 transition-all ${isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}>
                しょこらの部屋
              </span>
              <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase">
                SHOKO TAKIWAKI UNOFFICIAL FAN SITE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation & Sharp Search */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-xs font-bold tracking-widest text-zinc-800 font-mono">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-amber-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH..."
                className="w-40 pl-8 pr-3 py-1.5 text-xs bg-zinc-50 rounded-xs border border-zinc-200 focus:outline-none focus:bg-white focus:border-zinc-400 transition-colors font-mono uppercase"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-800 hover:text-amber-600 focus:outline-none"
              aria-label="メニューを開く"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 rounded-xs border border-zinc-200 focus:outline-none focus:border-zinc-400 font-mono"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </form>

          <nav className="grid grid-cols-2 gap-2 text-xs font-bold text-zinc-800 font-mono">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 rounded-xs border border-zinc-200 text-center tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
