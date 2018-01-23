// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const superagent = require('superagent')
const cheerio = require('cheerio')

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

    const tags = {}

    const html = response.text
    // Cheerio allows us to parse the HTML via jQuery
    // Parsing out the meta data from the HTML
    $ = cheerio.load(html)
    // loop through all the meta tags and return them
    $('meta').each(function(i, meta) {
      const attribs = meta.attribs
      // if the meta tag has doesn't have attributes return
      if (attribs  == null)
        return true

      const property = attribs.property
      // if the attribue doesnt have a property return
      if (property == null) 
        return true
        
      if (property == 'og:title') {
        tags['title'] = attribs.content
      }
    })
    
    res.json({
      confirmation: 'success',
      tags: tags
    })
    // res.send(html)
  })
  
})


module.exports = router
