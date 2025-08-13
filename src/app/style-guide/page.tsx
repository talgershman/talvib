"use client";

import { Listbox, Transition } from "@headlessui/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

interface Option {
  id: number;
  name: string;
}

const listboxOptions: Option[] = [
  { id: 1, name: "Alpha" },
  { id: 2, name: "Beta" },
  { id: 3, name: "Gamma" },
];

export default function StyleGuidePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<Option>(listboxOptions[0]);
  const [colorTokens, setColorTokens] = React.useState<{ background: string; foreground: string }>({
    background: "",
    foreground: "",
  });

  React.useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    setColorTokens({
      background: styles.getPropertyValue("--background").trim(),
      foreground: styles.getPropertyValue("--foreground").trim(),
    });
  }, []);

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Style Guide</h1>
        <p className="text-sm text-foreground/70">
          Design tokens, Headless UI configurations, and component usage examples.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Design Tokens</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">
              Colors
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-14 rounded border border-black/10 dark:border-white/15 bg-background" />
                <div className="text-sm">
                  <div className="font-medium">background</div>
                  <div className="text-foreground/70">
                    {colorTokens.background || "var(--background)"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-14 rounded border border-black/10 dark:border-white/15 bg-foreground" />
                <div className="text-sm">
                  <div className="font-medium">foreground</div>
                  <div className="text-foreground/70">
                    {colorTokens.foreground || "var(--foreground)"}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-foreground/70">
              Semantic colors are mapped via CSS variables in <code>globals.css</code> and consumed
              with Tailwind classes like <code>bg-background</code> and <code>text-foreground</code>
              .
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">
              Typography
            </h3>
            <div className="space-y-1">
              <div className="text-xs text-foreground/70">Font families</div>
              <div className="text-sm">
                <span className="font-semibold">--font-sans</span>: system UI sans
              </div>
              <div className="text-sm">
                <span className="font-semibold">--font-mono</span>: system monospace
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="p-2 rounded-md border border-black/10 dark:border-white/15 text-xs">
                text-xs
              </div>
              <div className="p-2 rounded-md border border-black/10 dark:border-white/15 text-sm">
                text-sm
              </div>
              <div className="p-2 rounded-md border border-black/10 dark:border-white/15 text-base">
                text-base
              </div>
              <div className="p-2 rounded-md border border-black/10 dark:border-white/15 text-lg">
                text-lg
              </div>
              <div className="p-2 rounded-md border border-black/10 dark:border-white/15 text-xl">
                text-xl
              </div>
              <div className="p-2 rounded-md border border-black/10 dark:border-white/15 text-2xl">
                text-2xl
              </div>
            </div>
          </div>

          <div className="space-y-3 md:col-span-2">
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">
              Spacing scale
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { k: "1", px: 4 },
                { k: "2", px: 8 },
                { k: "3", px: 12 },
                { k: "4", px: 16 },
                { k: "6", px: 24 },
                { k: "8", px: 32 },
                { k: "10", px: 40 },
                { k: "12", px: 48 },
                { k: "16", px: 64 },
              ].map((s) => (
                <div key={s.k} className="flex items-center gap-3">
                  <div className="h-2 rounded bg-foreground/20" style={{ width: s.px }} />
                  <div className="text-sm">
                    <div className="font-medium">{`{spacing.${s.k}}`}</div>
                    <div className="text-foreground/70">{s.px}px</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-foreground/70">
              Use Tailwind spacing utilities (p/m/gap) with the scale above.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Headless UI Configurations</h2>
        <div className="space-y-3 text-sm">
          <p>
            Headless UI Tailwind CSS plugin is enabled for better data-* selectors and transitions.
          </p>
          <div className="rounded-md border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 p-3">
            <div className="mb-2 text-xs text-foreground/70">src/app/globals.css</div>
            <pre className="overflow-x-auto text-xs leading-5">
              <code>{`@import "tailwindcss";
@plugin "@headlessui/tailwindcss";`}</code>
            </pre>
          </div>

          <p>
            Transitions are configured via utility classes in components like <code>Modal</code> and{" "}
            <code>DropdownMenu</code>.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Components</h2>

        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">
            Buttons
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon button">
              ★
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">Card</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  Supporting text for the card. Use this for summaries and descriptions.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button size="sm">Action</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">
            Typography
          </h3>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Heading 1</h1>
            <h2 className="text-2xl font-semibold">Heading 2</h2>
            <h3 className="text-xl font-semibold">Heading 3</h3>
            <p className="text-sm">
              Body text with{" "}
              <a href="#" className="underline">
                links
              </a>{" "}
              and{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">inline code</code>.
            </p>
            <small className="text-xs text-foreground/70">Caption or helper text</small>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">
            Dialog
          </h3>
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example modal">
              <p>
                Modal content using Headless UI <code>Dialog</code> with Tailwind transitions.
              </p>
            </Modal>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">Menu</h3>
          <DropdownMenu
            button={<span>Open menu</span>}
            items={[
              { id: "1", label: "Item A", href: "#" },
              { id: "2", label: "Item B", href: "#" },
              { id: "3", label: "Item C", href: "#" },
            ]}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">
            Listbox
          </h3>
          <div className="w-64">
            <Listbox value={selectedOption} onChange={setSelectedOption}>
              <div className="relative">
                <Listbox.Button className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-left text-sm shadow-sm hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30">
                  {selectedOption.name}
                </Listbox.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Listbox.Options className="absolute z-10 mt-2 w-full rounded-md border border-black/10 dark:border-white/15 bg-background p-1 shadow-lg focus:outline-none">
                    {listboxOptions.map((opt) => (
                      <Listbox.Option
                        key={opt.id}
                        value={opt}
                        className={({ active }) =>
                          `cursor-pointer rounded-sm px-3 py-2 text-sm ${active ? "bg-black/5 dark:bg-white/10" : ""}`
                        }
                      >
                        {opt.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">Forms</h3>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm shadow-sm placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="jane@example.com"
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm shadow-sm placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Write your message..."
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm shadow-sm placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>
              <Listbox value={selectedOption} onChange={setSelectedOption}>
                <div className="relative">
                  <Listbox.Button className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-left text-sm shadow-sm hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30">
                    {selectedOption.name}
                  </Listbox.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Listbox.Options className="absolute z-10 mt-2 w-full rounded-md border border-black/10 dark:border-white/15 bg-background p-1 shadow-lg focus:outline-none">
                      {listboxOptions.map((opt) => (
                        <Listbox.Option
                          key={opt.id}
                          value={opt}
                          className={({ active }) =>
                            `cursor-pointer rounded-sm px-3 py-2 text-sm ${active ? "bg-black/5 dark:bg-white/10" : ""}`
                          }
                        >
                          {opt.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
