const productRoutes = (app, fs) =>{
    const dataPath = './data/Products.json'

    app.get('/api/products', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            if(err){ res.status(404).send('Not Found')}
            res.send(JSON.parse(data))
        })
    })
    
}

module.exports = productRoutes