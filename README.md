# Social Network API

This is a basic back-end API for a social networking type of application.  It contains 2 collections, `User` and `Thought` with `Reaction` as a subdocument.  The `User` collection contains user information.  The `Thought` collection contains thoughts (posts) by the user.  The `Reaction` collection contains reactions to the thoughts.

It utilizes Express and Mongoose with MongoDB as the back-end database.

## API Endpoints

### User API
`POST /api/users` to create a new user.
`GET /api/users` to get all users.
`GET /api/users/:id` to get a specific user.
`PUT /api/users/:id` to update an existing user.
`DELETE /api/users/:id` to delete a user.
`POST /api/users/:id/friends/:friendId` to add a friend for a user.
`DELETE /api/users/:userId/friends/:friendId` to remove a friend from a user.

### Thought API
`POST /api/thoughts/` to create a new thought.
`GET /api/thoughts/` to get all thoughts.
`GET /api/thoughts/:id` to get a specific thought.
`PUT /api/thoughts/:id` to update an existing thought.
`DELETE /api/thoughts/:id` to delete a thought.
`POST /api/thoughts/:thoughtId/reactions` to add a reaction to a thought.
`DELETE /api/thoughts/:thoughtId/reactions/:reactionId` to remove a reaction from a thought.

### Video Walkthroughs
Part 1: https://drive.google.com/file/d/1vHF30mZFMbM4pKrqiKG4U1TNRACwSmm8/view?usp=sharing
Part 2: https://drive.google.com/file/d/1tb7I-YidnfJrntnJryBLzzFGdHMkJbcd/view