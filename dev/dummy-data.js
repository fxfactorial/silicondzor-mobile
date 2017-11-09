const vote = () => Math.floor(Math.random() * 10);

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
