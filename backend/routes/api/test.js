const express = require('express');
const router = new express.Router();


router.route('/api/test')

.get((req, res) => { 

   			res.status(200).json({code:200,message:'OK!',path:'/api/test',method:'GET'})
})

module.exports = router
