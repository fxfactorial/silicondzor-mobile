import React from 'react';
import { toJS } from 'mobx';
import * as firebase from 'firebase';

import { WithFBLoginModalAvailable, NewPost } from '../common';
import {
  language_setting_store as lang_store,
  new_discussion_store as new_post_store,
  user_session_store as user_store,
} from '../state';

const submission_handler = async () => {
  if (user_store.logged_in) {
    const uid = user_store.firebase.uid;

    const new_discussion = {
      author_id: user_store.firebase.uid,
      title: new_post_store.title,
      content: new_post_store.body,
    };
    const key = firebase
      .database()
      .ref()
      .child('posts')
      .push().key;
    const updates = {};

    updates[`/tech-discussions/${key}`] = new_discussion;
    updates[`/user-tech-discussion/${uid}/${key}`] = new_discussion;

    const result = await firebase
      .database()
      .ref()
      .update(updates);

    console.log(result);
  } else {
    console.log('Need to be logged in');
  }
};

export default p => (
  <NewPost
    {...p}
    submit_handler={submission_handler}
    new_post_title={lang_store.locale.new_post_title}
    store={new_post_store}
  />
);
