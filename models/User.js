const mongoose = require('mongoose');
const Slot = require('./Slots');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  aadharNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstDose: {
    registered: {
      type: Boolean,
      default: false,
    },
    date : {
        type:String,
        default: null,

    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Slot',
        default: null,
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
  },
  secondDose: {
    registered: {
      type: Boolean,
      default: false,
    },
    date : {
        type:String,
        default: null,

    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Slot',
      default: null,
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;