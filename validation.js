module.exports = ({ username, email, password, password2 }) => {
  let errors = []

  if (!username) {
    errors.push({ message: 'username required' })
  }

  if (!email) {
    errors.push({ message: 'email required' })
  }

  if (!password) {
    errors.push({ message: 'password required' })
  }

  if (password !== password2) {
    errors.push({ message: 'passwords do not match' })
  }

  return {
    errors,
    notValid: Boolean(errors.length)
  }
}
