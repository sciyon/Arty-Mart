import { Schema, model } from 'mongoose';

interface User{
  id?: String,
  email: String,
  password: string,
  token: String,
  fname: String, 
  lname: String,
  gender: String,
  birthDate: String,
  roles: String,
  status: String,
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
  roles: { type: String, required: true },
  status: { type: String, required: true },
  createdOn: { type: String, required: true },
})

const User = model<User>('user', UserSchema);

export default User;