import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class NewTimerFrom extends Component {
  @service state;

  @action create(e) {
    e.preventDefault();
    let name = e.target.elements[0].value;
    this.state.addTimer(name);
  }
}
