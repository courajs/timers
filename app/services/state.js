import Service from '@ember/service';
import {tracked} from '@glimmer/tracking';

import Timer from 'timers/lib/timer';

export default class State extends Service {
  @tracked timers;
  @tracked current;

  constructor() {
    super(...arguments);
    this.load();
    this.current = this.timers[0];
  }

  load() {
    let timerData = JSON.parse(localStorage['timer-state']||'[]');
    this.timers = timerData.map(d => new Timer(d));
  }

  save() {
    localStorage['timer-state'] = JSON.stringify(this.serialize());
  }

  serialize() {
    return this.timers.map(t=>t.serialize());
  }

  addTimer(name) {
    let t = new Timer({name});
    this.current = t;
    this.timers.push(t);
    this.timers = this.timers;
    this.save();
  }
}
