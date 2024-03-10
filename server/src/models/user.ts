import mongoose, { CallbackError, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

interface UserDocument extends Document {
  first_name: string;
  last_name: string;
  photo?: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
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
  password: {
    type: String,
    required: true
  }
});

UserSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});

UserSchema.pre<UserDocument>('save', async function (next) {
  const hash = async (pass: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
  };
  // if(this.isM)
  try {
    if (this.isModified('password')) {
      this.password = await hash(this.password);
    }
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

// UserSchema.pre('save')

export default mongoose.model<UserDocument>('User', UserSchema);
