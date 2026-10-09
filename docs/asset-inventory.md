# Asset inventory

Inspected 9 October 2026. Every file under `public/` was hashed before Next.js was initialised. On the same day the truncated social square was removed from `public/` after a second integrity check. The other files were not modified.

`public/README.txt` already states the important limit: the logo was extracted from a supplied Concept 1 JPEG, not an original vector, and upscaling cannot restore detail. Pixel dimensions of 3840 do not mean the file is a true 4K master.

PNG signatures and chunk CRCs were checked. One file is truncated. The favicon is a valid ICO with four PNG images: 16, 32, 48, and 64.

## What the app may reference

| File                    | Dimensions     | Bytes   | Use              |
| ----------------------- | -------------- | ------- | ---------------- |
| `favicon.ico`           | 16, 32, 48, 64 | 12,174  | Document icon    |
| `axxis-icon-32.png`     | 32×32 RGBA     | 2,003   | Icon             |
| `axxis-icon-180.png`    | 180×180 RGBA   | 29,393  | Apple touch icon |
| `axxis-icon-192.png`    | 192×192 RGBA   | 32,404  | Icon             |
| `axxis-icon-256.png`    | 256×256 RGBA   | 52,875  | Header mark      |
| `axxis-og-1200x630.png` | 1200×630 RGBA  | 213,777 | Open Graph image |

The homepage image is the 256px mark, rendered at 48 CSS pixels through `next/image`. The 4K files are not in the page.

## Missing asset

`axxis-social-square-4k.png` is not in `public/`. The copy that was there had a valid PNG signature and IHDR (3840×3840 RGBA), then IDAT chunks. The last IDAT CRC did not match, the file ended without an IEND chunk, and a full decode failed. A truncated load showed pixel data only through about 43% of the height. The only other local copy, a temporary backup of that same file, failed the same check. No intact replacement was available, and a new square was not drawn. The file was removed so a broken image is not deployed. Restore it only from a complete export.

## Transparency

| File                              | Fully transparent | Notes                                                                                     |
| --------------------------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| `axxis-logo-transparent-4k.png`   | 86.9%             | Real cut-out. Opaque artwork sits in a 3544×687 band. Transparent pixels store black RGB. |
| `axxis-x-transparent-4k.png`      | 62.6%             | Real cut-out of the X mark. 3,071,844 bytes.                                              |
| Other RGBA exports                | 0%                | Alpha channel exists, but the minimum alpha is 18 or 28. They are not cut-outs.           |
| Heroes, backgrounds, social story | n/a               | RGB, no alpha. Appropriate for full-bleed artwork.                                        |

On `axxis-icon-512.png`, about 21% of pixels have alpha below 40. The diagonal stripe is stored as a very faint blue wash (alpha around 18–28), not as an opaque stripe. Placing these RGBA boards on a different background will show through. The small icons have the same pattern.

## 4K files are oversized and soft

A 1024px-wide sample of each 4K file was reduced to half resolution and compared with nearest-neighbour upscaling. The mean absolute difference was about 1 level on a 0–255 scale, and an edge filter averaged about 2–7. The 16px and 32px icons, by contrast, have edge energy above 90. That is what an upscale of a smaller, soft source looks like. It matches the JPEG-extraction note in `public/README.txt`.

These files are also the wrong delivery size for a page:

| File                                 | Actual size           | Concern                                                          |
| ------------------------------------ | --------------------- | ---------------------------------------------------------------- |
| `axxis-app-icon-dark-4k.png`         | 3840×3840, 2.5 MB     | Store icons are typically 1024px.                                |
| `axxis-app-icon-light-4k.png`        | 3840×3840, 2.3 MB     | Same.                                                            |
| `axxis-logo-horizontal-dark-4k.png`  | 3840×2160, 1.6 MB     | Full-bleed board, not a tight logo.                              |
| `axxis-logo-horizontal-light-4k.png` | 3840×2160, 1.4 MB     | Same.                                                            |
| `axxis-logo-stacked-light-4k.png`    | 3840×3840, 2.1 MB     | No dark stacked pair.                                            |
| `axxis-logo-transparent-4k.png`      | 3840×2160, 1.7 MB     | Large empty margin around a wide lockup.                         |
| `axxis-x-transparent-4k.png`         | 3840×3840, 3.1 MB     | Too heavy to ship to a browser.                                  |
| `axxis-background-dark-4k.png`       | 3840×2160 RGB, 0.5 MB | Soft full-bleed background.                                      |
| `axxis-background-light-4k.png`      | 3840×2160 RGB, 0.6 MB | Same.                                                            |
| `axxis-website-hero-dark-4k.png`     | 3840×2160 RGB, 0.6 MB | Same.                                                            |
| `axxis-website-hero-light-4k.png`    | 3840×2160 RGB, 0.6 MB | Same.                                                            |
| `axxis-og-4k.png`                    | 3840×2016             | Ratio matches 1200×630. Use the 1200px file for delivery.        |
| `axxis-twitter-4k.png`               | 3840×2160             | Use `axxis-twitter-1200x675.png` (1200×675) for delivery.        |
| `axxis-facebook-cover-4k.png`        | 3840×1406             | Ratio is about 2.73:1. It is not 820×312 or 851×315.             |
| `axxis-linkedin-banner-4k.png`       | 3840×960              | 4:1, which matches a personal banner ratio, not a company cover. |
| `axxis-youtube-banner-4k.png`        | 3840×2160             | Larger than YouTube’s 2560×1440 channel-art guidance.            |
| `axxis-social-story-4k.png`          | 2160×3840 RGB         | 9:16 story ratio. Still a soft 4K master.                        |

## Other sized icons

`axxis-icon-16.png`, `axxis-icon-48.png`, `axxis-icon-64.png`, and `axxis-icon-512.png` match their filenames, open cleanly, and use RGBA. They are not referenced by the shell. The 16px and 32px files are expected to look coarse; that is the pixel grid, not a failed export.

## Provisional colours sampled from the artwork

These are measurements, not an approved palette. The CSS tokens are documented in the architecture note.

| Role               | Sample                                                              |
| ------------------ | ------------------------------------------------------------------- |
| Deep navy          | `#041024`, also `#05152e` and `#0a2545` in darker boards            |
| Electric blue      | `#2467fe` on the “WORKS” wordmark; nearby samples include `#1a57f5` |
| White              | `#ffffff` and near-whites `#fafcff`, `#f2f7ff`                      |
| Wordmark grey      | `#8d8d8e` on “LTD”; too light for body text on white (about 3.3:1)  |
| Light surface tint | `#e6f0ff` at icon corners                                           |
