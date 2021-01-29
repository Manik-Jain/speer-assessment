# speer-assessment

This repo contains the code for a Twitter like app, as part of assessment at [Speer](https://www.speer.io/)

## Tech stack
1. **ExpressJS**
2. **Node JS**
3. **MySql**
4. **Knex**
5. **JWT**
6. **Argon**

## Description
This ExpressJS and NodeJS inspired RESTful API exposes a Twitter like app, that currently provides the following functions:

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
```
POST : /tweet

Authorisation : Bearer <Your JWT Token>
Body : {
    "email": <user email goes here>,
    "data" : "My first tweet"
}
```

4. **Get Tweets** : As an authorised user, ze should be able to view all the tweets posted. This end-point returns an array of tweets done 

REST endpoint

```
GET : /tweet

Authorisation : Bearer <Your JWT Token>
```

5. **Get Specific Tweet** : Once a tweet has been posted, a unique id is assigned to it. And as an authorised, ze can view a specific tweet and its metadata (likes, re-tweets, ...)

REST endpoint

```
GET : /tweet/:id

Authorisation : Bearer <Your JWT Token>
```

6. **Get all tweets posted by a specific user** : As users connect and follow each other on the social media, they very often like to view some posts by their favourite person. In order to cater to that, this end-point takes in a user id as an input, and returns all the tweets done by this user

REST endpoint

```
GET : /tweet/user/:userId

Authorisation : Bearer <Your JWT Token>
```

**7. View all registered users (allowed only to Admins)** : As there can be too many users on the system, and not all users are legit. Therefore, this is an Admin only specific functionality that will return a list of all the users. However, the user's passwords are never visible to anybody.

REST endpoint

```
GET : /user

Authorisation : Bearer <Your JWT Token>
Header : 
    user - <registered email>
```
