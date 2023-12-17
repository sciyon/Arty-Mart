import { Schema, Types, model } from 'mongoose';

interface Like {
  id?: String,
  user: Types.ObjectId,
  artwork: Types.ObjectId,
  likedOn: Date,
}

const LikeSchema = new Schema<Like>({
  id: String,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  artwork: { type: Schema.Types.ObjectId, ref: 'Artwork', required: true },
  likedOn: { type: Date, default: Date.now }
});

const Like = model<Like>('like', LikeSchema);

export default Like;
