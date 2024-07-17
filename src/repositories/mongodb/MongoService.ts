import mongoose from 'mongoose'

import 'dotenv/config'

class MongooseService {
  constructor() {
    this.connectDB()
  }

  connectDB() {
    mongoose.set('strictQuery', true)
    mongoose
      .connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      )
      .then(() => console.log('Database connected'))
      .catch(console.error)
  }
}

export default new MongooseService()
