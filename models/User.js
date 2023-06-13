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

// Delete associated thoughts when a user is deleted
UserSchema.pre('remove', function(next) {
  this.model('Thought').deleteMany({ userId: this._id }, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
    next();
  });
});










const User = mongoose.model('User', UserSchema);

module.exports = User;

