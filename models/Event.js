const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    dateTime: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfAttendees: {
      type: Number,
      required: true,

    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
      required: true,

    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,

    },

    guests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest',
      required: true,

    }],

    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      

    }],
  },
  { timestamps: true },
);



const Event = mongoose.model("Event", eventSchema);

module.exports = Event;