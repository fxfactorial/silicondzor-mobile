const vote = () => Math.floor(Math.random() * 10);

// These were posted by people who MUST have been logged in with FB
export const bug_bounty_dummy_result = [
  { poster_id: 1, poster_name: 'Richard', title: '111', content: '111', amount: '4000 DRAM' },
  { poster_id: 2, poster_name: 'Gor', title: '111', content: '111', amount: '4000 DRAM' },
  { poster_id: 3, poster_name: 'Foo', title: '456', content: '111', amount: '4000 DRAM' },
  { poster_id: 4, poster_name: 'Bar', title: '111', content: '111', amount: '4000 DRAM' },
];

export const search_dummy_results = [
  {
    title: 'You want the iPhone X',
    author: 'Robert',
    upvotes: vote(),
    downvotes: vote(),
    id: '33',
  },
  { title: 'You want the Macbook', author: 'Ashley', upvotes: vote(), downvotes: vote(), id: '34' },
  { title: 'You want the OCaml', author: 'Edgar', upvotes: vote(), downvotes: vote(), id: '35' },
];

export default [
  { title: 'foo-bar', author: 'Robert', upvotes: vote(), downvotes: vote(), id: '123' },
  {
    title: 'first thing out there',
    author: 'Ashley',
    upvotes: vote(),
    downvotes: vote(),
    id: '124',
  },
  {
    title: 'next thing we could get ',
    author: 'Hasmik',
    upvotes: vote(),
    downvotes: vote(),
    id: '125',
  },
  { title: 'yet another thing', author: 'Jim', upvotes: vote(), downvotes: vote(), id: '126' },
  {
    title: 'lets have some controversy',
    author: 'Serj',
    upvotes: vote(),
    downvotes: vote(),
    id: '127',
  },
  { title: 'why is caltrain $16', author: 'Lit', upvotes: vote(), downvotes: vote(), id: '128' },
];

export const events_dummy_results = [
  {
    poster: 'artur',
    post_date: new Date(),
    expires: new Date(),
    content: 'something',
    upvotes: 10,
    downvotes: 3,
  },
  {
    poster: 'hasmik',
    post_date: new Date(),
    expires: new Date(),
    content: 'another',
    upvotes: 10,
    downvotes: 3,
  },
  {
    poster: 'richard',
    post_date: new Date(),
    expires: new Date(),
    content: 'words',
    upvotes: 10,
    downvotes: 3,
  },
  {
    poster: 'artur',
    post_date: new Date(),
    expires: new Date(),
    content: 'more',
    upvotes: 10,
    downvotes: 3,
  },
  {
    poster: 'edgar',
    post_date: new Date(),
    expires: new Date(),
    content: 'less',
    upvotes: 10,
    downvotes: 3,
  },
];
