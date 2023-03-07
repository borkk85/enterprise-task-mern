const express = require('express')
const router = express.Router()
const {getBooks} = require('./bookController')

router.route('/').get(getBooks)


module.exports = router