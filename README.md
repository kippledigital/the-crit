# The Crit - AI-Powered Design Critique Platform

A modern Next.js 14 application that provides instant, intelligent feedback on designs using AI.

## 🚀 Features

- **Instant Design Analysis**: Upload designs and get feedback in seconds
- **AI-Powered Insights**: Intelligent analysis of layout, composition, and design principles
- **Actionable Feedback**: Specific recommendations to improve your designs
- **Modern UI**: Beautiful, responsive interface with custom design system
- **Local Fonts**: Optimized performance with locally hosted Satoshi font

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: 
  - Fraunces (Google Fonts) - Display text
  - Satoshi (Local) - UI text

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#FF6D0C to #D25400)
- **Secondary**: Purple gradient (#DB1AF1 to #B30CC6)
- **Neutral**: Gray scale (#FAFAFA to #050505)

### Typography
- **Display**: Fraunces (serif) for headings
- **UI**: Satoshi (sans-serif) for body text and interface elements

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind directives
│   ├── layout.tsx       # Root layout with font configuration
│   └── page.tsx         # Landing page with chat UI
├── lib/
│   └── fonts.ts         # Font configuration (Fraunces + Satoshi)
public/
└── fonts/
    └── Satoshi/         # Local Satoshi font files
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Landing Page (`src/app/page.tsx`)
- Two-column responsive layout
- Left: Headline, subhead, and feature bullet points
- Right: Multi-step chat UI with file upload functionality

### Font Configuration (`src/lib/fonts.ts`)
- Loads Fraunces from Google Fonts
- Loads Satoshi locally from `/public/fonts/Satoshi/`
- Exposes CSS variables for use in Tailwind

### Design System (`tailwind.config.js`)
- Custom color palette
- Custom font families
- Responsive breakpoints

## 🔧 Customization

### Adding New Colors
Update the `colors` section in `tailwind.config.js`:

```javascript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ },
  neutral: { /* your colors */ },
}
```

### Adding New Fonts
1. Add font files to `/public/fonts/`
2. Update `src/lib/fonts.ts`
3. Add to `tailwind.config.js` fontFamily section

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Flexible grid layouts
- Adaptive typography

## 🎨 UI Components

### Buttons
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons  
- `.btn-outline` - Outline style buttons

### Typography
- `.font-display` - Fraunces for headings
- `.font-ui` - Satoshi for body text

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and proprietary. 