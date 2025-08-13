# Cursor Rules: TalVib Style Guide Enforcement

Purpose
- All generated or edited UI must follow the style guide at `src/app/style-guide/page.tsx`.

When to use automatically
- Trigger these rules whenever editing or creating UI-related code:
  - React route files under `src/app/**` and any `.tsx` component
  - Shared components under `src/components/**`
  - UI primitives under `src/components/ui/**`
  - Tailwind utility usage for spacing, typography, colors
  - Headless UI components (`Dialog`, `Menu`, `Listbox`, `Transition`)
  - Global styling or tokens in `src/app/globals.css`

Use Shared UI Primitives (do not hand-roll equivalents)
- Must use these components from `src/components/ui/`:
  - `Button` for all buttons and interactive CTAs
  - `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` for cards
  - `Modal` (Headless UI `Dialog`) for dialogs
  - `DropdownMenu` (Headless UI `Menu`) for menus
- If a primitive does not exist (e.g., `Input`, `Textarea`), either:
  - Use the exact classes from the Forms section of the style guide, or
  - First add a new primitive to `src/components/ui/` and use it everywhere.

Design Tokens & Colors
- Only use Tailwind semantic tokens wired in `globals.css`:
  - `bg-background`, `text-foreground`, borders `border-black/10 dark:border-white/15` when applicable
- Do NOT use raw hex colors or arbitrary CSS color values.
- Respect dark mode by relying on the provided classes and variables; do not hardcode theme-specific colors.

Typography
- Page titles: `text-3xl font-bold tracking-tight`
- Section titles: `text-xl font-semibold`
- Subsection labels: `text-sm font-medium uppercase tracking-wider text-foreground/70`
- Body text: `text-sm text-foreground/80`
- Inline code: `rounded bg-black/5 px-1 py-0.5 dark:bg-white/10`

Spacing & Layout
- Prefer `space-y-*`, `gap-*`, `p-*`, `px-*`, `py-*` using the documented scale (see style guide Spacing section).
- Avoid ad-hoc margins; use layout utilities and grid/gap.
- Cards use `p-5` for content/sections as demonstrated by `Card*` components.

Focus, States, Accessibility
- Interactive elements must include accessible focus styles. Prefer using `Button` which includes
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30`.
- Ensure `aria-*` attributes where relevant and descriptive `aria-label` for icon-only buttons.

Headless UI Conventions
- Use the transition classes as shown in `Modal`, `DropdownMenu`, and the style guide examples.
- When using `DropdownMenu` with a `Button` trigger, pass `asChild` to avoid an extra wrapper element.
- `Listbox` options and menu items should use the active state classes shown in the style guide
  (e.g., `bg-black/5 dark:bg-white/10`).

Hydration & Theming
- Do not render theme-dependent text or icons on the server that will differ on the client.
- For theme-dependent UI (like the theme toggle), gate client-only text/icons behind a mounted check
  as in `ThemeToggle`.
- Keep `<html suppressHydrationWarning>` in `src/app/layout.tsx` intact.

Adding New Patterns
- Add a working example to `src/app/style-guide/page.tsx` for any new UI pattern or variant.
- After adding, consume the new pattern via a shared primitive (in `src/components/ui/`) instead of inlining classes.

Prohibited
- Raw hex colors or CSS color values in JSX/CSS (use tokens).
- Copying Headless UI examples without adapting to our conventions (tokens, transitions, focus styles).
- Introducing new color scales or arbitrary spacing outside the documented scale without updating the style guide first.

Project Structure Expectations
- Pages/routes live under `src/app/**` and follow the typography/spacing patterns above.
- Shared UI primitives live under `src/components/ui/**` and encapsulate styling.

Quality Gates (for PRs and local changes)
- Use `Button`, `Card`, `Modal`, `DropdownMenu` primitives instead of custom markup.
- Use semantic tokens (`bg-background`, `text-foreground`) and documented spacing/typography utilities.
- Verify focus-visible styles on all interactive elements.
- Verify light/dark modes.
- If introducing a new pattern, update `/style-guide` accordingly.

