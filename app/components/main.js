import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class Main extends Component {
  @service state;

  get str() {
    return JSON.stringify(this.state.serialize(), null, 2);
  }
}
