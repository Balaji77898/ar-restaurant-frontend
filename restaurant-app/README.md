# Premium Restaurant Landing Page

An elegant, luxury landing page for a premium restaurant mobile/web app built with Next.js, Tailwind CSS, and Framer Motion.

## 🎨 Design Features

### Color Palette
- **Primary**: Maroon/Wine Red (`#8B2635`, `#A64253`, `#581C1C`)
- **Secondary**: Cream/Ivory (`#F5E6D3`, `#FFF8F0`, `#E8D5B7`)
- **Accent**: Gold (`#D4AF37`) and Warm Brown (`#6B4423`)

### Key Features
- 🎨 Full-screen hero section with background image overlay
- ✨ Animated gradient overlay with subtle motion
- 🌿 Floating herb/particle effects mimicking flying ingredients
- 🎯 Centered content with dramatic typography
- 📝 Beautiful typography using Playfair Display (serif) and Montserrat (sans-serif)
- 🔘 Interactive "Get Started" button with:
  - Scale animations on tap and hover
  - Ripple effect on click
  - Animated shine/glow effects
  - Pulsing background animation
  - Bottom border highlight on hover
- 💫 Glowing text effect on "Magical Experience"
- ⬇️ Animated scroll indicator
- 📱 Fully responsive, mobile-first design
- 🎬 Smooth Framer Motion animations throughout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── page.jsx          # Main landing page component
│   ├── layout.jsx        # Root layout (you'll need to create this)
│   └── globals.css       # Global styles with Tailwind directives
├── tailwind.config.js    # Tailwind configuration with custom colors
├── postcss.config.js     # PostCSS configuration
└── package.json          # Project dependencies
```

## 🎯 Using with Next.js App Router

Create the following file structure for Next.js 14+ App Router:

### `app/layout.jsx`
```jsx
import './globals.css'

export const metadata = {
  title: 'Premium Restaurant - Fine Dining Experience',
  description: 'Experience dining excellence with our premium restaurant ordering app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### `app/page.jsx`
Use the provided `page.jsx` file as your main landing page.

## 🎨 Customization

### Modify Colors
Edit `tailwind.config.js` to adjust the color palette:

```js
colors: {
  maroon: {
    light: '#A64253',
    DEFAULT: '#8B2635',
    dark: '#581C1C',
  },
  // ... more colors
}
```

### Adjust Animations
Modify Framer Motion animations in `page.jsx`:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
```

### Change Typography
Update the Google Fonts import in `page.jsx` or add fonts to your Next.js configuration.

## 🎭 Animation Details

### Background Effects
- Full-screen background with layered overlays (dark gradient + maroon tint)
- Animated gradient overlay with pulsing opacity (8s cycle)
- 30 floating herb-like particles with vertical rise and rotation
- Realistic ingredient/herb falling animation

### Button Interactions
- **Hover**: Scale up (1.05x) with enhanced gold shadow
- **Click**: Scale down (0.95x) with ripple effect emanating from click point
- **Shine**: Animated white gradient sweep across button on hover
- **Pulse**: Continuous subtle glow effect (2s cycle)
- **Border**: Bottom highlight appears on hover

### Text Effects
- Glowing "Magical Experience" text with pulsing shadow (3s cycle)
- Staggered fade-in animations for all text elements

### Page Load Sequence
1. Tagline fades in from above (0.8s)
2. Main heading fades in with upward motion (0.8s, 0.3s delay)
3. "Magical Experience" glowing effect begins
4. CTA button scales in with spring animation (0.6s, 0.6s delay)
5. Scroll indicator fades in (0.8s, 1.2s delay)
6. Scroll indicator begins continuous bounce animation

## 📱 Responsive Design

The layout is fully responsive with:
- Mobile-first approach
- Adaptive padding and spacing
- Flexible typography sizing
- Touch-optimized interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS 3.4+
- **Animation**: Framer Motion 11+
- **Fonts**: Google Fonts (Playfair Display, Montserrat)

## 📄 License

This is a premium template for restaurant applications.

## 🤝 Contributing

Feel free to customize and adapt this template for your restaurant app needs!

---

**Built with ❤️ for premium dining experiences**
