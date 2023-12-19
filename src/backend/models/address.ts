import { Schema, Types, model } from 'mongoose';

interface Address{
  id?: String,
  user: Types.ObjectId,
  isPrimary: Boolean,
  createdOn: Date,
  street: String,
  city: String,
  stateOrProvince: String,
  zipCode: Number,
  country: String
}

const AddressSchema = new Schema<Address>({
  id: String,
  user: { type: Schema.Types.ObjectId, ref:'User', required: true },
  isPrimary: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  street: { type: String, required: true},
  city: { type: String, required: true},
  stateOrProvince: { type: String, required: true},
  zipCode: { type: Number, required: true },
  country: { type: String, required: true},
})

const Address = model<Address>('address', AddressSchema);

export default Address;