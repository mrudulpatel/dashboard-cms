import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertTimestampToISO = (timestamp: any) => {
  return new Date(timestamp.seconds * 1000).toISOString();
};
