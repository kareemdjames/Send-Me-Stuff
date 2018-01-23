// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.get('/', function(req, res){
  const url = req.query.url

  if (url == null) {
    res.json({
      confirmation: 'fail',
      message: 'missing url query parameter!'
    })
    return 
  }
  
  res.json({
    confirmation: 'success',
    data: 'this is the tags route!'
  })
})


module.exports = router
