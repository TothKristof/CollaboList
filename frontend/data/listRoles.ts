export const ASSIGNABLE_LIST_ROLES = ["COLLABORATOR", "GUEST"] as const;
export type AssignableListRole = typeof ASSIGNABLE_LIST_ROLES[number];