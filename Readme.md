# Simple Stack Overflow Clone

Simple clone of Stackoverflow. Features implemented are:

- User signup

- User sign in (using JWT)

- Ask Question

- View Questions

- Upvote or downvote question

- Answer Question

- Search (Questions, Answers and Users)

- Subscribe user to question

## Installation

This project requires [Node.js](https://nodejs.org/) v8+ to run.

Clone the project, Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/Jake-parkers/mini-stack-overflow.git
cd mini-stack-overflow
npm install
npm start
```

For Production Environments

```sh
git clone https://github.com/Jake-parkers/mini-stack-overflow.git
cd mini-stack-overflow
npm install
NODE_ENV=production
npm start
```

The search implementation in this project was inspired by that of Stack Overflow.

![Stack Overflow Search](/assets/images/stackOverflowSearch.png)

The assumptions made for search are:

- a user can search by a tag

- a user can search by question

- a user can search by answer

- a user can search for other users

Search by question and answer uses mongodb's ```$text``` with text indexes on ```title``` and ```excerpt``` fields.

The user search is done via mongodb's regular expressions and matches any part of a user's display name that has the query.
