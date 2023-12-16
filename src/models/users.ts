import { Schema, model } from 'mongoose';

interface User{
  id?: String,
  email: String,
  password: String,
  token: String,
  fname: String, 
  lname: String,
  roles: String[],
  status: String,
  createdOn: Date
}

const UserSchema = new Schema<User>({
  id: String,
  fname: { type: String, required: true},
  lname: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  roles: { type: [String], required: true },
  status: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
})

const User = model<User>('user', UserSchema);

export default User;