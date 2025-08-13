"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <Link href="/style-guide" className="hover:underline">
          Style Guide
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <DropdownMenu
          asChild
          button={
            <Button size="sm" variant="secondary">
              More
            </Button>
          }
          items={[
            { id: "home", label: "Home", href: "/" },
            { id: "projects", label: "Projects", href: "/projects" },
            { id: "blog", label: "Blog", href: "/blog" },
            { id: "contact", label: "Contact", href: "/contact" },
            { id: "style-guide", label: "Style Guide", href: "/style-guide" },
          ]}
        />
        <ThemeToggle />
      </div>
    </div>
  );
}
