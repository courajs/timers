import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class extends Component {
  @service state;
  @tracked editing = false;

  @action startEditing() {
    this.editing = true;
  }

  focusEl(el) {
    el.focus();
  }

  addTime(timer, val) {
    timer.baseSeconds += val;
  }
}
