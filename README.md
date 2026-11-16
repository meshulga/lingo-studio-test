# Lingo Studio test repository

Test content for Studio 2.5 in the Lingo.dev (Testing) organization. It is a copy of the public [markdoc-nextjs-localization-example](https://github.com/lingodotdev/markdoc-nextjs-localization-example/tree/be2ad223abe4afd6d23e0fe54864aad3d52ebffe) at commit `be2ad223`, without `.mcp.json` and `.lingo/lock.json`, with GitHub App settings added to `.lingo/config.json`.

## Test files

| What                    | Path                                            |
| ----------------------- | ----------------------------------------------- |
| Markdoc pages (source)  | `src/content/en/pages/*.md`                     |
| Markdoc blog (source)   | `src/content/en/blog/*.md`                      |
| UI strings (source)     | `src/content/en/ui.json`                        |
| Existing translations   | `src/content/{es,fr,de}/…`, same layout as `en` |
| Lingo.dev configuration | `.lingo/config.json`                            |

Source locale is `en`; target locales are `es`, `fr`, `de`. Markdoc pages translate the `title`, `description` and `badge` frontmatter fields and the `label` prop of `bento-video` and `bento-payment`; blog posts translate `title` and `description`.

## Organization and engine

- Organization: Lingo.dev (Testing), `org_EelKieP2aYLveLe8`
- Engine: Andrey Hirsa, `eng_SHzOvfNKQ6q64w95MdBz` (existing; do not change its settings from this repo)

## Running translations

Nothing runs until the Lingo.dev GitHub App is connected separately: install it for the Testing organization and select this repository. The config enables runs on pushes to `main` and on pull requests.

Translations spend the Testing organization's credits. The config sets `github.safety.requireApproval: true`, so every run waits for approval: **Approve**/**Deny** on the check for pushes to `main`, and a `/lingo approve` reply on pull requests. A `/lingo translate` comment authorizes its own run and skips that approval.

There are no GitHub Actions in this repository. The `lingo` script in `package.json` runs the CLI's `lingo push` only when invoked by hand; avoid it unless you mean to spend credits.

## Running the site (optional)

The site does not need to run for these tests. To preview it:

```bash
pnpm install
pnpm dev
```
