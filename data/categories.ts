import { Home, Car, ShoppingCart } from "lucide-react";
import { Category } from "@/types/categoryType";

export const categories = {
  Home: {
    icon: Home,
    color: "#16a34a",
  },
  Cars: {
    icon: Car,
    color: "#2563eb",
  },
  Shop: {
    icon: ShoppingCart,
    color: "#f97316",
  },
} as const;

export type CategoryKey = keyof typeof categories;
