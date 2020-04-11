const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const firebase = require('firebase')
const firebaseadmin = require("firebase-admin");

const config = require('../../config/configFirebase.json')
const privatekey = require('../../config/PrivateKey.json')
const URL = 'https://miniproject242311.firebaseio.com'
firebase.initializeApp(privatekey);
firebaseadmin.initializeApp({
  credential: firebaseadmin.credential.cert(privatekey),
  databaseURL: URL
});

router.route('/api/getStudents')
   .get((req, res) => {

      let data ={students:[]}
      
      let db = firebaseadmin.database();
      let ref = db.ref("/");
      ref.once("value", (snapshot)=> {
      //console.log(snapshot.val());
      data.code = 200
      data.message = 'OK!'
      data.path = '/api/getStudents'
      data.method ='GET'
      data=snapshot.val()

      res.status(200).send(data)
    
      }); 
   })
   .post((req, res) => {
      let obj = req.body
      let data ={}
      let db = firebaseadmin.database();
      let ref = db.ref("/");
      ref.once("value", (snapshot)=> {
      //console.log(snapshot.val());
      data.code = 200
      data.message = 'OK!'
      data.path = '/api/getStudents'
      data.method ='POST'
      data = snapshot.val()
      data.Students_total = snapshot.val().Students.length
      
      pathDB = 'Students/'+data.Students_total
      //console.log(obj)
      //console.log(pathDB)
      let _Ref = ref.child(pathDB);
      _Ref.set({date: Date(Date.now()),
                email: obj.email,
                name: obj.name,
                psuid: obj.psuid,
                tel: obj.tel});
      
      let message ={}
      message.code = 200
      message.message = 'Insert Complete!'
      message.path = '/api/getStudents'
      message.method ='POST'
      message.insert = pathDB
      
      res.status(200).send(message)
    
      });
 		            
})


router.route('/api/getStudents/:id')
   .get((req, res) => {

      let data ={students:[]}
      let pathDB = '/Students/'+ req.params.id
      //console.log(pathDB)
      let db = firebaseadmin.database();
      let ref = db.ref(pathDB);
      ref.once("value", (snapshot)=> {
      //console.log(snapshot.val());
      data.code = 200
      data.message = 'OK!'
      data.path = '/api/getStudents'
      data.method ='GET'
      //console.log(snapshot.val())
      data=snapshot.val()

      res.status(200).send(data)
    
      }); 
   })

   .post((req, res) => {
      let obj = req.body
      let data ={}
      let pathDB = '/Students/'
      let id = req.params.id
      let db = firebaseadmin.database();
      let ref = db.ref(pathDB);
      ref.once("value", (snapshot)=> {
      //console.log(snapshot.val());
      data.code = 200
      data.message = 'OK!'
      data.path = '/api/getStudents'
      data.method ='POST'
      data = snapshot.val()
      //data.Students_total = snapshot.val().Students.length
      
      //console.log(obj)
      //console.log(pathDB)
      let _Ref = ref.child(id);
      _Ref.set({date: Date(Date.now()),
                email: obj.email,
                name: obj.name,
                psuid: obj.psuid,
                tel: obj.tel})
      
      let message ={}
      message.code = 200
      message.message = 'Update Complete!'
      message.path = '/api/getStudents'
      message.method ='POST'
      message.insert = 'Students/'+ req.params.id
      
      res.status(200).send(message)
    
      });
                
})

   .delete((req, res) => {                   

        let id = req.params.id
        let db = firebaseadmin.database();
        let _Ref = db.ref('/Students/' + id);
        
        _Ref.remove()

        let message ={}
        message.code = 200
        message.message = 'Delete Complete!'
        message.path = '/api/getStudents'
        message.method ='DELETE'
        message.delete = 'Students/'+ req.params.id
      
        res.status(200).send(message)
    })



module.exports = router

