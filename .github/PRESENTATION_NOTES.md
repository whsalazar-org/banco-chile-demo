# Presentation deck notes

## Files

| Language | Path |
| --- | --- |
| English | `docs/presentations/secure-development-with-copilot.md` |
| Español | `docs/es/secure-development-with-copilot.md` |

Both decks are [Marp](https://marp.app/) Markdown. Slide breaks are `---`.

## Convert to PowerPoint

```bash
npx @marp-team/marp-cli docs/presentations/secure-development-with-copilot.md --pptx
npx @marp-team/marp-cli docs/es/secure-development-with-copilot.md --pptx
```

## Keeping the two versions in sync

The Spanish deck is a structural mirror of the English one — same slide count, same
slide order, same code blocks. When you edit one:

1. Make the equivalent edit in the other file at the same slide position.
2. Keep technical identifiers in English in both versions: file paths,
   `copilot-instructions.md`, `.copilotignore`, `devcontainer.json`, `allowedTools`,
   CodeQL, Dependabot, Autofix, and custom agent names. These are literal strings
   developers type.
3. Translate speaker notes (HTML comments) as well as slide body text.

## Terminology (EN → ES)

| English | Español |
| --- | --- |
| guardrails | barreras de protección |
| shift-left validation | validación temprana (shift-left) |
| human-in-the-loop (HITL) | humano en el bucle (HITL) |
| least privilege | mínimo privilegio |
| environment lock | bloqueo de entorno |
| verification loop | bucle de verificación |
| push protection | protección de push |
| secret scanning | escaneo de secretos |
| supply chain | cadena de suministro |
| untrusted input | entrada no confiable |

## Before presenting

- Verify **content exclusion** behavior against your organization's Copilot plan.
  The deck says "`.copilotignore` / content-exclusion settings" deliberately, because
  support varies by client and plan. Confirm before demoing it live.
- Confirm **Copilot Autofix** and **push protection** are enabled on the demo repository.
