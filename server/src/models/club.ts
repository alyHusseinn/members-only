import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  descreption: {
    type: String
  },
  admin: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  subscribers: [{ type: mongoose.Types.ObjectId, ref: 'user', required: true }]
});

export default mongoose.model('club', ClubSchema);
