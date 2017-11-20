// @flow
import { Font } from 'expo';
import { extendObservable, when, runInAction, computed, observable } from 'mobx';
import { asyncAction } from 'mobx-utils';

export const init_configure_store = new function() {
  extendObservable(this, {
    font_loaded: false,
    // application_ready:false
  });

  // this.set_application_ready = () => this.application_ready = true;

  this.load_font = () =>
    runInAction(async () => {
      await Font.loadAsync({
        lato_italic: require('silicondzor-mobile/assets/fonts/Lato-Italic.ttf'),
        lato_light: require('silicondzor-mobile/assets/fonts/Lato-Light.ttf'),
        lato_regular: require('silicondzor-mobile/assets/fonts/Lato-Regular.ttf'),
        lato_bold: require('silicondzor-mobile/assets/fonts/Lato-Bold.ttf'),
        lato_black: require('silicondzor-mobile/assets/fonts/Lato-Black.ttf'),
      });
      await asyncAction(function*() {
        init_configure_store.font_loaded = true;
      })();
    });
}();

export const login_modal_store = new function() {
  extendObservable(this, {
    show: false,
  });

  this.toggle_show = () => runInAction(() => (this.show = !this.show));
}();

export const tech_discussion_store = new function() {
  extendObservable(this, {
    discussions: [],
  });
}();

export const user_session_store = new function() {
  extendObservable(this, {
    fb: {
      token: null,
      id: '',
      picture_url: '',
      name: '',
    },
    firebase: null,
    currently_viewing_post: {
      author_id: '',
      author_name: '',
      title: '',
      content: '',
      upvotes: 0,
      downvotes: 0,
      post_id: '',
      replies: [],
    },
    settings: { preference_language: 'en', push_notifications_enabled: true },
    post_cache: observable.map({}),
    logged_in: computed(function() {
      return this.fb.token !== null;
    }),
  });

  this.set_firebase_user_obj = obj =>
    runInAction(() => {
      this.firebase = obj;
    });

  this.toggle_push_notif = () =>
    runInAction(() => {
      this.settings.push_notifications_enabled = !this.settings.push_notifications_enabled;
    });
  this.change_upvotes_by = amount =>
    runInAction(() => {
      this.currently_viewing_post.upvotes += amount;
    });

  this.change_downvotes_by = amount =>
    runInAction(() => {
      this.currently_viewing_post.downvotes += amount;
    });

  this.set_current_post = p =>
    runInAction(() => {
      this.currently_viewing_post = p;
    });
}();

export const tech_events_store = new function() {
  extendObservable(this, {
    events: [],
    in_highest_rated_order: computed(function() {
      return [10];
    }),
    grouped_by_date: computed(function() {
      return {
        day_one: [],
        day_two: [],
      };
    }),
  });
}();

import { search_dummy_results } from 'silicondzor-mobile/dev/dummy-data';

export const search_discussions_store = new function() {
  extendObservable(this, {
    search_results: search_dummy_results,
    search_text: '',
  });

  this.change_search_text = s =>
    runInAction(() => {
      this.search_text = s;
    });
}();

function basic_store() {
  extendObservable(this, {
    title: '',
    body: '',
  });
  this.set_title = (t: string) => runInAction(() => (this.title = t));
  this.set_body = (t: string) => runInAction(() => (this.body = t));
}

// New store for each new post screen
export const new_discussion_store = new class extends basic_store {}();
export const new_tech_event_store = new class extends basic_store {}();
export const new_bug_bounty_store = new class extends basic_store {}();
export const new_job_board_store = new class extends basic_store {}();

export const new_reply_store = new class extends basic_store {
  constructor() {
    super();
    extendObservable(this, {
      show_reply_modal: false,
    });
  }

  toggle_modal = () =>
    runInAction(() => {
      this.show_reply_modal = !this.show_reply_modal;
    });

  send_reply = () =>
    runInAction(() => {
      this.toggle_modal();
    });
}();

// $FlowFixMe;
import { bug_bounty_dummy_result } from 'silicondzor-mobile/dev/dummy-data';

export const bug_bounty_store = new function() {
  extendObservable(this, {
    bounties: Array.from(bug_bounty_dummy_result),
  });
}();

import localization from './localization';

const LOCALES = Object.keys(localization);

export const language_setting_store = new function() {
  extendObservable(this, {
    localization_index: 0,

    locale: computed(function() {
      return localization[LOCALES[this.localization_index]];
    }),
    current_language_name: computed(function() {
      return this.locale.name;
    }),
  });

  this.cycle_localization = () =>
    runInAction(() => {
      this.localization_index = (this.localization_index + 1) % LOCALES.length;
    });
}();
