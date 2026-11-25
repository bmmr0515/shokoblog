import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const routes = [
    "",
    "/quiz",
    "/news",
    "/articles",
    "/youtube",
    "/profile",
    "/about",
    "/contact",
    "/disclaimer",
    "/privacy",
    "/policy",
    "/operator",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/news" || route === "/quiz" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/quiz" ? 0.9 : 0.8,
  }));
}
