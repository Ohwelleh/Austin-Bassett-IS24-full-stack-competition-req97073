const { randomUUID } = require('crypto')

const productRoutes = (app, fs) =>{
    const dataPath = './data/Products.json'

    // GET: Returns the entire list of Products.
    app.get('/api/products', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            if(err){ res.status(404).send('Not Found')}
            res.send(JSON.parse(data))
        })
    })

    // GET: Returns the product with the specified prodID.
    app.get('/api/products/:prodID', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{

            if(err){ res.status(404).send('Not Found')}
            const dataConv = JSON.parse(data)
            const newData = [...dataConv]

            let findPID = req.params['prodID']
            let productIndex = dataConv.findIndex(id => id.productId === findPID)

            if(productIndex === -1){res.status(404).send('Not Found')}
            
            res.send(newData[productIndex])
        })
    })
    
    // POST: Add new product to JSON.
    app.post('/api/products/add', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            
            let newProduct = {
                productId: randomUUID(),
                productName: req.body.productName,
                productOwnerName: req.body.productOwnerName,
                Developers: req.body.Developers,
                scrumMasterName: req.body.scrumMasterName,
                startDate: req.body.startDate.replace(/-/g, "/"),
                methodology: req.body.methodology
            }

            const dataObj = JSON.parse(data)
            
            let checkExistence = dataObj.findIndex(id => id.productId === req.body.productId)
            if(checkExistence !== -1){res.status(409).send(`Product already exists.`)}

            dataObj.push(newProduct)
            
            fs.writeFile(dataPath, JSON.stringify(dataObj, null, 2), 'utf8', () =>{
                if(err){throw err}
                res.status(200).send(`New product added`)
            })
        })
    })

    // PUT: Update an existing product.
    app.put('/api/products/update/:prodID', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{

            if(err){ res.status(404).send('Not Found')}

            let modifiedProduct = {
                productId: req.body.productId,
                productName: req.body.productName,
                productOwnerName: req.body.productOwnerName,
                Developers: req.body.Developers,
                scrumMasterName: req.body.scrumMasterName,
                startDate: req.body.startDate,
                methodology: req.body.methodology
            }

            const dataConv = JSON.parse(data)
            const newData = [...dataConv]

            let findPID = req.body.productId
            let productIndex = dataConv.findIndex(id => id.productId === findPID)

            if(productIndex === -1){res.status(404).send('Product Not Found')} 

            newData[productIndex] = modifiedProduct
            
            fs.writeFile(dataPath, JSON.stringify(newData, null, 2), 'utf8', () =>{
                if(err){throw err}
                res.status(200).send(`Product id: ${req.params['prodID']} updated`)
            })
        })
    })

    // DELETE: Delete the specified product.
    app.delete('/api/products/delete/:prodID', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{

            if(err){ res.status(404).send('Not Found')}

            const dataConv = JSON.parse(data)
            let currentPID = req.params['prodID']
            const newData = dataConv.filter((id) => id.productId !== currentPID)

            
            fs.writeFile(dataPath, JSON.stringify(newData, null, 2), 'utf8', () =>{
                if(err){throw err}
                res.status(200).send(`Product id: ${req.params['prodID']} was deleted`)
            })
        })
    })
}

module.exports = productRoutes