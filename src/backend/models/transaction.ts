import { Schema, Types, model } from 'mongoose';

interface Transaction {
  id?: String,
  buyerID: Types.ObjectId;
  artworkID: Types.ObjectId;
  artistID: Types.ObjectId;
  total: Number,
  quantity: Number,
  status: String,
  address: String
}
 
const TransactionSchema = new Schema<Transaction>({
  id: String,
  buyerID: { type: Schema.Types.ObjectId, ref:'User', required: true },
  artworkID: { type: Schema.Types.ObjectId, ref:'Artwork', required: true },
  artistID: { type: Schema.Types.ObjectId, ref:'Artist', required: true },
  total: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
})
 
const Transaction = model<Transaction>('transaction', TransactionSchema);

export default Transaction;