import { user_session_store as user_store } from './state';

import { stringify } from 'querystring';

const BASE_URL = 'https://graph.facebook.com/v2.11';

export const user_details = qs => fetch(`${BASE_URL}/?access_token=${user_store.fb_token}`);

export const upvote = async (upvoter_id, post_id) => {
  user_store.change_upvotes_by(1);
  // Must be logged in to be able to do vote.
  console.log('upvote');
  console.log({ upvoter_id, post_id });
};

export const downvote = async (upvoter_id, post_id) => {
  // Must be logged in to be able to do vote and it happens only once
  user_store.change_downvotes_by(1);
  console.log('downvote');
  console.log({ upvoter_id, post_id });
};
