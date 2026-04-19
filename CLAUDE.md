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

- [index.html](index.html) — main single-page portfolio (sections: Hero, About, Awards, Resume, Portfolio, Contact)
- [portfolio-details.html](portfolio-details.html) — detail view for individual portfolio projects
- [assets/css/style.css](assets/css/style.css) — all custom styles (design tokens, glassmorphism, layout, responsive)
- [assets/js/main.js](assets/js/main.js) — all custom JS (cursor glow, typing effect, scroll reveal, card tilt, nav, Isotope, GLightbox, PureCounter)
- [assets/img/](assets/img/) — profile photo (`IdCard Najwan.png`), portfolio screenshots
- [assets/vendor/](assets/vendor/) — vendored libraries (Bootstrap 5, Bootstrap Icons, GLightbox, Isotope, Swiper, Waypoints, PureCounter)

## Architecture

`index.html` is a single scrollable page with anchor-linked sections. Navigation uses `.scrollto` class with smooth-scroll handled in `main.js`. Header is a floating fixed pill-style navbar (`position: fixed; transform: translateX(-50%)`).

**Key JS behaviors in `main.js`:**
- Cursor glow: `requestAnimationFrame` lerp following mouse at 8% speed
- Typing effect: cycles through 5 role phrases with type/delete animation
- Scroll reveal: `IntersectionObserver` adds `.revealed` class to `.reveal` elements
- Card tilt: `perspective(600px)` 3D rotate on mousemove (max ±6deg)
- Isotope portfolio filter via `#portfolio-flters` with `data-filter` attributes
- Portfolio lightbox via GLightbox (`.portfolio-lightbox` class)
- `PureCounter` for animated stat counters
- Mobile nav toggle: `navbar-mobile` class on `#navbar`, fixed-position dropdown

**Important: YouTube IFrame API** — the Awards section embeds a YouTube video using the IFrame API. `onYouTubeIframeAPIReady()` and `setCurrentTime()` with `videoId: 'dOU-ifVxgP4'` are in `index.html`. Do not remove or restructure this code.

## Styling Conventions

Design tokens in `style.css` `:root`:
- Background: `--bg-primary: #07070F`, `--bg-secondary: #0D0D1A`
- Accents: `--accent-cyan: #00D4FF`, `--accent-purple: #7C63FF`, `--accent-green: #00FF88`
- Glass: `--glass-bg: rgba(255,255,255,0.05)`, `--glass-border: rgba(255,255,255,0.1)`, `--blur: 16px`
- Text: `--text-primary: #F1F5F9`, `--text-secondary: #94A3B8`, `--text-muted: #64748B`
- Typography: Archivo (headings), Space Grotesk (body) — loaded from Google Fonts
- All vendor CSS/JS are local copies in `assets/vendor/` — do not use CDN links for vendor libs

**Glassmorphism pattern:** `background: var(--glass-bg); backdrop-filter: blur(var(--blur)); border: 1px solid var(--glass-border); border-radius: var(--radius);`

## Mobile Navbar

The header uses `position: fixed; left: 50%; transform: translateX(-50%)` which creates a stacking context. The mobile dropdown (`#navbar.navbar-mobile`) is therefore `position: fixed; top: 80px; left: 12px; right: 12px` (not `absolute`) to escape this stacking context and render correctly across browsers.

## Adding Portfolio Items

Portfolio items use glass card styling with gradient placeholder divs when no screenshot exists:

```html
<div class="col-lg-4 col-md-6 portfolio-item filter-ai reveal" data-reveal="up">
  <div class="portfolio-wrap tilt-card">
    <div class="portfolio-img-wrap">
      <!-- Option A: real image -->
      <img src="assets/img/portfolio/portfolio-N.jpg" class="img-fluid" alt="Project Name">
      <!-- Option B: gradient placeholder -->
      <div class="portfolio-placeholder" style="background: linear-gradient(135deg, #00D4FF22, #7C63FF44);">
        <svg><!-- icon --></svg>
      </div>
    </div>
    <div class="portfolio-overlay">
      <div class="portfolio-info">
        <h4>Project Title</h4>
        <p>Short description</p>
      </div>
      <div class="portfolio-actions">
        <a href="assets/img/portfolio/portfolio-N.jpg" class="portfolio-lightbox" title="Project Title"><i class="bi bi-zoom-in"></i></a>
        <a href="portfolio-details.html" title="Details"><i class="bi bi-link-45deg"></i></a>
      </div>
    </div>
  </div>
</div>
```

Filter categories: `filter-ai`, `filter-iot`, `filter-web`, `filter-app`, `filter-video`. Add matching `data-filter` button to `#portfolio-flters`.
