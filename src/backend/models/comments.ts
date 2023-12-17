import { Schema, Types, model } from 'mongoose';

interface Comment{
  id?: String,
  user: Types.ObjectId,
  artwork: Types.ObjectId,
  comment: String,
  madeOn: Date,
  edited: Boolean,
  editedOn: Date
}

const CommentSchema = new Schema<Comment>({
  id: String,
  user: { type: Schema.Types.ObjectId, ref:'User', required: true },
  artwork: { type: Schema.Types.ObjectId, ref:'Artwork', required: true },
  comment: { type: String, required: true},
  madeOn: { type: Date, default: Date.now },
  edited: { type: Boolean, default: false },
  editedOn: { type: Date, default: Date.now },
})

const Comment = model<Comment>('comment', CommentSchema);

export default Comment;