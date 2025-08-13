"use client";

import * as React from "react";
import { Button as HeadlessButton } from "@headlessui/react";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function getVariantClasses(variant: ButtonVariant | undefined): string {
  switch (variant) {
    case "secondary":
      return "bg-black/5 text-foreground hover:bg-black/10 dark:bg-white/10 dark:text-foreground dark:hover:bg-white/15";
    case "ghost":
      return "hover:bg-black/5 dark:hover:bg-white/10";
    case "outline":
      return "border border-black/10 dark:border-white/15 bg-transparent hover:bg-black/5 dark:hover:bg-white/10";
    case "destructive":
      return "bg-red-600 text-white hover:bg-red-700";
    case "default":
    default:
      return "bg-foreground text-background hover:bg-foreground/90";
  }
}

function getSizeClasses(size: ButtonSize | undefined): string {
  switch (size) {
    case "sm":
      return "h-9 rounded-md px-3 text-sm";
    case "lg":
      return "h-11 rounded-md px-8 text-sm";
    case "icon":
      return "h-10 w-10 p-0";
    case "default":
    default:
      return "h-10 px-4 py-2 text-sm";
  }
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 disabled:pointer-events-none disabled:opacity-50";
    const classes = `${base} ${getVariantClasses(variant)} ${getSizeClasses(size)} ${className}`;
    return <HeadlessButton ref={ref} className={classes} {...props} />;
  },
);
Button.displayName = "Button";

export type { ButtonVariant, ButtonSize };
