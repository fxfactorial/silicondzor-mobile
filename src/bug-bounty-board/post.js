import React from 'react';

import { NewPost } from '../common';
import { language_setting_store as lang_store, new_tech_event_store } from '../state';

const post_bug_bounty = async () => {
  console.log('post new bug bounty');
  return true;
};

export default p => (
  <NewPost
    {...p}
    submit_handler={post_bug_bounty}
    new_post_title={lang_store.locale.new_tech_bug_bounty}
    store={new_tech_event_store}
  />
);
