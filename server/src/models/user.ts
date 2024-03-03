import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedpass: {
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    }
  }
});

UserSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});

export default mongoose.model('User', UserSchema);
