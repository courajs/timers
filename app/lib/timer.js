import {tracked} from '@glimmer/tracking';

export default class Timer {
  @tracked name;
  @tracked total;

  constructor({name, total}) {
    this.name = name || '';
    this.total = total || 0;
  }

  serialize() {
    return {
      name: this.name,
      total: this.total,
    };
  }

  get displayDuration() {
    let result = '';
    let seconds = this.total;
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
}
