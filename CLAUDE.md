# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**The Crit** is a Next.js 14 application that provides AI-powered design critique and feedback. It's built with TypeScript, Tailwind CSS, and uses a hybrid architecture with both app directory and pages directory for API routes.

## Key Commands

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Testing
The project does not currently have test scripts configured. Check with the user before adding testing frameworks.

## Architecture

### Directory Structure
- `src/app/` - Next.js 13+ app directory with main UI components
- `src/pages/api/` - API routes (using pages directory for API endpoints)
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and configurations
- `src/types/` - TypeScript type definitions
- `public/` - Static assets including custom fonts

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for interactions and Lottie for animations
- **File Handling**: Formidable for multipart form processing
- **Fonts**: Custom Satoshi font (local) + Fraunces (Google Fonts)

### Design System
The project uses a custom design system with:
- **Primary colors**: Orange gradient (#FF6D0C to #D25400)
- **Secondary colors**: Purple gradient (#DB1AF1 to #B30CC6)
- **Typography**: Fraunces (display), Satoshi (UI text)
- **Custom CSS variables**: `--font-display` and `--font-ui`

## Important Implementation Details

### Font Configuration
Fonts are configured in `src/lib/fonts.ts` and exposed as CSS variables. Always use `font-display` class for headings and `font-ui` class for body text to maintain consistency.

### API Architecture
The main form submission flows through:
1. Client form (`src/app/page.tsx`)
2. API route (`src/pages/api/submit-crit.ts`)
3. External webhook (n8n) for processing

### File Upload System
- Supports images, PDFs, and Figma files
- 5 file limit, 10MB per file
- Files are converted to base64 for API transmission
- Drag & drop functionality with visual feedback

### Component Structure
- Uses compound components pattern for modals
- Extensive use of Framer Motion for animations
- Custom tooltip system for user guidance
- Responsive design with mobile-first approach

## Development Workflow

### Making Changes
1. The main page UI is in `src/app/page.tsx`
2. Components are in `src/components/` and exported through `index.ts`
3. API logic is in `src/pages/api/submit-crit.ts`
4. Styling uses Tailwind classes with custom color palette

### Environment Variables
- `N8N_WEBHOOK_URL` - Required for form submission processing

### Common Tasks
- **UI Changes**: Modify `src/app/page.tsx` for main page layout
- **API Changes**: Update `src/pages/api/submit-crit.ts` for form processing
- **Styling**: Use existing Tailwind classes or extend in `tailwind.config.js`
- **New Components**: Add to `src/components/` and export in `index.ts`

## Special Considerations

### Hybrid Architecture
The project uses both app directory (for UI) and pages directory (for API routes). This is intentional - don't migrate API routes to app directory without explicit user request.

### Animation System
Lottie animations are preloaded and managed through `src/lib/lottie-animations.ts` and `src/lib/animation-config.ts`. Always use the existing animation system rather than creating new ones.

### Form Handling
The form uses complex state management with file handling, validation, and modal states. Be careful when modifying form logic to maintain the existing user experience flow.