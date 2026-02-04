# Quick Start Guide

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

## What You'll See

A luxurious full-screen hero landing page featuring:
- Full-screen background with elegant overlay effects
- Animated floating herb/ingredient particles
- Centered dramatic typography with "Come Join Us For A Magical Experience"
- Glowing text effects on key words
- Interactive "Get Started" button with multiple animation effects:
  - Shine sweep on hover
  - Scale and ripple on click
  - Pulsing glow effect
  - Bottom border highlight
- Smooth animated scroll indicator
- Gold and maroon color scheme matching premium dining aesthetic

## Next Steps

1. **Add your food background image** - See `BACKGROUND-IMAGES.md` for detailed instructions
2. Customize colors in `tailwind.config.js`
3. Modify text content in `app/page.jsx` (headline, tagline, button text)
4. Connect the "Get Started" button to your menu page/route
5. Add your restaurant logo in the header (optional)
6. Deploy to Vercel or your preferred platform

## File Structure

```
restaurant-app/
├── app/
│   ├── page.jsx       # Main landing page
│   ├── layout.jsx     # Root layout
│   └── globals.css    # Global styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

Enjoy building your premium restaurant app! 🍽️
