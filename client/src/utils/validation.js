export function isUser(user) {
  if (user && user.roles) return true;
  return false;
}

export function isAdmin(user) {
  if (!user || !user.roles || !Array.isArray(user.roles)) return false;
  if (user.roles.indexOf('Admin') === -1) return false;
  return true;
}
