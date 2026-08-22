import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const routes = [
    "",
    "/news",
    "/articles",
    "/youtube",
    "/profile",
    "/about",
    "/contact",
    "/disclaimer",
    "/privacy",
    "/operator",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/news" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
