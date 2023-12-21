import { Schema, Types, model } from 'mongoose';

interface User{
  id?: String,
  email: String,
  password: string,
  token: String,
  fname: String, 
  lname: String,
  gender: String,
  birthDate: String,
  address: String,
  role: String,
  status: String,
  followers: Types.ObjectId[];
  createdOn: String
}

const UserSchema = new Schema<User>({
  id: String,
  email: { type: String, unique: true},
  password: { type: String, required: true},
  token: { type: String, required: true},
  fname: { type: String, required: true},
  lname: { type: String, required: true},
  gender: { type: String, required: true},
  birthDate: { type: String, required: true},
  address: { type: String, required: true},
  role: { type: String, required: true },
  status: { type: String, required: true },
  followers: {type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: []},
  createdOn: { type: String, required: true },
})

const User = model<User>('user', UserSchema);

export default User;