import mongoose, { Schema, Types } from 'mongoose';
import User from './User';

const ArtistSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  information: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;
