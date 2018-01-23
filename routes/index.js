// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()


router.get('/', function(req, res){

	// Fetch sms from db
	turbo.fetch('sms', null)
		.then(data => {
			// res.json({
			// 	confirmation: 'success',
			// 	data: data
			// })
			// Render the data as messages
			res.render('index', {messages: data})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		})

	// res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})





module.exports = router
