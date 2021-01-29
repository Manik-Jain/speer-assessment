# speer-assessment

This repo contains the code for a Twitter like app, as part of assessment at [Speer](https://www.speer.io/)

## Tech stack
1. **[ExpressJS](https://expressjs.com/)**
2. **[Node JS](https://nodejs.dev/)**
3. **[MySql](https://www.mysql.com/)**
4. **[Knex](http://knexjs.org/)**
5. **[JWT](https://jwt.io/)**
6. **[Argon](https://www.npmjs.com/package/argon2)**

## Description
This ExpressJS and NodeJS inspired RESTful API exposes a Twitter like app. The API has been designed to keep configuration options for each dependency, and is very developer friendly. 

Currently the following functionalties are available : 

1. **User Registration** : As mentioned in the rubric, the API should only allow unique user ids to be registered with the system. Hence, the system relies on unique Email id as parameter to permit registrations.

REST endpoint
``` Javascript
POST : /user
Body : {
    "name": <some name goes here>,
    "email": <unique mail goes here>,
    "password": <password goes here>
}
```

**In order to keep the login details private, The system uses Argon inspired password encryption/decryption mechanism.**

2. **Login** : Once the user is registered, ze must be able to login back as per their wish. Therefore, a unique session must be established each time a user logs in to the system. The API utilises [JWT](https://jwt.io/) token based authentication and session management. As mentioned on the official page of JWT, the JWT tokens issued must be short-lived, and must be refresehed so as to continue the session. In accordance to the guidelines provided by JWT, the API keeps a short lived **10 mins** for JWT token, and captures a refresh token that has its life span of **30 mins**. Therefore, the system utilising the API should aim to call the following end point in order to have a **soft-refresh** of the short lived JWT token

REST endpoint
``` Javascript
POST : /auth/refresh 

Authorisation : Bearer <Your JWT Token>
Body : {
    "email": <user email goes here>,
    "token": <Refresh token acquired at login>
}
```
3. **Post a new Tweet** : Only the authorised users are allowed to post tweets on the system, with a limitation of 25 words, to begin with. 

REST endpoint
``` Javascript
POST : /tweet

Authorisation : Bearer <Your JWT Token>
Body : {
    "email": <user email goes here>,
    "data" : "My first tweet"
}
```

4. **Get Tweets** : As an authorised user, ze should be able to view all the tweets posted. This end-point returns an array of tweets done 

REST endpoint

``` Javascript
GET : /tweet

Authorisation : Bearer <Your JWT Token>
```

5. **Get Specific Tweet** : Once a tweet has been posted, a unique id is assigned to it. And as an authorised, ze can view a specific tweet and its metadata (likes, re-tweets, ...)

REST endpoint

``` Javascript
GET : /tweet/:id

Authorisation : Bearer <Your JWT Token>
```

6. **Get all tweets posted by a specific user** : As users connect and follow each other on the social media, they very often like to view some posts by their favourite person. In order to cater to that, this end-point takes in a user id as an input, and returns all the tweets done by this user

REST endpoint

``` Javascript
GET : /tweet/user/:userId

Authorisation : Bearer <Your JWT Token>
```

**7. View all registered users (allowed only to Admins)** : As there can be too many users on the system, and not all users are legit. Therefore, this is an Admin only specific functionality that will return a list of all the users. However, the user's passwords are never visible to anybody.

REST endpoint

``` Javascript
GET : /user

Authorisation : Bearer <Your JWT Token>
Header : 
    user - <registered email>
```

## Execution steps

In order to run a local instance of the API, follow the following steps :

1. Clone the repository, and checkout to [develop](https://github.com/Manik-Jain/speer-assessment/tree/development)
2. In your node terminal, execute the below mentioned command to install the necesary dependencies
``` Javascript
npm init
```
3. Ensure you have a running instance of MySql on your machine. All the database migrations are being handled by [knex](http://knexjs.org/) In order to configure the connection, please navigate to **knex-config/connection.js**. A dummy connection object is provided as under:

```Javascript
    client : 'mysql',
    devConnection : {
        "host" : <your host>,
        "user" : <your user>,
        "password" : <your password>,
        "database" : <your db name>
    }
```

4. Once this is done, execute the following command. It will instantly create all the database tables for you.
```Javascript
knex --esm migrate:latest
```

5. From project folder, execute the following commads according to the need (Dev/Test),

**Development** : This will start the app on port specified in the properites file
```Javascript
npm run dev
```

**Test** : This will trigger 64 automated test cases, to keeo an eye on regression failures (if any)
```Javascript
npm run test
```
