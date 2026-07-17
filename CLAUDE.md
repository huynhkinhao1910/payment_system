# payment-fe

React 19 + Vite + Tailwind v4 + react-router v7. Mock data only — no backend yet.

## Table row actions

Every table's Action column follows this shape. `MerchantTable.tsx` is the reference.

- **Navigation is a `<Link>`, not a `<button>`.** View and Edit change the URL, so they must be
  links — middle-click, open-in-new-tab, and copy-link all break on a button. Only actions with no
  destination (Reset Password) stay buttons.
- **Routes:** view is `/<resource>/:code`, edit is `/<resource>/:code/edit`, add is `/<resource>/new`.
- **Every action needs an `aria-label` naming the record**, e.g. `View SO0001`. The icon is
  decorative: `alt=""`. Without this the whole column is ten identical unlabeled controls.
- **Hover is a tinted disc**, via the `ACTION` constant — the icons are `<img>` SVGs, so the glyph
  can't be recoloured without inlining it. Tints are by intent, not by icon:
  blue `#e3f0ff` = view/neutral, green `#e0f5e8` = edit/positive, orange `#ffeede` = caution,
  red = destructive. Reuse these, don't invent a new tint per table.
- **Discs are 26px in a 100px column with `gap-[6px]`.** Adding a fourth action means widening the
  column, not shrinking the gap below 6px.

Do not extract a shared `<RowAction>` component until a second table needs one.

## Inputs and form fields

Shared fields live in `src/shared/ui/`. Reuse them; don't hand-roll an `<input>` in a page.

- **Restyle the native element, never rebuild it.** The switch is a real `<input type="checkbox">`
  (`Toggle`), the radios are real radios with `accent-color`, the date field is
  `<input type="date">` (`DateInput`). Native gives keyboard, form, and a11y behaviour for free.
- **Extend `InputHTMLAttributes`, don't re-declare props.** `TextField`/`DateInput` spread `...input`
  onto the element, so `disabled`, `required`, `maxLength`, `autoComplete` all work with no code
  change. Adding a prop that duplicates a native attribute is the wrong fix — pass the attribute.
- **`className` targets the input; outer layout goes through `wrapperClassName`.** Callers size
  fields from the page, e.g. `wrapperClassName="w-full max-w-[465px]"`.
- **Controlled, always.** Text fields take `value` + `onChange(event)`. Non-text wrappers
  (`Toggle`, `RadioGroup`) take `value`/`checked` + `onChange(value)` — the unwrapped value, not the
  event, since the caller never wants the event.
- **The `<label>` wraps the input**, so no `htmlFor`/`id` pairing. Grouped controls use
  `<fieldset>` + `<legend>` (`RadioGroup`).
- **Errors are a string prop, not a boolean.** `error` renders the message at `text-[10px]`
  `#ff5353`, flips the border to `#ff9494`, and sets `aria-invalid`. Required is marked with a red
  `*` in the label.
- **Disabled:** `disabled:bg-[#f1f1f1]` on text inputs, `disabled:opacity-50` on controls and
  buttons. Never gate an input by swapping it for plain text — pass `disabled` and keep the field.

## Buttons

- **`type="button"` on every non-submit button.** Bare `<button>` inside a `<form>` submits it.
- Primary is `bg-[#3191ff]` white text; secondary is a white `#1b79f5` outline. Both
  `h-[30px] rounded-[3px] text-[13px] font-medium`.
- A control that navigates is a `<Link>` styled as a button, not a button with `navigate()`.

## Read-only vs editable pages

Detail and Edit are the same Figma comp, so they're the same component: `MerchantFormPage` takes
`readOnly` and disables its inputs. Add a `readOnly` mode to the existing form before writing a
separate detail page.

## Conventions

- Mark deliberate shortcuts with a `// ponytail:` comment naming the ceiling and the upgrade path.
  A comment states a constraint the code can't show — not what the next line does.
- Non-trivial logic (sorting, filtering, validation) lives in a plain `.ts` file next to the
  component with a `.test.ts` beside it — see `sortMerchants.ts` / `addMerchantForm.ts`. Components
  stay presentational and untested. Validators return `Record<string, string>` keyed by field name.
- **Repeated class strings get hoisted to a module const** in SCREAMING_SNAKE, above the component:
  `CELL`, `ACTION` (`MerchantTable`), `PAGE_BTN` (`Pagination`). Composed with a template literal at
  the call site. Three-plus repeats of the same string is the trigger.
- Modules own their routes (`modules/<name>/index.tsx` exports `<name>Routes`) and their mock data
  (`data.ts`). `app/routes.tsx` only spreads them.
- Import from `@/` — it's aliased to `src/`. No `../../`.

## Styling

- **Use a token when one exists**, raw hex only when it doesn't. Tokens are in `index.css` under
  `@theme`: `sidebar`, `canvas`, `stat-blue/green/purple/orange`, `shadow-card`. Note `stat-blue`
  *is* `#1b79f5` — existing code writes both, prefer the token in new code.
- Everything else is px/hex straight from Figma, not Tailwind's scale: `text-[11px]`, `gap-[16px]`,
  `border-[#c8c8c8]`. Don't "helpfully" convert `p-[10px]` to `p-2.5`.
- Cards are `rounded-[4px] bg-white p-[24px] shadow-card`.
- Greys, in practice: `#c8c8c8` borders, `#6c6c6c` body text, `#575757` breadcrumbs,
  `#353535` headings, `#a8a8a8` placeholders, `#eff2f7` zebra rows.

## Checks

`npx tsc -b`, `npm run lint`, `npm test`. Lint has 3 pre-existing `only-export-components` warnings.
