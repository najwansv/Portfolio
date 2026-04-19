# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static HTML/CSS/JavaScript personal portfolio website for Muhammad Najwan Sulvadli, hosted on GitHub Pages. No build system, package manager, or framework — everything is plain HTML/CSS/JS served directly from the repository root.

## Development

Open in browser directly or use VS Code Live Server (configured on port 5501):
- Install the "Live Server" VS Code extension
- Right-click `index.html` → "Open with Live Server"
- Runs at `http://localhost:5501`

No build, compile, lint, or test commands exist. Changes pushed to `master` are deployed automatically via GitHub Pages.

## File Structure

- [index.html](index.html) — main single-page portfolio (all sections: Hero, About, Resume, Portfolio, Contact)
- [portfolio-details.html](portfolio-details.html) — detail view for individual portfolio projects
- [assets/css/style.css](assets/css/style.css) — all custom styles
- [assets/js/main.js](assets/js/main.js) — all custom JS (scroll behavior, nav, portfolio filter, lightbox, skills animation)
- [assets/img/](assets/img/) — profile photo, portfolio screenshots
- [assets/vendor/](assets/vendor/) — vendored libraries (Bootstrap 5, Bootstrap Icons, Boxicons, GLightbox, Isotope, Swiper, Waypoints, PureCounter)

## Architecture

`index.html` is a single scrollable page with anchor-linked sections (`#hero`, `#about`, `#resume`, `#portfolio`, `#contact`). Navigation uses `.scrollto` class with smooth-scroll handled in `main.js`.

**Key JS behaviors in `main.js`:**
- Smooth scroll with header offset via `.scrollto` links
- Header becomes `fixed-top` on scroll past its natural position
- Portfolio grid filtered by Isotope (`data-filter` attributes on `#portfolio-flters li`)
- Portfolio lightbox via GLightbox (`.portfolio-lightbox` class on links)
- Skills progress bars animated by Waypoints when scrolled into view
- `PureCounter` drives animated stat counters

**Styling conventions:**
- Primary accent: `#d43076` (pink/magenta), secondary: `#ECB365` (gold), dark: `#041C32`
- Typography: Open Sans (body), Playfair Display (headings), Poppins (UI elements)
- All vendor CSS/JS are local copies in `assets/vendor/` — do not use CDN links for vendor libs

## Adding Portfolio Items

Portfolio items in `index.html` use this pattern:
```html
<div class="col-lg-4 col-md-6 portfolio-item filter-web">
  <div class="portfolio-wrap">
    <img src="assets/img/portfolio/portfolio-N.jpg" class="img-fluid" alt="">
    <div class="portfolio-links">
      <a href="assets/img/portfolio/portfolio-N.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox">
        <i class="bx bx-plus"></i>
      </a>
      <a href="portfolio-details.html"><i class="bx bx-link"></i></a>
    </div>
  </div>
</div>
```
Filter categories are set via `data-filter` on `#portfolio-flters` items and matching `filter-*` class on portfolio items: `filter-app`, `filter-card`, `filter-web`.
