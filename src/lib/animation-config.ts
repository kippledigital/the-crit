import { LottieAnimationType } from './lottie-animations'

// Animation Configuration
// Change these values to use different animations

export const ANIMATION_CONFIG = {
  // Loading animation (shown while submitting form)
  LOADING: 'ROCKET' as LottieAnimationType,
  
  // Success animation (shown in success modal)
  SUCCESS: 'SUCCESS' as LottieAnimationType,
  
  // Alternative success animations you can use:
  // SUCCESS: 'THUMB_UP' as LottieAnimationType,
  // SUCCESS: 'ROCKET' as LottieAnimationType,
} as const

// Success modal content configuration
export const SUCCESS_MODAL_CONFIG = {
  title: "Thanks for your submission!",
  message: "Watch your email for your critique. We'll analyze your design and send you detailed feedback within 24 hours.",
  loadingMessage: "Analyzing your design..."
} as const 