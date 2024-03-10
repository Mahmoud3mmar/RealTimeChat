import { Schema, model } from 'mongoose';

// Post model
const postSchema = new Schema({
  title: String,
  content: String,
},
{
  timestamps:true
});

const PostModel = model('Post', postSchema);
export default PostModel