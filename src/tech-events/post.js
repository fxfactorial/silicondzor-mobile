import React from 'react';

import { NewPost } from '../common';
import { language_setting_store as lang_store, new_tech_event_store } from '../state';

const post_tech_event = async () => {
  console.log('post_tech_event');
  return true;
};

export default p => (
  <NewPost
    {...p}
    submit_handler={post_tech_event}
    new_post_title={lang_store.locale.new_tech_event_title}
    store={new_tech_event_store}
  />
);
