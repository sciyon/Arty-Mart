import { Schema, Types, model } from 'mongoose';

interface Artwork{
  id?: String,
  artist: Types.ObjectId,
  title: String,
  type: String,
  categories: String[],
  description: String,
  tags: String[],
  createdOn: Date,
  imageURL: String,
  videoURL: String,
  status: String
  price: Number,
  quantity: Number,
  likes: Types.ObjectId[];
}

const ArtworkSchema = new Schema<Artwork>({
  id: String,
  artist: { type: Schema.Types.ObjectId, ref:'User', required: true },
  title: { type: String, required: true},
  type: { type: String, required: true},
  categories: { type: [String], required: true},
  description: { type: String, required: true},
  tags: { type: [String], required: true},
  createdOn: { type: Date, default: Date.now },
  imageURL: { type: String, required: true},
  videoURL: { type: String, required: true},
  status: { type: String, required: true},
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  likes: {type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: []},
})

const Artwork = model<Artwork>('artwork', ArtworkSchema);

export default Artwork;