import { sign } from 'jsonwebtoken'

export const token = (args) => {
  return sign({ id: args }, process.env.SECRET_KEY, {
    expiresIn: '15m'
  })
}

export const refreshToken = (args) => {
  return sign({ id: args }, process.env.SECRET_KEY_REFRESH, {
    expiresIn: '7d'
  })
}
