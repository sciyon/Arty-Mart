import { Schema, Types, model } from 'mongoose';

interface Follower {
  id?: String,
  user: Types.ObjectId,
  artist: Types.ObjectId,
  followedOn: Date,
}

const FollowerSchema = new Schema<Follower>({
  id: String,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  followedOn: { type: Date, default: Date.now }
});

const Follower = model<Follower>('follower', FollowerSchema);

export default Follower;
