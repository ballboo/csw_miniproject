const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const soap = require('soap')
const jwt = require('jsonwebtoken');
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Bangkok'
});



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
              res.status(200).json(login)
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
                        login.name = response.GetStaffDetailsResult.string[1]+' '+response.GetStaffDetailsResult.string[2]
                        login.mid = response.GetStaffDetailsResult.string[4]
                        login.date = nDate
                        
                        jwt.sign({login}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                        login.token = token
                        res.status(200).json(login)
                    });
  
 
                     } else {
                        let login ={}
               			login.code = 401
               			login.massage = 'Unauthorized'
               			res.status(200).json(login)
                     }
                   }
               });
           }
       });

    }

       
})


router.route('/api/login/token')
.get((req, res) => {
       res.status(200).send({code:200,message:'OK!',path:'/api/login/token',method:'GET'})
   })

.post( verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      
      let login ={}
      login.code = 401
      login.massage = 'Unauthorized'
      res.status(200).json(login)

    } else {

      let date = new Date(authData.iat * 1000);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let seconds = "0" + date.getSeconds();
      let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      let date1 = new Date(authData.exp * 1000);
      let hours1 = date1.getHours();
      let minutes1 = "0" + date1.getMinutes();
      let seconds1 = "0" + date1.getSeconds();
      let formattedTime1 = hours1 + ':' + minutes1.substr(-2) + ':' + seconds1.substr(-2);

      res.json({
        message: 'get token',
        data:authData.login,
        startDate:formattedTime,
        expireDate:formattedTime1
      });
    }
  });
});



function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    let massage ={}
    massage.code = 202
    massage.massage = 'Please set headers Authorization'
    massage.example = 'Bearer + token'
    res.status(202).json(massage)
    
  }

}


module.exports = router

