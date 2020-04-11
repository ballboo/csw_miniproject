const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const soap = require('soap')
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';

router.route('/api/login')
   .get((req, res) => {
       res.status(200).send({code:200,message:'OK!',path:'/api/login',method:'GET'})
   })
   .post((req, res) => {
 			let user = {}
 			user.username = req.body.username
            user.password = req.body.password
 			res.setHeader('Content-Type', 'application/json');
            if(!user.username){
            	let massage ={}
                massage.code = 202
                massage.massage = 'Please enter key username'
                res.status(202).json(massage)
            }
            else if(!user.password){
            	let massage ={}
                massage.code = 202
                massage.massage = 'Please enter key password'
                res.status(202).json(massage)
            }
            else{
 				soap.createClient(url,{ session: false }, (err, client) => {
           if (err) {
              let login ={}
              login.code = 404
              login.massage = 'Not Found'
              res.status(404).json(login)
              console.error(err);
           } else {
               
               client.GetStaffDetails(user,  (err, response)=> {
            
                   if (err) console.error(err);
                   else {
                       
                       if (response.GetStaffDetailsResult.string[0]) {
                        
                        let login ={}
                        login.code = 200
                        login.massage = 'OK!'
                        login.path = "/api/login"
                        login.method = "POST"
                        login.psupassport = response.GetStaffDetailsResult.string[0]
                        login.pid = response.GetStaffDetailsResult.string[3]
                        login.Name = response.GetStaffDetailsResult.string[1]+' '+response.GetStaffDetailsResult.string[2]
                        login.Year = response.GetStaffDetailsResult.string[4]
                        
                        res.status(200).json(login)
                        
                     } else {
                        let login ={}
               			login.code = 401
               			login.massage = 'Unauthorized'
               			res.status(401).json(login)
                     }
                   }
               });
           }
       });

    }

       
})


module.exports = router

