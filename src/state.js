import { extendObservable, when, runInAction } from 'mobx';

export const login_modal_store = new function() {
  extendObservable(this, {
    show: true,
  });

  this.toggle_show = () => runInAction(() => (this.show = !this.show));
}();

export const login_store = new function() {
  extendObservable(this, {
    login: '',
    password: '',
    button_enabled: false,
  });

  when(() => this.login !== '' && this.password !== '', () => (this.button_enabled = true));

  this.set_login = l => (this.login = l);
  this.set_password = l => (this.password = l);
}();

export const user_session_store = new function() {
  extendObservable(this, {
    logged_in: false,
    currently_viewing_post: {},
  });
}();
import { search_dummy_results } from 'silicondzor-mobile/dev/dummy-data';

export const search_discussions_store = new function() {
  extendObservable(this, {
    search_results: search_dummy_results,
    search_text: '',
  });
  this.set_search_text = t => (this.search_text = t);
}();

export const new_discussion_store = new function() {
  extendObservable(this, {
    title: '',
    body: '',
  });
  this.set_title = t => (this.title = t);
  this.set_body = t => (this.body = t);
}();

export default {
  login_modal_store,
  login_store,
  user_session_store,
  search_discussions_store,
  new_discussion_store,
};
