"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Module = void 0;
var _mongoose = require("mongoose");
var moduleSchema = new _mongoose.Schema({
  idRegion: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "regions"
  },
  dataRequired: {
    temp: {
      type: Number,
      "default": 0
    },
    fuel: {
      type: Number,
      "default": 0
    },
    ph1: {
      type: Number,
      "default": 0
    },
    ph2: {
      type: Number,
      "default": 0
    },
    ph3: {
      type: Number,
      "default": 0
    },
    oilPress: {
      type: Number,
      "default": 0
    },
    freq: {
      type: Number,
      "default": 0
    }
  },
  temp: {
    type: Number,
    "default": 0
  },
  fuel: {
    type: Number,
    "default": 0
  },
  bat: {
    type: Number,
    "default": 0
  },
  ph1: {
    type: Number,
    "default": 0
  },
  ph2: {
    type: Number,
    "default": 0
  },
  ph3: {
    type: Number,
    "default": 0
  },
  freq: {
    type: Number,
    "default": 0
  },
  oilPress: {
    type: Number,
    "default": 0
  },
  elapse_total: {
    milliseconds: {
      type: Number,
      "default": 0
    },
    seconds: {
      type: Number,
      "default": 0
    },
    minutes: {
      type: Number,
      "default": 0
    },
    hours: {
      type: Number,
      "default": 0
    },
    days: {
      type: Number,
      "default": 0
    },
    months: {
      type: Number,
      "default": 0
    },
    years: {
      type: Number,
      "default": 0
    }
  },
  stationName: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  position: {
    lat: {
      type: Number
    },
    "long": {
      type: Number
    }
  },
  elapse_total_number: {
    type: Number,
    "default": 0
  },
  duree_temporaire: {
    type: Number
  },
  elapse: {
    milliseconds: {
      type: Number,
      "default": 0
    },
    seconds: {
      type: Number,
      "default": 0
    },
    minutes: {
      type: Number,
      "default": 0
    },
    hours: {
      type: Number,
      "default": 0
    },
    days: {
      type: Number,
      "default": 0
    },
    months: {
      type: Number,
      "default": 0
    },
    years: {
      type: Number,
      "default": 0
    }
  },
  status: {
    type: String,
    "enum": ["NOT_RUNNING", "NOT_RUNNING/FAULT", "STOPPED", "RUNNING", "RUNNING/FAULT"]
  }
}, {
  timestamps: true
});
//moduleSchema.index({stationName: 'text', 'profile.something': 'text'});
moduleSchema.pre('save', function (next) {
  this.stationName = this.stationName.toUpperCase();
  next();
});
moduleSchema.index({
  stationName: "text"
});
var Module = (0, _mongoose.model)("modules", moduleSchema);
exports.Module = Module;