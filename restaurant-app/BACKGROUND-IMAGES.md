# Adding Custom Background Images

The landing page currently uses a gradient placeholder background. Here's how to add your own restaurant food image:

## Option 1: Local Image (Recommended for Production)

1. **Add your image to the public folder:**
   ```
   restaurant-app/
   └── public/
       └── images/
           └── hero-bg.jpg
   ```

2. **Update the background in `app/page.jsx`:**
   
   Find this line (around line 38):
   ```jsx
   style={{
     backgroundImage: `url('data:image/svg+xml,...')`,
   }}
   ```

   Replace with:
   ```jsx
   style={{
     backgroundImage: `url('/images/hero-bg.jpg')`,
   }}
   ```

## Option 2: External URL (Quick Testing)

Replace the background style with:
```jsx
style={{
  backgroundImage: `url('https://your-image-url.com/food.jpg')`,
}}
```

## Option 3: Next.js Image Component (Best Performance)

For optimal performance, use Next.js Image component:

1. **Import Image at the top of `page.jsx`:**
   ```jsx
   import Image from 'next/image';
   ```

2. **Replace the background div (around line 35-43) with:**
   ```jsx
   <div className="absolute inset-0">
     <Image
       src="/images/hero-bg.jpg"
       alt="Restaurant food background"
       fill
       quality={90}
       priority
       className="object-cover"
     />
     
     {/* Keep the overlays */}
     <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
     <div className="absolute inset-0 bg-maroon/20 mix-blend-multiply" />
     {/* ... rest of overlays ... */}
   </div>
   ```

## Recommended Image Specifications

- **Resolution**: 1920x1080px or higher
- **Format**: JPG (for photos) or WebP (for better compression)
- **Aspect Ratio**: 16:9 or wider
- **File Size**: Under 500KB (optimize with tools like TinyPNG)
- **Subject**: Food plated beautifully, slightly blurred or with shallow depth of field
- **Lighting**: Warm, appetizing lighting

## Image Optimization Tips

1. **Compress your images:**
   - Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
   - Target 200-300KB for web delivery

2. **Generate multiple sizes:**
   ```bash
   # If you have ImageMagick installed
   convert hero-bg.jpg -resize 1920x1080 hero-bg-large.jpg
   convert hero-bg.jpg -resize 1280x720 hero-bg-medium.jpg
   convert hero-bg.jpg -resize 640x360 hero-bg-small.jpg
   ```

3. **Use WebP format:**
   ```bash
   # Convert to WebP with ImageMagick
   convert hero-bg.jpg -quality 80 hero-bg.webp
   ```

## Example: Using Unsplash for Testing

For testing purposes, you can use Unsplash images:

```jsx
style={{
  backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80')`,
}}
```

Popular food photography on Unsplash:
- Restaurant interiors
- Plated gourmet dishes
- Grilled meats/kebabs (like your India Restaurant theme)
- Elegant table settings

## Adjusting Overlays

If your image is too bright or too dark, adjust the overlays in `page.jsx`:

**For darker images** (to lighten):
```jsx
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
```

**For lighter images** (to darken):
```jsx
<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
```

**Adjust maroon tint intensity:**
```jsx
<div className="absolute inset-0 bg-maroon/30 mix-blend-multiply" /> {/* Increase from /20 to /30 */}
```

---

After adding your image, run `npm run dev` to see the changes!
