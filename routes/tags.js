// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const superagent = require('superagent')
const cheerio = require('cheerio')
const scrape = require('../utils/scrape')

// Route to get meta tags from url
router.get('/', function(req, res){
  const url = req.query.url

  if (url == null) {
    res.json({
      confirmation: 'fail',
      message: 'missing url query parameter!'
    })
    return 
  }
  // Request(Grabs) HTML from the url, then displays that html from our local server
  superagent
  .get(url)
  .query(null)
  .end((err, response) => {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
      return
    }

    const html = response.text
    const tags = scrape.tags(html)
    
    res.json({
      confirmation: 'success',
      tags: tags
    })
  })
  
})


module.exports = router
