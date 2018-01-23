// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

// Route to receive SMS
router.get('/', function(req, res){
  
  res.json({
    confirmation: 'success',
    data: 'this is the sms route!'
  })

})



module.exports = router
