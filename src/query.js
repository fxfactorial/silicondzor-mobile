import { user_session_store } from './state';

import { stringify } from 'querystring';

const BASE_URL = 'https://graph.facebook.com/v2.11';

export const user_details = qs => fetch(`${BASE_URL}/?access_token=${user_session_store.fb_token}`);

export const upvote = async (upvoter_id, post_id) => {
  // Must be logged in to be able to do vote.
  console.log('upvote');
  console.log({ upvoter_id, post_id });
};

export const downvote = async (upvoter_id, post_id) => {
  // Must be logged in to be able to do vote.
  console.log('downvote');
  console.log({ upvoter_id, post_id });
};
