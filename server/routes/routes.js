const productRoutes = require('./products')

const appRouter = (app, fs) => {
    app.get('/api', (req, res) =>{
        res.send('Welcome to the development api')
    })

    productRoutes(app, fs)
}

module.exports = appRouter