// Show the UI defined in ui.html
figma.showUI(__html__, {
    width: 420,
    height: 600
  });
  
  // Listen for messages from the UI
  figma.ui.onmessage = async (msg) => {
    if (msg.type === 'place-image' && typeof msg.url === 'string') {
      try {
        // Fetch image bytes from the given URL
        const res = await fetch(msg.url);
        const arrayBuffer = await res.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
  
        // Create a Figma image from the bytes
        const image = figma.createImage(bytes);
  
        const imagePaint = {
          type: 'IMAGE',
          scaleMode: 'FILL',
          imageHash: image.hash
        };
  
        const selection = figma.currentPage.selection;
        let placedOnSelection = false;
  
        // If something is selected, apply the image as fill
        if (selection.length > 0) {
          for (const node of selection) {
            if ('fills' in node) {
              const fills = Array.isArray(node.fills) ? node.fills : [];
              const newFills = fills.length > 0 ? fills.slice() : [];
              newFills[0] = imagePaint;
              node.fills = newFills;
              placedOnSelection = true;
            }
          }
        }
  
        // If nothing is selected, create a new rectangle at the image's true size
        if (!placedOnSelection) {
          const { width, height } = await image.getSizeAsync();
  
          const rect = figma.createRectangle();
          rect.resize(width, height);
          rect.fills = [imagePaint];
  
          const viewport = figma.viewport;
          rect.x = viewport.center.x - rect.width / 2;
          rect.y = viewport.center.y - rect.height / 2;
  
          figma.currentPage.appendChild(rect);
        }
  
        figma.notify('Image placed from ImageBay');
      } catch (error) {
        figma.notify('Failed to place image');
        console.error('ImageBay error:', error);
      }
    }
  };
  