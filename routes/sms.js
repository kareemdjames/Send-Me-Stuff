// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const superagent = require('superagent')
const scrape = require('../utils/scrape')

router.get('/', function(req, res){
  res.json({
    confirmation: 'success',
    data: 'this is the sms route!'
  })
})

// This will recieve the texts from Twilio
router.post('/', function(req, res) {
  // this is the data from twilio
  let body = req.body
  // the message
  let message = body['Body']
  // check for message
  if (message === null) {
    res.json({
      confirmation: 'fail',
      message: err.message
    })
    return
  }
   // the phone number
  let from = body['From']
  // check for phone number
  if (from === null) {
    res.json({
      confirmation: 'fail',
      message: err.message
    })
    return
  }
  //This checks if message is a URL, creates a link and stores in db
  if (message.indexOf('http') != -1) {
    superagent
    .get(message)
    .query(null)
    .end((err, response) => {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err.message
        })
        return
      }

      const tags = scrape.tags(response.text)
      console.log(tags)
      
      // Create link from tags 
      turbo.create('link', tags)
        .then(data => {
          res.json({
            confirmation: 'success',
            data: data
          })
        })
        .catch(err => {
          res.json({
            confirmation: 'fail',
            message: err.message
          })
        })
      })
    return
  }

  // SMS Object
  let sms = {
    from: from,
    message: message
  }

  // Add sms to turbo database
  turbo.create('sms', sms)
    .then(data => {
      res.json({
        confirmation: 'success',
        data: data
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })
})

module.exports = router
