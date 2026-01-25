import { LucideIcon } from "lucide-react"
import { categories } from "@/data/categories";

export interface Category {
    icon: LucideIcon,
    color: string
}

export type CategoryKey = keyof typeof categories;
