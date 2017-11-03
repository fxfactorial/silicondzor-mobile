const vote = () => Math.floor(Math.random() * 10);

export default [
  { title: 'foo-bar', upvotes: vote(), downvotes: vote(), id: '123' },
  { title: 'first thing out there', upvotes: vote(), downvotes: vote(), id: '123' },
  { title: 'next thing we could get ', upvotes: vote(), downvotes: vote(), id: '123' },
  { title: 'yet another thing', upvotes: vote(), downvotes: vote(), id: '123' },
  { title: 'lets have some controversy', upvotes: vote(), downvotes: vote(), id: '123' },
  { title: 'why is caltrain $16', upvotes: vote(), downvotes: vote(), id: '123' },
];
