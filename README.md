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
This ExpressJS and NodeJS inspired API exposes a Twitter like app, that currently provides the following functions:

1. **User Registration** : As mentioned in the rubric, the API should only allow unique user ids to be registered with the system. Hence, the system relies on unique Email id as parameter to permit registrations
2. **Login** : Once the user is registered, ze must be able to login back as per their wish. Therefore, a unique session must be established each time a user logs in to the system. The API utilises [JWT](https://jwt.io/) token based authentication and session management. As mentioned on the official page of JWT, the JWT tokens issued must be short-lived, and must be refresehed so as to continue the session. In accordance to the guidelines provided by JWT, the API keeps a short lived **10 mins** for JWT token, and captures a refresh token that has its life span of **30 mins**. Therefore, the system utilising the API should aim to call the following end point in order to have a **soft-refresh** of the short lived JWT token

``` Javascript
/auth/refresh 

Authorisation : Bearer <Your JWT Token>
Body : {
    "email": <user email goes here>,
    "token": <Refresh token acquired at login>
}
```
