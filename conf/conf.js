import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import jwt from 'express-jwt'
import propertiesReader from 'properties-reader'
import jwtConfig from '../properties/jwtConfig.js'
import compression from 'compression'

let app = express();
const properties = propertiesReader(path.resolve('properties/properties.file'));

let accessLogStream = fs.createWriteStream(path.resolve(properties.get('logger.access')), {
    flags: 'a'
})

app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(compression())

app.use(morgan('combined', {
    stream: accessLogStream
}))

app.use(jwt({
    secret: properties.get('app.secret'),
    algorithms: [properties.get('jwt.algo')]
}).unless({path : jwtConfig.allowJwtPaths}))

function getRouter() {
    return express.Router()
}

export {
    app,
    getRouter as router,
    properties
}