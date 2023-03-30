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

            const products = new Map()
            const dataConv = JSON.parse(data)

            for(entry of dataConv){
                products.set(Number(entry.productId), entry)
            }

            const results = products.get(Number(req.params['prodID']))

            if(results === undefined){res.status(404).send('Not Found')}
            
            res.send(results)
        })
    })
    
    app.post('/api/products/add', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            
            let newProduct = {
                productId: req.body.productId,
                productName: req.body.productName,
                productOwnerName: req.body.productOwnerName,
                Developers: req.body.Developers,
                scrumMasterName: req.body.scrumMasterName,
                startDate: req.body.startDate.replace(/-/g, "/"),
                methodology: req.body.methodology
            }

            const dataObj = JSON.parse(data)
            dataObj.push(newProduct)
            
            fs.writeFile(dataPath, JSON.stringify(dataObj, null, 2), 'utf8', () =>{
                if(err){throw err}
                res.status(200).send(`New product added`)
            })
        })
    })

    app.put('/api/products/update/:prodID', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{

            if(err){ res.status(404).send('Starting Error: Not Found')}

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

            let findPID = Number(req.body.productId)
            let productIndex = dataConv.findIndex(id => id.productId === findPID)
            newData[productIndex] = modifiedProduct
            
            fs.writeFile(dataPath, JSON.stringify(newData, null, 2), 'utf8', () =>{
                if(err){throw err}
                res.status(200).send(`Product id: ${req.params['prodID']} updated`)
            })
        })
    })

    app.delete('/api/products/delete/:prodID', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{

            if(err){ res.status(404).send('Not Found')}

            const dataConv = JSON.parse(data)
            let currentPID = Number(req.params['prodID'])
            const newData = dataConv.filter((id) => id.productId !== currentPID)

            
            fs.writeFile(dataPath, JSON.stringify(newData, null, 2), 'utf8', () =>{
                if(err){throw err}
                res.status(200).send(`Product id: ${req.params['prodID']} was deleted`)
            })
        })
    })
}

module.exports = productRoutes