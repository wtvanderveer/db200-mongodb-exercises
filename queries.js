// MongoDB Exercises - mongosh reference queries
// Run with: mongosh mongodb://localhost:27017/mongo_exercises --file queries.js

db = db.getSiblingDB('mongo_exercises');

// Reset collections so this script can be re-run cleanly
db.movies.drop();
db.users.drop();
db.posts.drop();
db.comments.drop();

// ---------------------------------------------------------------------------
// Insert Documents
// ---------------------------------------------------------------------------
db.movies.insertMany([
  {
    title: 'Star Wars',
    writer: 'George Lucas',
    year: 1977,
    actors: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Peter Cushing', 'James Earl Jones'],
  },
  {
    title: 'Raiders of the Lost Ark',
    writer: 'George Lucas',
    year: 1981,
    actors: ['Harrison Ford'],
  },
  {
    title: 'Fight Club',
    writer: 'Chuck Palahniuk',
    year: 1999,
    actors: ['Brad Pitt', 'Edward Norton'],
  },
  {
    title: 'Pulp Fiction',
    writer: 'Quentin Tarantino',
    year: 1994,
    actors: ['John Travolta', 'Uma Thurman'],
  },
  {
    title: 'Inglorious Basterds',
    writer: 'Quentin Tarantino',
    year: 2009,
    actors: ['Brad Pitt', 'Diane Kruger', 'Eli Roth'],
  },
  {
    title: 'The Hobbit: An Unexpected Journey',
    writer: 'J.R.R. Tolkien',
    year: 2012,
    franchise: 'The Hobbit',
  },
  {
    title: 'The Hobbit: The Desolation of Smaug',
    writer: 'J.R.R. Tolkien',
    year: 2013,
    franchise: 'The Hobbit',
  },
  {
    title: 'The Hobbit: The Battle of the Five Armies',
    writer: 'J.R.R. Tolkien',
    year: 2012,
    franchise: 'The Hobbit',
    synopsis: 'Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.',
  },
  {
    title: "Pee Wee Herman's Big Adventure",
    writer: 'Phil Hartman',
    year: 1985,
  },
  {
    title: 'Avatar',
  },
]);

// ---------------------------------------------------------------------------
// Query / Find Documents
// ---------------------------------------------------------------------------

// get all documents
printjson(db.movies.find({}).toArray());

// get all documents with writer set to "Quentin Tarantino"
printjson(db.movies.find({ writer: 'Quentin Tarantino' }).toArray());

// get all documents where actors include "Brad Pitt"
printjson(db.movies.find({ actors: 'Brad Pitt' }).toArray());

// get all documents with franchise set to "The Hobbit"
printjson(db.movies.find({ franchise: 'The Hobbit' }).toArray());

// get all movies released in the '90s
printjson(db.movies.find({ year: { $gte: 1990, $lt: 2000 } }).toArray());

// get all movies released before the year 2000 or after 2010
printjson(db.movies.find({ $or: [{ year: { $lt: 2000 } }, { year: { $gt: 2010 } }] }).toArray());

// ---------------------------------------------------------------------------
// Update Documents
// ---------------------------------------------------------------------------

// add a synopsis to "The Hobbit: An Unexpected Journey"
db.movies.updateOne(
  { title: 'The Hobbit: An Unexpected Journey' },
  { $set: { synopsis: 'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug.' } },
);

// add a synopsis to "The Hobbit: The Desolation of Smaug"
db.movies.updateOne(
  { title: 'The Hobbit: The Desolation of Smaug' },
  { $set: { synopsis: 'The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring.' } },
);

// add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
db.movies.updateOne(
  { title: 'Pulp Fiction' },
  { $push: { actors: 'Samuel L. Jackson' } },
);

// ---------------------------------------------------------------------------
// Text Search
// ---------------------------------------------------------------------------

// $text queries require a text index
db.movies.createIndex({ synopsis: 'text' });

// find all movies that have a synopsis that contains the word "Bilbo"
printjson(db.movies.find({ $text: { $search: 'Bilbo' } }).toArray());

// find all movies that have a synopsis that contains the word "Gandalf"
printjson(db.movies.find({ $text: { $search: 'Gandalf' } }).toArray());

// find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"
printjson(db.movies.find({ $text: { $search: 'Bilbo -Gandalf' } }).toArray());

// find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
printjson(db.movies.find({ $text: { $search: 'dwarves hobbit' } }).toArray());

// find all movies that have a synopsis that contains the word "gold" and "dragon"
printjson(db.movies.find({ $text: { $search: '"gold" "dragon"' } }).toArray());

// ---------------------------------------------------------------------------
// Delete Documents
// ---------------------------------------------------------------------------

// delete the movie "Pee Wee Herman's Big Adventure"
db.movies.deleteOne({ title: "Pee Wee Herman's Big Adventure" });

// delete the movie "Avatar"
db.movies.deleteOne({ title: 'Avatar' });

// ---------------------------------------------------------------------------
// Relationships
// ---------------------------------------------------------------------------

db.users.insertMany([
  { username: 'SallySmith', first_name: 'Sally', last_name: 'Smith' },
  { username: 'JimmyHagen', full_name: { first: 'Jimmy', last: 'Hagen' } },
]);

db.posts.insertMany([
  { username: 'SallySmith', title: 'Passes out at party', body: 'Wakes up early and cleans house' },
  { username: 'SallySmith', title: 'Buys a House', body: 'Living in a new neighborhood now' },
  { username: 'SallySmith', title: 'Reports a bug in your code', body: 'Sends you a Pull Request' },
  { username: 'JimmyHagen', title: 'Borrows something', body: 'Returns it when he is done' },
  { username: 'JimmyHagen', title: 'Borrows everything', body: 'The end' },
  { username: 'JimmyHagen', title: 'Forks your repo on github', body: 'Sets to private' },
]);

// Look up a post's ObjectId by its title
const postId = (title) => db.posts.findOne({ title })._id;

db.comments.insertMany([
  { username: 'SallySmith', comment: 'Hope you got a good deal!', post: postId('Borrows something') },
  { username: 'SallySmith', comment: "What's mine is yours!", post: postId('Borrows everything') },
  { username: 'SallySmith', comment: "Don't violate the licensing agreement!", post: postId('Forks your repo on github') },
  { username: 'JimmyHagen', comment: "It still isn't clean", post: postId('Passes out at party') },
  { username: 'JimmyHagen', comment: 'Denied your PR cause I found a hack', post: postId('Reports a bug in your code') },
]);

// ---------------------------------------------------------------------------
// Querying related collections
// ---------------------------------------------------------------------------

// find all users
printjson(db.users.find({}).toArray());

// find all posts
printjson(db.posts.find({}).toArray());

// find all posts authored by "SallySmith"
printjson(db.posts.find({ username: 'SallySmith' }).toArray());

// find all posts authored by "JimmyHagen"
printjson(db.posts.find({ username: 'JimmyHagen' }).toArray());

// find all comments
printjson(db.comments.find({}).toArray());

// find all comments authored by "SallySmith"
printjson(db.comments.find({ username: 'SallySmith' }).toArray());

// find all comments authored by "JimmyHagen"
printjson(db.comments.find({ username: 'JimmyHagen' }).toArray());

// find all comments belonging to the post "Reports a bug in your code"
printjson(db.comments.find({ post: postId('Reports a bug in your code') }).toArray());
