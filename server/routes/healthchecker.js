const healthRoutes = (app) =>{

    app.get('/api/health', (req, res) =>{
       const healthCheck = {
            uptime: process.uptime(),
            responseTime: process.hrtime(),
            message: 'OK',
            timestamp: new Date()
       }

       try{
            res.status(200).send(healthCheck)
       }catch(error){
            healthCheck.message = error
            res.status(503).send()
       }
    })

}

module.exports = healthRoutes