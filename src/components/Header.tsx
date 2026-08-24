"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search, Sparkles } from "lucide-react";

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
      className={`sticky top-0 z-50 bg-[#FFFDF7]/95 backdrop-blur-xs transition-all duration-300 border-b ${
        isScrolled ? "border-[#EFE5D3] shadow-2xs py-0" : "border-[#F5ECD8] py-1"
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-18"}`}>
          
          {/* Logo & Subtitle (1行固定・Zen Maru Gothic の温かみ) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-1.5 h-5 sm:h-6 bg-[#F6C744] rounded-full group-hover:bg-[#E99A32] transition-colors shrink-0" />
            <div className="flex flex-col">
              <span className={`font-maru font-extrabold tracking-tight text-[#222222] leading-tight group-hover:text-[#5C4533] transition-all whitespace-nowrap ${isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}>
                しょこらの部屋
              </span>
              <span className="text-[9px] text-[#8C694D] font-mono tracking-widest uppercase font-bold">
                SHOKO TAKIWAKI UNOFFICIAL FAN SITE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 text-xs font-bold tracking-widest text-[#5C4533] font-mono">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#E99A32] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F6C744] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
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
                className="w-44 pl-8 pr-3 py-1.5 text-xs bg-[#FFF9ED] rounded-md border border-[#F0E4CE] text-[#5C4533] focus:outline-none focus:bg-white focus:border-[#F6C744] transition-colors font-mono uppercase"
              />
              <Search className="w-3.5 h-3.5 text-[#8C694D] absolute left-2.5 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#5C4533] hover:text-[#E99A32] focus:outline-none"
              aria-label="メニューを開く"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-[#F0E4CE] bg-[#FFFDF7] px-5 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-[#FFF9ED] rounded-md border border-[#F0E4CE] text-[#5C4533] focus:outline-none focus:border-[#F6C744] font-mono"
            />
            <Search className="w-3.5 h-3.5 text-[#8C694D] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </form>

          <nav className="grid grid-cols-2 gap-2 text-xs font-bold text-[#5C4533] font-mono">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 bg-[#FFF9ED] hover:bg-[#FFF4C7] text-[#5C4533] rounded-md border border-[#F0E4CE] text-center tracking-wider"
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
