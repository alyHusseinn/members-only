import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

interface PostDocument extends Document {
  title: string;
  content: string;
  club: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
}

const PostSchema = new Schema<PostDocument>({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  club: { type: Schema.Types.ObjectId, ref: 'club', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true }
});

export default mongoose.model('post', PostSchema);
