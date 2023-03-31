// Loading routes.
const productRoutes = require('./products')
const healthRoutes = require('./healthchecker')


const appRouter = (app, fs) => {

    // Handling the empty route.
    app.get('/api', (req, res) =>{
        res.send('Welcome to the IMB Vizualizer api')
    })

    // Running the route modules
    productRoutes(app, fs)
    healthRoutes(app)
}

module.exports = appRouter