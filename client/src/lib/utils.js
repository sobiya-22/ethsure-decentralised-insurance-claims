import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines conditional classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format wallet address to show first 6 and last 4 characters
export function formatWalletAddress(address) {
  if (!address) return "";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Format wallet address to show full address
export function formatFullWalletAddress(address) {
  if (!address) return "";
  return address;
}
