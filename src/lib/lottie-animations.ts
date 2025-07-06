// Lottie animation imports
// You can easily change which animation is used by modifying the default export

export const LOTTIE_ANIMATIONS = {
  ROCKET: '/theo-rocket.json',
  SUCCESS: '/theo-success.json',
  THUMB_UP: '/theo-thumb-up.json'
} as const

export type LottieAnimationType = keyof typeof LOTTIE_ANIMATIONS

// Default animation for loading state
export const DEFAULT_LOADING_ANIMATION = LOTTIE_ANIMATIONS.ROCKET

// Default animation for success state
export const DEFAULT_SUCCESS_ANIMATION = LOTTIE_ANIMATIONS.SUCCESS

// Helper function to get animation path
export function getAnimationPath(type: LottieAnimationType): string {
  return LOTTIE_ANIMATIONS[type]
}

// Helper function to load animation data
export async function loadAnimationData(type: LottieAnimationType) {
  try {
    const response = await fetch(getAnimationPath(type))
    return await response.json()
  } catch (error) {
    console.error(`Failed to load animation: ${type}`, error)
    return null
  }
} 