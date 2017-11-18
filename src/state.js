import { extendObservable, when, runInAction, computed } from 'mobx';

export const login_modal_store = new function() {
  extendObservable(this, {
    show: false,
  });

  this.toggle_show = () => runInAction(() => (this.show = !this.show));
}();

export const login_store = new function() {
  extendObservable(this, {
    //
  });
}();

export const user_session_store = new function() {
  extendObservable(this, {
    fb_token: null,
    logged_in: false,
    currently_viewing_post: {},
    name: null,
    user_fb_id: null,
  });
}();

import { events_dummy_results } from 'silicondzor-mobile/dev/dummy-data';

export const tech_events_store = new function() {
  extendObservable(this, {
    events: events_dummy_results,
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
  this.set_search_text = t => (this.search_text = t);
}();

export const new_discussion_store = new function() {
  extendObservable(this, {
    title: '',
    body: '',
  });
  this.set_title = t => runInAction(() => (this.title = t));
  this.set_body = t => runInAction(() => (this.body = t));
}();

import { bug_bounty_dummy_result } from 'silicondzor-mobile/dev/dummy-data';

export const bug_bounty_store = new function() {
  extendObservable(this, {
    bounties: Array.from(bug_bounty_dummy_result),
  });
}();

import language_set from './language-set';

const LANGUAGES = Object.keys(language_set);

export const language_setting = new function() {
  extendObservable(this, {
    current_language: 'en',
    current_language_set: computed(function() {
      return language_set[this.current_language];
    }),
  });

  set_new_language = t =>
    runInAction(() => {
      if (LANGUAGES.includes(t) === false) throw new Error('Unknown language' + t);
      else this.current_language = t;
    });
}();

export default {
  login_modal_store,
  login_store,
  user_session_store,
  search_discussions_store,
  new_discussion_store,
};
