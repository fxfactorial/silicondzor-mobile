import React from 'react';

import { NewPost } from '../common';
import { language_setting_store as lang_store, new_job_board_store as job_store } from '../state';

const post_new_job = async () => {
  console.log('post new job');
  return true;
};

export default p => (
  <NewPost
    {...p}
    submit_handler={post_new_job}
    new_post_title={lang_store.locale.new_tech_job_posting}
    store={job_store}
  />
);
