import { ActivityCategoryKey } from "@/data/activities"

export interface Activity {
    id: number
    userId: number
    message: string
    activityCategory: ActivityCategoryKey
    createdAt: Date
}