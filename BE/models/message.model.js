import mongoose, { Schema, model } from 'mongoose';

// Message model
const MessageSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
},
{
  timestamps:true
});

const MessageModel = model('Message', MessageSchema);
export default MessageModel