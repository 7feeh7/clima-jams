import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  },
)

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  },
})

export default mongoose.model('User', UserSchema)
