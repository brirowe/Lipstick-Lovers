# Lipstick Lovers Website

Custom Jekyll site for the Denver Queer Rec Soccer League, hosted on GitHub Pages.

## Where to edit things

| What | File |
|---|---|
| Site name, tagline, logo, email, registration toggle | `_config.yml` |
| Menu links | `_data/navigation.yml` |
| Community agreements | `_data/agreements.yml` |
| Season dates + subs blurb | `_data/season.yml` |
| Resources cards + links | `_data/resources.yml` |
| Page text | `index.md`, `about.md`, `schedule.md`, `resources.md`, `contact.md` |
| Colors + fonts | `_sass/_variables.scss` |
| All other styling | `_sass/_theme.scss` |

## Adding art

1. Put the image in `assets/img/art/` (e.g. `home-hero.png`).
2. In that page's front matter (top of the `.md` file), set `art_hero: "/assets/img/art/home-hero.png"`.

Logo: put it in `assets/img/` and set `logo:` in `_config.yml`.

## Turning on registration

In `_config.yml`, set `registration.open: true` and paste the form link into `registration.url`.

## Going live

Repo must be public (free accounts), then Settings → Pages → Deploy from branch → `main` / `(root)`.
Site will be at https://brirowe.github.io/Lipstick-Lovers/
