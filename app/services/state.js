import Service from '@ember/service';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

import Timer from 'timers/lib/timer';

export default class State extends Service {
  @tracked timers;
  @tracked current;
  @tracked running = false;
  clearToken = null;
  startTime;

  constructor() {
    super(...arguments);
    this.load();

    setInterval(() => this.save(), 5000);
    window.addEventListener('beforeunload', () => this.save());
    window.getState = this.serialize.bind(this);
    window.setState = this.save.bind(this);
  }

  @action
  zero(timer) {
    timer.zero();
    if (this.running && timer === this.current) {
      this.startTime = new Date();
    }
  }

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
    this.startTime = new Date();
    this.clearToken = setInterval(() => {
      this.current.runningSeconds = seconds(this.startTime, new Date());
    }, 100);
    this.running = true;
  }

  stop() {
    clearInterval(this.clearToken);
    this.current.digest();
    this.startTime = null;
    this.clearToken = null;
    this.running = false;
  }

  load() {
    if ('timer-state-2' in localStorage) {
      let {currentIndex, timers} = JSON.parse(localStorage['timer-state-2']);
      this.timers = timers.map(d => new Timer(d));
      this.current = this.timers[currentIndex];
    } else if ('timer-state' in localStorage) {
      let timerData = JSON.parse(localStorage['timer-state']);
      this.timers = timerData.map(d => new Timer(d));
      this.current = this.timers[0];
    } else {
      this.timers = [];
    }
  }

  save(state) {
    if (!state) {
      state = this.serialize();
    }
    localStorage['timer-state-2'] = JSON.stringify(state);
  }

  serialize() {
    return {
      timers: this.timers.map(t=>t.serialize()),
      currentIndex: this.timers.indexOf(this.current),
    };
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
    this.timers.forEach(t => t.zero());
    this.save();
  }
}

function seconds(from, to) {
  return Math.floor((to - from) / 1000);
}
