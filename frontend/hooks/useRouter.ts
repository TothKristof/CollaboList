import { useRouter as nextUseRouter } from 'next/navigation'

export function useRouter() {
  if (typeof window === 'undefined') return null
  try {
    return nextUseRouter()
  } catch {
    return {
      push: () => {},
      replace: () => {},
      refresh: () => {},
      back: () => {},
      forward: () => {},
      prefetch: async () => {},
    }
  }
}
