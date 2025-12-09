# 🧩 ImageBay — Figma Plugin  
A simple plugin for designers to quickly browse and place product images directly inside Figma.  
Made by **Vipin Meena**.

---

## ⚙️ Features  
- Browse categorized product images (e.g. Furniture, Kitchen, Bath, etc.)  
- Randomized “All” view for broader inspiration (Removed as of now due to performance issue)
- One-click image placement on the Figma canvas or into selected frames  
- Lazy loading for smooth scrolling  
- Preserves original image dimensions and quality  
- Works directly with assets hosted on GitHub — auto updates when you upload new images  
- Lightweight, fast, and internal-use only  

---

## 🪜 Installation (for team members)

**1. Download the plugin**
- Click the green **Code → Download ZIP** button on this page.  
- Unzip the folder to your computer (e.g. `D:\Figma Plugins\ImageBay`).

**2. Import into Figma**
- Open **Figma Desktop** (not browser).  
- Go to **Menu → Plugins → Development → Import plugin from manifest…**  
- Select the `manifest.json` file inside your unzipped folder.  
- Done! 🎉 You’ll now see **ImageBay** under:
  > Plugins → Development → ImageBay

**3. Run the plugin**
- Open any Figma file.  
- Go to **Plugins → Development → ImageBay**.  
- Select a category or view “All”, and click any image to place it.

---

## 🧠 How ImageBay stays up to date
ImageBay pulls images dynamically from the [Library Assets Repository](https://github.com/vipinmeena1468/library-assets) via GitHub’s API.  
Whenever new images are uploaded or folders are updated there, **everyone automatically sees the new images** in the plugin — no code update required.

---
