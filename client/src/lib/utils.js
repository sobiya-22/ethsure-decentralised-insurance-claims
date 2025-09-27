import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines conditional classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
