import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ClubDocument extends mongoose.Document {
  title: string;
  password: string;
  description?: string;
  admin: mongoose.Types.ObjectId;
  subscribers?: mongoose.Types.ObjectId[];
  posts?: mongoose.Types.ObjectId[];
  getAllClubs(): Promise<ClubDocument[]>;
}

const ClubSchema = new Schema<ClubDocument>({
  title: {
    type: String,
    required: true,
    unique: true
    //unique: [true, 'This Name is already Exist!']
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  subscribers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }]
});

ClubSchema.statics.getAllClubs = async function (): Promise<ClubDocument[]> {
  return this.find({}, 'title description').exec();
};

// Define model
const Club: mongoose.Model<ClubDocument> = mongoose.model<ClubDocument>('club', ClubSchema);

export default Club;
