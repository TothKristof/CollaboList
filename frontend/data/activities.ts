import {
  PackagePlus,
  PackageMinus,
  RefreshCw,
  RefreshCcwDot,
  UserPlus,
  ListPlus,
} from "lucide-react";

export const activityCategories = {
  ADD_ITEM: {
    icon: PackagePlus,
  },
  UPDATE_ITEM: {
    icon: RefreshCw,
  },
  UPDATE_MULTIPLE_ITEM: {
    icon: RefreshCcwDot,
  },
  DELETE_ITEM: {
    icon: PackageMinus,
  },
  ADD_MEMBER: {
    icon: UserPlus,
  },
  CREATE_LIST: {
    icon: ListPlus,
  },
} as const;

export type ActivityCategoryKey = keyof typeof activityCategories;