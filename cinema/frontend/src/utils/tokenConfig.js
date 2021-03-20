export default getState => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const token = getState().auth.token

  if (token)
    config.headers['Authorization'] = `Token ${token}`

  return config
}