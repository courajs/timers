import {tracked} from '@glimmer/tracking';

export default class Timer {
  @tracked name;
  @tracked baseSeconds;
  @tracked runningSeconds = 0;

  constructor({name, total}) {
    this.name = name || '';
    this.baseSeconds = total || 0;
  }

  zero() {
    this.baseSeconds = 0;
    this.runningSeconds = 0;
  }

  digest() {
    this.baseSeconds += this.runningSeconds;
    this.runningSeconds = 0;
  }

  serialize() {
    return {
      name: this.name,
      total: this.seconds,
    };
  }

  get seconds() {
    return this.baseSeconds + this.runningSeconds;
  }

  get displaySeconds() {
    let result = '';
    let seconds = this.seconds;
    if (seconds > 3600) {
      let hours = Math.floor(seconds / 3600);
      seconds = seconds % 3600;
      result += `${hours}h `;
    }
    if (seconds > 60) {
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      result += `${minutes}m `;
    }

    return result + `${seconds}s`;
  }

  get displayMinutes() {
    let result = '';
    let seconds = this.seconds;
    if (seconds > 3600) {
      let hours = Math.floor(seconds / 3600);
      seconds = seconds % 3600;
      result += `${hours}h `;
    }
    if (seconds > 60) {
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      result += `${minutes}m `;
    }

    if (this.seconds > 60) {
      return result;
    } else {
      return '0m';
    }
  }
}
