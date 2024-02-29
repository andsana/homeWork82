import { model, Schema, Types } from 'mongoose';

import User from './User';
import Track from './Track';

const TrackHistorySchema = new Schema({
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
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Track.findById(value);
        return Boolean(track);
      },
      message: 'Track does not exist!',
    },
  },
  datetime: {
    type: Date,
    default: () => new Date(),
    // required: true,
  },
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
