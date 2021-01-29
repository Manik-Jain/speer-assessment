export default {
    allowJwtPaths : [
        {url : '/', methods : ['GET']},
        {url : '/auth', methods : ['POST']},
        {url : '/users', methods : ['POST']},
        {url : '/entries', methods : ['POST']}
        ]
}