export default getState => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  token = getState().auth.token

  if (token)
    config.headers['Authorization'] = `Token ${token}`

  return config
}