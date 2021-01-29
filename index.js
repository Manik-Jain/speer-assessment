import {app, properties} from './conf/conf.js'
import {errorHandler, notFound} from './conf/errorHandler.js'
import appRoutes from './src/routes/app.js'

app.use('/', appRoutes)

//application error handlers
app.use(errorHandler)
app.use(notFound)

const PORT = properties.get('app.port')
app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`)
})

export default app