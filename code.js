// code.js
// ImageBay plugin logic

// Show the UI – compact size
figma.showUI(__html__, {
  width: 520,
  height: 640,
});

figma.ui.onmessage = async (msg) => {
  if (!msg || typeof msg.type !== "string") return;

  if (msg.type === "insert-image" && typeof msg.url === "string") {
    try {
      await handleInsert(msg.url);
      figma.ui.postMessage({ type: "insert-complete" });
    } catch (error) {
      console.error("Failed to insert image", error);
      figma.ui.postMessage({
        type: "insert-error",
        message:
          "Could not insert image from URL. Check your internet connection or try again.",
      });
    }
  }

  if (msg.type === "close-plugin") {
    figma.closePlugin();
  }
};

// Main insert behavior
async function handleInsert(url) {
  const image = await loadImageFromUrl(url);

  const selection = figma.currentPage.selection;
  const target = getFillTargetFromSelection(selection);

  if (target) {
    // Case 2: fill an existing frame/shape
    applyImageFillToNode(target, image);
  } else {
    // Case 1: nothing selected – create new rect at original resolution
    await createNewImageNode(image);
  }
}

// Fetch image bytes and turn into Figma image
async function loadImageFromUrl(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Network error " + res.status + " for URL " + url);
  }
  const arrayBuffer = await res.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  return figma.createImage(bytes);
}

// Decide whether we should fill an existing node
function getFillTargetFromSelection(selection) {
  if (!selection || selection.length !== 1) return null;

  const node = selection[0];

  const fillableTypes = new Set([
    "FRAME",
    "RECTANGLE",
    "ELLIPSE",
    "POLYGON",
    "STAR",
    "VECTOR",
    "COMPONENT",
    "COMPONENT_SET",
    "INSTANCE",
    "TEXT",
  ]);

  if (!fillableTypes.has(node.type)) return null;

  return node;
}

// Fill an existing node with the image
function applyImageFillToNode(node, image) {
  /** @type {Paint[]} */
  const fills = [
    {
      type: "IMAGE",
      scaleMode: "FILL",
      imageHash: image.hash,
    },
  ];

  if (node.type === "TEXT") {
    node.textAutoResize = "HEIGHT";
    node.fills = fills;
  } else {
    node.fills = fills;
  }
}

// Create a new rectangle with the image's original resolution
async function createNewImageNode(image) {
  // Get the actual pixel size from Figma
  const { width, height } = await image.getSizeAsync();

  const node = figma.createRectangle();
  node.resize(width, height);
  node.fills = [
    {
      type: "IMAGE",
      scaleMode: "FILL",
      imageHash: image.hash,
    },
  ];

  // Drop on current page, centered in viewport
  figma.currentPage.appendChild(node);
  const center = figma.viewport.center;
  node.x = center.x - node.width / 2;
  node.y = center.y - node.height / 2;

  figma.viewport.scrollAndZoomIntoView([node]);
}
