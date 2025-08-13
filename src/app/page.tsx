"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
      <p className="text-foreground/80">
        This is the home page. Use the nav to explore Projects, Blog, and Contact.
      </p>

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
  );
}
