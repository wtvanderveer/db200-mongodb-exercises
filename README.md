# MongoDB Exercises

Practice queries for MongoDB, written for the `mongosh` shell. All queries are in [queries.js](queries.js) and run against a database named `mongo_exercises`.

## What's covered

- **Inserting documents**: a `movies` collection of 10 films
- **Finding documents**: by writer, actor, franchise and year range
- **Updating documents**: adding synopses with `$set` and an actor with `$push`
- **Text search**: a text index on `synopsis`, with `$text` searches for single words, exclusions (`Bilbo -Gandalf`), OR (`dwarves hobbit`) and AND (`"gold" "dragon"`)
- **Deleting documents**: removing movies by title
- **Relationships**: `users`, `posts` and `comments` collections, where each comment points to its post by ObjectId
- **Querying related collections**: posts and comments by author, and the comments on a specific post

## Requirements

- MongoDB running on `localhost:27017`
- [mongosh](https://www.mongodb.com/docs/mongodb-shell/)
- Node.js, to run the tests

## Running the queries

```sh
mongosh mongodb://localhost:27017/mongo_exercises --file queries.js
```

The script drops and recreates the `movies`, `users`, `posts` and `comments` collections, so you can run it more than once.

## Running the tests

```sh
npm install
npm test
```

The tests check that they can connect to the database and that the `movies` collection has documents in it. Run `queries.js` first.
