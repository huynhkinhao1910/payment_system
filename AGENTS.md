# AGENTS.md

Instructions for any coding agent (Codex, Cursor, Copilot, Claude, …) working in payment-fe.

**The authoritative conventions live in [`CLAUDE.md`](./CLAUDE.md). Read it in full before writing
code — every rule there applies to every agent, not just Claude.** This file only restates the
non-negotiables so nothing is missed; it is not a replacement.

## Format (also pinned in `.editorconfig`)

- Single quotes, no semicolons, 2-space indent, trailing commas in multiline.
- Import from `@/` (aliased to `src/`) — never `../../`.
- No Prettier in this repo. Don't add one and don't reflow lines you didn't otherwise change.

## Before claiming done

Run all three and confirm the output — never assert success without it:

```
npx tsc -b        # must be clean
npm run lint      # 3 known only-export-components warnings are expected; add no new ones
npm test          # must pass
```

## Where the patterns are (all in CLAUDE.md)

- Table row actions, buttons, inputs/form fields → their own sections.
- **List pages** (filter → sort → slice, `filterRows`, `FilterBar` + `FIELDS`) → "List pages".
- Detail/Edit reuse one form via `readOnly` → "Read-only vs editable pages".
- Styling tokens and Figma px/hex → "Styling".
- Deliberate shortcuts get a `// ponytail:` comment naming the ceiling.
