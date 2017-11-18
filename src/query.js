import { user_session_store } from './state';

import { stringify } from 'querystring';

const BASE_URL = 'https://graph.facebook.com/v2.11';

export const user_details = qs => fetch(`${BASE_URL}/?access_token=${user_session_store.fb_token}`);
