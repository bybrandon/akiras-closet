const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  comment: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
    comments: [textSchema]

  }, {
  timestamps: true,
}
);

module.exports = mongoose.model('Team', teamSchema);