import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-black/10 dark:border-white/10 bg-background shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardSectionProps) {
  return <div className={`p-5 pb-0 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: CardSectionProps) {
  return <div className={`text-lg font-semibold ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }: CardSectionProps) {
  return <div className={`text-sm text-foreground/80 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: CardSectionProps) {
  return <div className={`p-5 pt-3 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: CardSectionProps) {
  return <div className={`p-5 pt-0 flex items-center gap-2 ${className}`} {...props} />;
}
