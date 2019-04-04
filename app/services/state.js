import Service from '@ember/service';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

import Timer from 'timers/lib/timer';

export default class State extends Service {
  @tracked timers;
  @tracked current;
  @tracked running = false;
  clearToken = null;

  constructor() {
    super(...arguments);
    this.load();
    this.current = this.timers[0];

    setInterval(() => this.save(), 5000);
    window.addEventListener('beforeunload', () => this.save());
    window.getState = this.serialize.bind(this);
    window.setState = this.save.bind(this);
  }

  /*
   *
   * truth table
   *
   * running   same timer    start?    stop?
   *
   */

  @action
  toggle(timer) {
    if (this.running && timer === this.current) {
      this.stop();
    } else {
      this.start(timer);
    }
  }

  start(timer) {
    this.stop();
    this.current = timer;
    this.clearToken = setInterval(() => {
      this.current.total++;
    }, 1000);
    this.running = true;
  }

  stop() {
    clearInterval(this.clearToken);
    this.clearToken = null;
    this.running = false;
  }

  load() {
    let timerData = JSON.parse(localStorage['timer-state']||'[]');
    this.timers = timerData.map(d => new Timer(d));
  }

  save(state) {
    if (!state) {
      state = this.serialize();
    }
    localStorage['timer-state'] = JSON.stringify(state);
  }

  serialize() {
    return this.timers.map(t=>t.serialize());
  }

  @action
  addTimer(name) {
    let t = new Timer({name});
    this.current = t;
    this.timers.push(t);
    this.timers = this.timers;
    this.save();
  }

  @action
  delTimer(t) {
    this.timers.removeObject(t);
    this.save();
  }

  @action
  zeroAll() {
    this.stop();
    this.timers.forEach(t => t.total = 0);
    this.save();
  }
}
