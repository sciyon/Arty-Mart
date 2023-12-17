import { Schema, Types, model } from 'mongoose';

interface Review{
  id?: String,
  artwork: Types.ObjectId,
  user: Types.ObjectId,
  rating: Number,
  title: String,
  body: String,
  createdOn: Date,
  modified: Boolean,
  modifiedOn: Date,
  imageURL: String,
  videoURL: String,
  status: String
}

const ReviewSchema = new Schema<Review>({
  id: String,
  artwork: { type: Schema.Types.ObjectId, ref:'Artwork', required: true },
  user: { type: Schema.Types.ObjectId, ref:'User', required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: true},
  body: { type: String, required: true},
  createdOn: { type: Date, default: Date.now },
  modified: { type: Boolean, default: false },
  modifiedOn: { type: Date, default: null },
  imageURL: { type: String, required: true},
  videoURL: { type: String, required: true},
  status: { type: String, required: true}
})

const Review = model<Review>('comment', ReviewSchema);

export default Review;