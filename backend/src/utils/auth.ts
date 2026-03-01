export function requireAuth(context: any) {
  if (!context.userId) {
    throw new Error("Not authenticated");
  }
}