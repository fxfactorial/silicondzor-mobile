// @flow

import { extendObservable, when, runInAction, computed, observable } from 'mobx';

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

type comment = {
  replies: Array<comment> | null,
  parent_comment_id: string,
  title: string,
  upvotes: number,
  downvotes: number,
};

export const user_session_store = new function() {
  extendObservable(this, {
    fb_token: null,
    currently_viewing_post: {
      author_id: '360745994365514',
      author_name: 'Edgar Aroutiounian',
      title: 'I like coding ReactNative with expo',
      content: 'Some long content string',
      upvotes: 30,
      downvotes: 7,
      post_id: '3434341',
      replies: [],
    },
    post_cache: observable.map({}),
    push_notifications_enabled: true,
    logged_in: true,
    name: 'Edgar Aroutiounian',
    user_fb_id: '360745994365514',
    user_fb_profile_picture_url:
      'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/20031897_317670298673084_847555016148049666_n.jpg?oh=23a10f1f0d27f092d127af2f9e1e344d&oe=5A9C2835',

    // logged_in: false,
    // name: null,
    // user_fb_id: null,
    // user_fb_profile_picture_url: null,
  });

  this.toggle_push_notif = () =>
    runInAction(() => {
      this.push_notifications_enabled = !this.push_notifications_enabled;
    });
  this.change_upvotes_by = amount =>
    runInAction(() => {
      this.currently_viewing_post.upvotes += amount;
    });

  this.change_downvotes_by = amount =>
    runInAction(() => {
      this.currently_viewing_post.downvotes += amount;
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

  this.change_search_text = s =>
    runInAction(() => {
      this.search_text = s;
    });
}();

export const new_discussion_store = new function() {
  extendObservable(this, {
    title: '',
    body: '',
  });
  this.set_title = (t: string) => runInAction(() => (this.title = t));
  this.set_body = (t: string) => runInAction(() => (this.body = t));
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

export default {
  login_modal_store,
  login_store,
  user_session_store,
  search_discussions_store,
  new_discussion_store,
};
