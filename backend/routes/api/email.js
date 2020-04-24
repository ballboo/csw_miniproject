const express = require('express');
const nodemailer = require('nodemailer');
const router = new express.Router();

const configEmail = require('../../config/configEmail.json')



//enable to sendEmail https://myaccount.google.com/u/6/lesssecureapps?pageId=none

router.route('/api/sendEmail')
 	.get((req, res) => { 
   			res.status(200).json({code:200,message:'OK!',path:'/api/sendEmail',method:'GET'})
 	})

 	.post((req,res)=> {

 		const transporter = nodemailer.createTransport(configEmail);
 		//console.log(configEmail)
		let mailOptions = {
  			from: configEmail.auth.user,                // sender
  			to: req.body.email ,                // list of receivers
  			subject: req.body.subject,              // Mail subject
  			html: req.body.detail   // HTML body
		};

		transporter.sendMail(mailOptions,  (err, info)=> {
   if(err)
     console.log(err)
   else
   {

     //console.log(info);
     let message ={}
     message.code = 200
     message.method = 'POST'
     message.path = '/api/sendEmail'
     message.message = 'Send Email Complete!'
     message.res = info.response
     message.sendto = info.accepted
     res.status(200).json(message)

   }

});
 	})

module.exports = router
