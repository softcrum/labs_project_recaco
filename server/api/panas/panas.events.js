'use strict';

import { EventEmitter } from 'events';
import Panas from './panas.model';
const PanasEvents = new EventEmitter();

PanasEvents.setMaxListeners(0);

const events = {
  'remove': 'remove',
  'save': 'save'
};

for (var e in events) {
  var event = events[e];
  Panas.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PanasEvents.emit(event + ':' + doc._id, doc);
    PanasEvents.emit(event, doc);
  }
}

export default PanasEvents;
