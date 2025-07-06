# Animation & UX Customization Guide

## Overview
This guide explains how to customize the loading and success animations in your Next.js landing page.

## Available Animations
The following Lottie animations are available in the `/public` folder:
- `theo-rocket.json` - Rocket animation (great for loading states)
- `theo-success.json` - Success checkmark animation
- `theo-thumb-up.json` - Thumbs up animation

## How to Change Animations

### 1. Quick Configuration Changes
Edit `src/lib/animation-config.ts` to change which animations are used:

```typescript
export const ANIMATION_CONFIG = {
  // Change this to use a different loading animation
  LOADING: 'ROCKET' as LottieAnimationType,
  
  // Change this to use a different success animation
  SUCCESS: 'SUCCESS' as LottieAnimationType,
  
  // Alternative options:
  // SUCCESS: 'THUMB_UP' as LottieAnimationType,
  // SUCCESS: 'ROCKET' as LottieAnimationType,
} as const
```

### 2. Customize Modal Content
In the same file, you can also customize the modal text:

```typescript
export const SUCCESS_MODAL_CONFIG = {
  title: "Thanks for your submission!",
  message: "Watch your email for your critique. We'll analyze your design and send you detailed feedback within 24 hours.",
  loadingMessage: "Analyzing your design..."
} as const
```

## Components Overview

### SuccessModal Component (Unified)
- **Location**: `src/components/SuccessModal.tsx`
- **Purpose**: Handles both loading and success states
- **Features**:
  - Dynamic content based on loading/success state
  - Loading state: Shows processing animation and message
  - Success state: Shows success animation and completion message
  - Animated entrance (fade + scale)
  - Backdrop click to close
  - Lottie animations for both states
  - Action buttons only show in success state:
    - "Submit Another Project" (resets form)
    - "Close" (just closes modal)
  - Customizable titles and messages for both states

## Adding New Animations

1. **Add your Lottie JSON file** to the `/public` folder
2. **Update the animations mapping** in `src/lib/lottie-animations.ts`:

```typescript
export const LOTTIE_ANIMATIONS = {
  ROCKET: '/theo-rocket.json',
  SUCCESS: '/theo-success.json',
  THUMB_UP: '/theo-thumb-up.json',
  YOUR_NEW_ANIMATION: '/your-new-animation.json' // Add this line
} as const
```

3. **Update the configuration** in `src/lib/animation-config.ts`:

```typescript
export const ANIMATION_CONFIG = {
  LOADING: 'YOUR_NEW_ANIMATION' as LottieAnimationType,
  SUCCESS: 'SUCCESS' as LottieAnimationType,
} as const
```

## Technical Details

### Animation Loading
- Animations are loaded asynchronously on component mount
- Uses `fetch()` to load JSON files from the public folder
- Graceful fallback to CSS spinner if Lottie fails to load

### State Management
- `showModal`: Controls modal visibility
- `isModalLoading`: Controls whether modal shows loading or success state
- `loadingAnimation` & `successAnimation`: Store loaded animation data

### Integration Points
The components are integrated into the main form submission flow:
1. User clicks submit → `showModal` becomes `true` and `isModalLoading` becomes `true` → Modal shows with loading state
2. API call completes successfully → `isModalLoading` becomes `false` → Modal switches to success state
3. User clicks "Submit Another Project" → Form resets and modal closes

## Troubleshooting

### Animation Not Loading
- Check that the JSON file exists in `/public`
- Verify the file path in `LOTTIE_ANIMATIONS`
- Check browser console for fetch errors

### Animation Not Playing
- Ensure the JSON file is valid Lottie format
- Check that `lottie-react` is properly installed
- Verify animation data is loaded before rendering

### Performance Issues
- Animations are loaded once on mount and cached
- Consider lazy loading for larger animation files
- Monitor bundle size if adding many animations 