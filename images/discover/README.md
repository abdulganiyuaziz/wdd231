# Discover Page Images

This folder should contain 8 webp images for the places of interest featured on the discover page.

## Required Images

Each image should be:
- **Format**: WebP (.webp)
- **Dimensions**: 300px wide × 200px tall (or scalable aspect ratio)
- **File names** (as referenced in discover-data.mjs):

1. `osu-castle.webp` - Osu Castle / Christiansborg Castle
2. `nkrumah-mausoleum.webp` - Kwame Nkrumah Mausoleum & Tomb
3. `conference-centre.webp` - Accra International Conference Centre
4. `jamestown.webp` - Jamestown Historic District
5. `independence-avenue.webp` - Independence Avenue
6. `central-mosque.webp` - Accra Central Mosque
7. `labadi-beach.webp` - Labadi Beach
8. `national-museum.webp` - National Museum of Ghana

## How to Add Images

### Option 1: Use Existing Images
You can temporarily use images from the parent `../images/` folder by updating the paths in `discover-data.mjs`. For example:
```javascript
image: "../images/logo.jfif"
```

### Option 2: Add Your Own WebP Images
1. Find high-quality images of each location (from Unsplash, Pexels, your own photos, etc.)
2. Resize each image to 300×200px or similar aspect ratio
3. Convert to WebP format using an online converter or image editor:
   - Online tools: CloudConvert, Convertio, Online-Convert
   - Desktop: Adobe Photoshop, GIMP, ImageMagick
4. Save each file in this directory with the filename specified above

### Option 3: Convert from JPEG/PNG
If you have JPEG or PNG images:
```bash
# Using ImageMagick (command line)
convert osu-castle.jpg -resize 300x200! osu-castle.webp

# Using ffmpeg
ffmpeg -i osu-castle.jpg -vf scale=300:200 osu-castle.webp
```

## Image Specifications for Best Performance

- **Resolution**: 300×200px (or maintain 1.5:1 aspect ratio)
- **Compression**: Use optimal WebP compression (quality 75-85)
- **File size**: Target 15-30KB per image
- **Format**: WebP for best compression and modern browser support (fallback to JPEG if needed)

## Note

The discover page will still function if images are missing, but will show broken image icons. Users can proceed to test the grid layout, localStorage, and navigation functionality while waiting for images to be added.
