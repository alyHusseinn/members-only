import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  club: { type: mongoose.Types.ObjectId, ref: 'club', required: true },
  author: { type: mongoose.Types.ObjectId, ref: 'user' }
});

export default mongoose.model('post', PostSchema);
