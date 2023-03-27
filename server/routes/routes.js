const productRoutes = require('./products')
const healthRoutes = require('./healthchecker')

const appRouter = (app, fs) => {
    app.get('/api', (req, res) =>{
        res.send('Welcome to the development api')
    })

    productRoutes(app, fs)
    healthRoutes(app)
}

module.exports = appRouter