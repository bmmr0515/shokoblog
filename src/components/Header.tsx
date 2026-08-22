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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo & Subtitle */}
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 border-l-4 border-amber-500 pl-2.5 group-hover:text-amber-600 transition-colors">
              しょこらの部屋
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              瀧脇笙古 非公式ファンサイト
            </span>
          </Link>

          {/* Desktop Navigation & Compact Search */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-5 text-xs font-bold tracking-wider text-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-orange-600 transition-colors py-1 border-b-2 border-transparent hover:border-amber-500"
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
                className="w-44 pl-8 pr-3 py-1 text-xs bg-gray-50 rounded border border-gray-300 focus:outline-none focus:border-amber-500"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-gray-700 hover:text-amber-600 focus:outline-none"
              aria-label="メニューを開く"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キーワード検索 (例: マラソン)"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 rounded border border-gray-300 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </form>

          <nav className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold text-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 bg-gray-50 hover:bg-amber-50 hover:text-orange-600 rounded border border-gray-200 text-center"
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
