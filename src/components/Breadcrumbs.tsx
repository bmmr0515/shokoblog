import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-1">
      <ol className="flex items-center space-x-2 text-xs text-shoko-text-sub overflow-x-auto whitespace-nowrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-shoko-orange transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>ホーム</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-3 h-3 text-shoko-text-light" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-shoko-orange transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-shoko-text-main truncate max-w-[200px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
