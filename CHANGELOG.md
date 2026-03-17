# Changelog

All notable changes to ImageBay are documented here.

---

## [2.0.0] — 2026-03-17

A major performance and experience overhaul.

### Added
- **Thumbnail system** — the grid now loads 400px WebP thumbnails instead of full-resolution images, dramatically reducing load times
- **"All" category** — restored and working, showing all 1,500+ images in a randomised order on every open so every image gets a chance to appear first
- **Automated asset pipeline** — a GitHub Actions workflow on the `library-assets` repo auto-generates thumbnails and rebuilds `index.json` whenever new images are pushed; no manual steps needed
- **Insert feedback** — clicked tile now shows a spinner while the image is being sent to Figma, a green ✓ on success, and a red ✕ on failure
- **Scrollable filter menu** — dropdown now has a max-height and scrolls, preventing overflow with many categories

### Fixed
- Grid loading was extremely slow — full-resolution images were being used as thumbnails; replaced with WebP thumbnails
- `window.onmessage` handler was empty, silently dropping all `insert-complete` and `insert-error` messages from the plugin backend
- Category switching had arbitrary `setTimeout` delays causing jank; now instant
- Filter menu had no `max-height` and could extend off-screen

### Changed
- Grid switched to 2-column layout for larger, more usable image previews
- Plugin opens on "All" by default instead of the first category
- Inserted images now appear as **"Image"** in the Figma layers panel instead of "Rectangle"

---

## [1.0.0] — 2025-12-04

Initial release.

### Features
- Browse product images organised by category (Furniture, Kitchen, Bath, Lighting, etc.)
- One-click image insertion — fills a selected shape or creates a new node on the canvas
- Lazy loading with Intersection Observer for smooth scrolling
- Shimmer skeleton loading placeholders
- Category filter dropdown
- Images hosted on a separate `library-assets` GitHub repo — auto-updates when new images are uploaded, no plugin changes needed
