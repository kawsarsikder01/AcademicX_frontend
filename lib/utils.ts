import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getFile(filename: string) {
  return `${process.env.NEXT_PUBLIC_FILE_URL}/${filename}`;
}



export function calculateDiscountedPrice(price: number, discount: number): number {
  if (discount <= 0 || discount >= 100) {
    return price; // No discount applied
  }
  const discountedPrice = price - (price * discount) / 100;
  return Math.round(discountedPrice * 100) / 100; // Round to 2 decimal places
}

export function parseOptions(str: string): string[] {
  return JSON.parse(str).map((item: string) => item.trim());
}


export function getCookie(name: string): string | undefined {
  const cookies = document.cookie.split("; ");

  console.log(cookies);
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }

  return undefined;
}

