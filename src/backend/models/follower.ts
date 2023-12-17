import { Schema, Types, model } from 'mongoose';
const mongoose = require('mongoose');

interface Follow {
  user: Types.ObjectId;
  artist: Types.ObjectId;
}

const FollowSchema = new Schema<Follow>({
  user: { type: mongoose.ObjectId, ref: 'User', required: true },
  artist: { type: mongoose.ObjectId, ref: 'Artist', required: true },
});

const Follow = model<Follow>('follow', FollowSchema);

export default Follow;
