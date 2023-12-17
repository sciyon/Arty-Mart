import { Schema, Types, model } from 'mongoose';

interface Artist{
  id?: String,
  user: Types.ObjectId,
  name: String,
  languages: String[],
  followers: Number,
  countryOrigin:String,
  createdOn: Date
}

const ArtistSchema = new Schema<Artist>({
  id: String,
  user: { type: Schema.Types.ObjectId, ref:'User', required: true },
  name: { type: String, required: true},
  languages: { type: [String], required: true},
  followers: { type: Number, default: 0 },
  countryOrigin: { type: String, required: true},
  createdOn: { type: Date, default: Date.now },
})

const Artist = model<Artist>('artist', ArtistSchema);

export default Artist;