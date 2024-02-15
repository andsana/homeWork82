import { model, Schema, Types } from 'mongoose';
import Album from './Album';

const TrackSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  duration: String,
});

const Track = model('Track', TrackSchema);

export default Track;
