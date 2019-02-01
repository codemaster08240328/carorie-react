export const getUserOptions = (users) => {
  const userOptions = (users ? users.map((user, index) => ({
    label: `${user.username} (${user.first_name} ${user.last_name})`,
    value: user.id
  })) : [])
  userOptions.unshift({
    label: '-- Select User --',
    value: ''
  })
  return userOptions
}

export const getRoleOptions = role => {
  const options = {
    'admin': [
      { value: '', label: '-- Select Role --' },
      { value: 'admin', label: 'Admin' },
      { value: 'manager', label: 'User Manager' },
      { value: 'user', label: 'Regular User' },
    ],
    'manager': [
      { value: '', label: '-- Select Role --' },
      { value: 'manager', label: 'User Manager' },
      { value: 'user', label: 'Regular User' },
    ],
    'user': [
      { value: 'user', label: 'Regular User' },
    ]
  }

  return options[role]
}
