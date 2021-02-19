export function isAdmin(user) {
  return user.roles?.includes("admin");
}

export function isUser(user) {
  return user.roles?.includes("user");
}
