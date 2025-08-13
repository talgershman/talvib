"use client";

import { Disclosure } from "@headlessui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const imageRef = React.useRef<HTMLDivElement | null>(null);
  const remoteHeroUrl =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop";
  const [heroSrc, setHeroSrc] = React.useState<string>("/globe.svg");

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const ctx = gsap.context(() => {
      gsap.to(image, {
        scale: 1.2,
        ease: "none",
        transformOrigin: "center center",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });
    }, container);

    // Preload remote hero image; only swap if it loads successfully
    const testImage = new window.Image();
    testImage.onload = () => {
      setHeroSrc(remoteHeroUrl);
    };
    testImage.onerror = () => {
      setHeroSrc("/globe.svg");
    };
    testImage.src = remoteHeroUrl;

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  return (
    <div className="space-y-24">
      {/* Apple-style pinned hero */}
      <section ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background image with slow zoom */}
          <div ref={imageRef} className="absolute inset-0 will-change-transform">
            <Image
              src={heroSrc}
              alt="Atmospheric mountain landscape at dawn"
              fill
              priority
              sizes="100vw"
              unoptimized
              onError={() => setHeroSrc("/globe.svg")}
              className="object-cover"
            />
            {/* Subtle overlay for readability */}
            <div className="absolute inset-0 bg-background/40" />
          </div>

          {/* Pinned content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                Built for clarity and speed
              </h1>
              <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                A minimal Next.js starter powered by Tailwind tokens and Headless UI.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button>Get Started</Button>
                <Button variant="outline">View Projects</Button>
                <DropdownMenu
                  button={<span>More</span>}
                  items={[
                    { id: "docs", label: "Docs", href: "/style-guide" },
                    { id: "contact", label: "Contact", href: "/contact" },
                  ]}
                />
              </div>

              {/* Headless UI Disclosure for extra info */}
              <div className="mx-auto mt-6 max-w-2xl text-left">
                <Disclosure>
                  {({ open: isOpen }) => (
                    <div className="rounded-md bg-background/60 ring-1 ring-black/10 backdrop-blur-sm dark:ring-white/10">
                      <Disclosure.Button className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
                        <span>Learn more</span>
                        <span className="text-foreground/60">{isOpen ? "−" : "+"}</span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pb-4 text-sm text-foreground/80">
                        This hero uses a pinned layout with a subtle zoom effect powered by GSAP
                        ScrollTrigger. Replace the background image in the public directory to
                        customize.
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing demo UI below hero */}
      <section className="space-y-6 px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Components</h2>
        <p className="text-foreground/80">Explore some UI primitives used throughout the site.</p>

        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          <DropdownMenu
            button={<span>Menu</span>}
            items={[
              { id: "profile", label: "Profile", href: "/#" },
              { id: "settings", label: "Settings", onSelect: () => alert("Settings clicked") },
            ]}
          />
        </div>

        <Modal isOpen={open} onClose={() => setOpen(false)} title="Example Modal">
          This is a Headless UI dialog styled with Tailwind.
        </Modal>
      </section>
    </div>
  );
}
