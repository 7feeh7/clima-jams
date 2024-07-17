import 'dotenv/config'

export const auth = {
  secretKey: process.env.JWT_SECRET_KEY,
  expiresIn: '1d',
}

export const bcryptSettings = {
  salts: 10,
}
