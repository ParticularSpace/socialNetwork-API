const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'] 
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false
});

// friendCount
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

UserSchema.pre('remove', function(next) {
  this.model('Thought').deleteMany({ username: this.username }, next);
});


const User = mongoose.model('User', UserSchema);

module.exports = User;

