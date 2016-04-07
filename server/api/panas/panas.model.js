'use strict';

import mongoose from 'mongoose';

var PanasSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Panas', PanasSchema);
