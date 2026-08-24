"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Subtitle */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-1 h-6 bg-amber-500 rounded-full group-hover:bg-amber-600 transition-colors" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 leading-tight group-hover:text-amber-900 transition-colors">
                しょこらの部屋
              </span>
              <span className="text-[10px] text-gray-500 font-mono tracking-wider">
                TAKIKWAKI SHOKO UNOFFICIAL FAN SITE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation & Compact Search */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-xs font-bold tracking-widest text-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-amber-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
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
                placeholder="検索 (例: ベイスターズ)"
                className="w-48 pl-8 pr-3 py-1.5 text-xs bg-gray-50/80 rounded-md border border-gray-200 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-amber-600 focus:outline-none"
              aria-label="メニューを開く"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キーワード検索 (例: マラソン)"
              className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </form>

          <nav className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 bg-gray-50 hover:bg-amber-50 hover:text-amber-900 rounded-md border border-gray-200 text-center tracking-wider"
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
