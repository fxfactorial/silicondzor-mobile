import React from 'react';
import { WithFBLoginModalAvailable, NewPost } from '../common';
import { language_setting_store as lang_store, new_discussion_store } from '../state';

export default p => (
  <NewPost
    {...p}
    submit_handler={async () => console.log('Submitted!')}
    new_post_title={lang_store.locale.new_post_title}
    store={new_discussion_store}
  />
);
