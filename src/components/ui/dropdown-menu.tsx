"use client";

import { Menu, Transition } from "@headlessui/react";
import * as React from "react";

export interface DropdownItem {
  id: string;
  label: string;
  onSelect?: () => void;
  href?: string;
}

export interface DropdownMenuProps {
  button: React.ReactNode;
  items: DropdownItem[];
  asChild?: boolean;
}

export function DropdownMenu({ button, items, asChild = false }: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {asChild ? (
        <Menu.Button as={React.Fragment}>{button}</Menu.Button>
      ) : (
        <Menu.Button className="inline-flex items-center justify-center gap-2 rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30">
          {button}
        </Menu.Button>
      )}
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-black/10 dark:border-white/15 bg-background p-1 shadow-lg focus:outline-none">
          {items.map((item) => (
            <Menu.Item key={item.id}>
              {({ active }) =>
                item.href ? (
                  <a
                    href={item.href}
                    className={`block rounded-sm px-3 py-2 text-sm ${
                      active ? "bg-black/5 dark:bg-white/10" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onSelect}
                    className={`w-full text-left rounded-sm px-3 py-2 text-sm ${
                      active ? "bg-black/5 dark:bg-white/10" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                )
              }
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

