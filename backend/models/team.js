const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const teamSchema = new Schema(
  {
    name: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    heroes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Hero'
      },
    ],
    favoritedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comments: [commentSchema]

  }, {
  timestamps: true,
}
);

module.exports = mongoose.model('Team', teamSchema);