// static api
import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('https://static.geoloup.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Success:', response.data);
    return response.data.url;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function generateProfilePIC(text) {
  return new Promise((resolve, reject) => {
    // Validate input
    if (typeof text !== "string" || text.length < 1 || text.length > 2) {
      reject(new Error("Text must be 1 or 2 characters."));
      return;
    }

    // Uppercase the text
    text = text.toUpperCase();

    // Create canvas
    const canvas = document.createElement('canvas');
    const size = 100;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Generate a light background color (pastel shades)
    const bgColor = '#' + Math.floor(Math.random() * 0xBBBBBB + 0x888888).toString(16).padStart(6, '0');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Set text style
    const fontSize = size / 2;
    const font = `bold ${fontSize}px 'Comic Sans MS', cursive, sans-serif`;
    ctx.font = font;
    ctx.fillStyle = "#000000"; // Black text for high contrast
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // Measure actual text size
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    // Calculate x/y to center the text
    const x = (size - textWidth) / 2;
    const y = (size - textHeight) / 2;

    // Draw text
    ctx.fillText(text, x, y + metrics.actualBoundingBoxAscent);

    // Return blob
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Failed to create blob."));
      }
    }, 'image/png');
  });
}
