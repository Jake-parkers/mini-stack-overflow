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

## Data Model

The data model used for this project is shown below

![Simple Stack Overflow Clone Data Model](/assets/images/datamodel.PNG)

## NOTES

This project assumes that a WYSIWYG editor is used to ask and answer questions. In particular, it assumes that [quilljs](https://quilljs.com/) is used as the editor. Hence all questions asked are saved in the form of a [quill delta document](https://quilljs.com/docs/delta/). An example is shown below:

```
[
    { insert: 'The Two Towers' },
    { insert: '\n', attributes: { header: 1 } },
    { insert: 'Aragorn sped on up the hill.\n' }
]
```

The search implementation in this project was inspired by that of Stack Overflow.

![Stack Overflow Search](/assets/images/stackOverflowSearch.PNG)

It is assumed that the hypothetical frontend will be able to determine the search type based on whether a ```[tag]```, a user ```user:John Doe```, a question ```question:Who is it``` or an ```answer:It's me``` is being searched for. And then pass the appropriate ```type``` and ```query``` to the search endpoint.

The assumptions made for search are:

- a user can search by a tag

- a user can search by question

- a user can search by answer

- a user can search for other users

Search by question and answer uses mongodb's ```$text``` with text indexes on ```title``` and ```excerpt``` fields.

The user search is done via mongodb's regular expressions and matches any part of a user's display name that has the query.

