# Basic Auth
===

## Setup
- 1) clone and/or fork repository
- 2) run `npm install` into both `web-server/` and `auth-server/`
- 3) run node on `index.js` of both server folders
- 4) create an `.env` for environment variables mentioned in features

## Feature Tasks

* HTTP server using `express`
* using `mongoose`, creates a **User** model with the following properties and options:
  * `username` - *required and unique*
  * `email` - *required and unique*
  * `password` - *required - hashed*
* uses the **npm** `debug` module to log function calls that are used within application
* uses the **express** `Router` to create a custom router for allowing users to **sign up** and **sign in**
* uses the **npm** `dotenv` module to house the following environment variables:
  * `PORT`
  * `MONGODB_URI`
  * `APP_SECRET` *(used for signing and verify tokens)*

## Server Endpoints
### `/api/signup`
* `POST` request
* the client should pass the username, email, and password in the body of the request
* the server should respond with a token (generated using `jwt`)
* the server should respond with **400 Bad Request** to a failed request

### `/api/signin`
* `GET` request
* the client should pass the username and password to the server using a `Basic:` authorization header
* use middleware to parse the auth header for username/password
* perform some basic validation
* the server should respond with a token for authenticated users
* the server should respond with **401 Unauthorized** for non-authenticated users
