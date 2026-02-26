const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  // Hero
  { path: 'public/images/hero/hero-bottle.jpg', w: 1200, h: 1600, bg: '#E8E4DC', text: 'VELVORA Hero' },
  // Products
  { path: 'public/images/products/noir-absolu.jpg', w: 800, h: 1067, bg: '#1a1a1a', text: 'Noir Absolu', textColor: '#d4af6a' },
  { path: 'public/images/products/jardin-nocturne.jpg', w: 800, h: 1067, bg: '#1C3527', text: 'Jardin Nocturne', textColor: '#c9d4c0' },
  { path: 'public/images/products/sol-invictus.jpg', w: 800, h: 1067, bg: '#D4C5A0', text: 'Sol Invictus', textColor: '#2a2015' },
  { path: 'public/images/products/eau-de-silence.jpg', w: 800, h: 1067, bg: '#C8BDB0', text: 'Eau de Silence', textColor: '#2a2a2a' },
  { path: 'public/images/products/ambre-sauvage.jpg', w: 800, h: 1067, bg: '#8B6914', text: 'Ambre Sauvage', textColor: '#fff8e7' },
  { path: 'public/images/products/fleur-de-feu.jpg', w: 800, h: 1067, bg: '#6B2030', text: 'Fleur de Feu', textColor: '#f5d0d8' },
  // Editorial
  { path: 'public/images/editorial/layering.jpg', w: 1200, h: 675, bg: '#2C2420', text: 'The Art of Layering', textColor: '#d4af6a' },
  { path: 'public/images/editorial/grasse.jpg', w: 1200, h: 675, bg: '#4A6741', text: 'Grasse at Dawn', textColor: '#f0e8d0' },
  { path: 'public/images/editorial/memory.jpg', w: 1200, h: 675, bg: '#3A3040', text: 'Scent and Memory', textColor: '#d4c4e0' },
  { path: 'public/images/editorial/philosophy.jpg', w: 800, h: 800, bg: '#1C2A20', text: 'Philosophy', textColor: '#b8963e' },
];

async function generate() {
  for (const img of images) {
    const dir = path.dirname(img.path);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const tc = img.textColor || '#6B6B6B';
    const svg = `
      <svg width="${img.w}" height="${img.h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${img.bg}"/>
        <text x="50%" y="48%" text-anchor="middle" fill="${tc}" font-family="Georgia, serif" font-size="${Math.round(img.w * 0.04)}" font-weight="300" letter-spacing="4">${img.text.toUpperCase()}</text>
        <text x="50%" y="55%" text-anchor="middle" fill="${tc}" font-family="Arial, sans-serif" font-size="${Math.round(img.w * 0.015)}" opacity="0.5" letter-spacing="3">PLACEHOLDER</text>
        <line x1="${img.w * 0.35}" y1="${img.h * 0.51}" x2="${img.w * 0.65}" y2="${img.h * 0.51}" stroke="${tc}" stroke-width="0.5" opacity="0.3"/>
      </svg>`;
    
    await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(img.path);
    console.log(`✓ ${img.path}`);
  }
  console.log('Done!');
}

generate();
