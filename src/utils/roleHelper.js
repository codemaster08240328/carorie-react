export const getRoleName = role => {
  const roles = {
    'admin': 'Admin',
    'manager': 'User Manager',
    'user': 'Regular User',
  }
  return roles[role]
}

export const isAdminOrManager = user => user && (user.role === 'admin' || user.role === 'manager')

export const isAdminOrUser = user => user && (user.role === 'admin' || user.role === 'user')

export const isAdmin = user => user && (user.role === 'admin')

export const isManager = user => user && (user.role === 'manager')

export const isUser = user => user && (user.role === 'user')
