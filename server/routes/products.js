const productRoutes = (app, fs) =>{
    const dataPath = './data/Products.json'

    app.get('/api/products', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            if(err){ res.status(404).send('Not Found')}
            res.send(JSON.parse(data))
        })
    })

    app.get('/api/products/:prodID', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{

            if(err){ res.status(404).send('Not Found')}

            var products = new Map()
            const dataConv = JSON.parse(data)

            for(entry of dataConv){
                products.set(Number(entry.productId), entry)
            }

            const results = products.get(Number(req.params['prodID']))

            if(results === undefined){res.status(404).send('Not Found')}
            
            res.send(results)
        })
    })
    
    app.put('/api/products/:prodID', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{

            if(err){ res.status(404).send('Not Found')}

            var products = new Map()
            const dataConv = JSON.parse(data)

            for(entry of dataConv){
                products.set(Number(entry.productId), entry)
            }

            const results = products.get(Number(req.params['prodID']))

            if(results === undefined){res.status(404).send('Not Found')}

            products.set(Number(req.params['prodID']), JSON.parse(req.body))
            
            fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf8', () =>{
                if(err){throw err}
                res.status(200).send(`Product id:${req.params['prodID']} updated`)
            })
        })
    })

    app.delete('/api/products/:prodID', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{

            if(err){ res.status(404).send('Not Found')}

            var products = new Map()
            const dataConv = JSON.parse(data)

            for(entry of dataConv){
                products.set(Number(entry.productId), entry)
            }

            const results = products.get(Number(req.params['prodID']))

            if(results === undefined){res.status(404).send('Not Found')}

            products.delete(Number(req.params['prodID']))
            
            fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf8', () =>{
                if(err){throw err}
                res.status(200).send(`Product id:${req.params['prodID']} removed`)
            })
        })
    })
}

module.exports = productRoutes