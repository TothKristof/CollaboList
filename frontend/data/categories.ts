import {
  Home,
  Cpu,
  Gamepad2,
  Palette,
  Shirt,
  BookOpen,
  Plane,
  Heart,
  Star,
} from "lucide-react";

export const categories = {
  HomeLiving: {
    icon: Home,
    color: "#16a34a", // green
  },
  Technology: {
    icon: Cpu,
    color: "#2563eb", // blue
  },
  Gaming: {
    icon: Gamepad2,
    color: "#7c3aed", // purple
  },
  Hobbies: {
    icon: Palette,
    color: "#f59e0b", // amber
  },
  Style: {
    icon: Shirt,
    color: "#ec4899", // pink
  },
  Learning: {
    icon: BookOpen,
    color: "#0d9488", // teal
  },
  Experiences: {
    icon: Plane,
    color: "#0284c7", // sky blue
  },
  Wellness: {
    icon: Heart,
    color: "#ef4444", // red
  },
  Personal: {
    icon: Star,
    color: "#64748b", // slate
  },
} as const;

export type CategoryKey = keyof typeof categories;
