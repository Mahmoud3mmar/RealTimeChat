import { Schema, model } from 'mongoose';

// User model
const UserSchema = new Schema({

  Name:{
    type:String,
    required:true

  },
  
  socketId:{
    type:String

  },
},
{
  timestamps:true
});

const UserModel = model('User', UserSchema);
export default UserModel