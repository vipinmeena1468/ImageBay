# ImageBay — Figma Plugin

A plugin for designers to quickly browse and place product images directly inside Figma.
Made by **Vipin Meena**.

---

## Features

- Browse 1,500+ categorised product images (Furniture, Kitchen, Bath, Lighting, and more)
- **"All" category** — view every image in a randomised order, reshuffled on every open
- One-click image placement — fills a selected shape or drops a new image node on the canvas
- Fast grid loading via WebP thumbnails
- Lazy loading for smooth scrolling
- Insert feedback — spinner while loading, green ✓ on success
- Stays up to date automatically — no plugin update needed when new images are added

---

## Installation

**1. Download the latest release**
- Go to the [Releases](https://github.com/vipinmeena1468/ImageBay/releases/latest) page
- Download **ImageBay.zip** under Assets
- Unzip to a permanent location on your computer (e.g. `Documents/Figma Plugins/ImageBay`)

**2. Import into Figma**
- Open **Figma Desktop** (not the browser)
- Go to **Menu → Plugins → Development → Import plugin from manifest…**
- Select the `manifest.json` file inside the unzipped folder
- Done — ImageBay will appear under **Plugins → Development → ImageBay**

**3. Run the plugin**
- Open any Figma file
- Go to **Plugins → Development → ImageBay**
- Browse by category or use "All", and click any image to place it

---

## How it stays up to date

ImageBay pulls images from the [library-assets](https://github.com/vipinmeena1468/library-assets) repository via GitHub's raw CDN. When new images are uploaded there, a GitHub Actions workflow automatically generates thumbnails and rebuilds the index. **Everyone using the plugin sees new images instantly — no plugin update required.**

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full history of changes.
