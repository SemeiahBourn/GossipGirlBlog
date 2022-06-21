# GossipGirlBlog
 A blog API allows the user to register with Authorization Schema. User recieves a Token at the header, with the token the user can access Public blogs and create a blog with a username at the endpoints. User can also find blog and can adjust/delete with id.
## Installation

Install Node.js and MongoDB on your computer.
Install project dependencies:
$ npm install.

## Tech Stack
 Server: Node, Express
 Database: Mongo
 Tools: Mongo

## Usage
Start the MongoDB service.
Generate fake data for the database

## Run

Run app from the command line.
$ node server.js

Use an application like Postman to send requests to the appropriate API endpoint:

GET and POST requests should go to /blog
DELETE and PUT requests should go to /blog/:id

POST user should go to /user

POST requests should go to /auth


## Enviornment Variables

MONGODB_URI
JWT_SECRET
SALT
