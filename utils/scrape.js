const cheerio = require('cheerio')

module.exports = {
  tags: function(html) {

    const tags = {}

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

      if (property == 'og:description') {
        tags['description'] = attribs.content
      }

      if (property == 'og:image') {
        tags['image'] = attribs.content
      }

      if (property == 'og:url') {
        tags['url'] = attribs.content
      }
    })
    return tags
  }
}