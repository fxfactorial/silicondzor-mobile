import { extendObservable, when, runInAction } from 'mobx';

export const login_modal_store = new function() {
  extendObservable(this, {
    show: false,
  });

  this.toggle_show = () => (this.show = !this.show);
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
  });
}();

export default { login_modal_store, login_store, user_session_store };
