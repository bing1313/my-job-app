const express = require('express');
const app = express();
var bodyParser = require("body-parser");

var admin = require("firebase-admin");

var serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://job-app-cf530-default-rtdb.firebaseio.com"
});


app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

let db = admin.database();
var userRef = db.ref("users");


app.post("/api/:name", (req, res) => {
    console.log("name" + req.params.name);
    console.log("this is the req body " + req.body.name);
    res.json({ message: "Hello from server!" });


    // userRef.set([
    //     {
    //         id:20,
    //         name:"Jane Doe",
    //         email:"jane@doe.com",
    //         website:"https://jane.foo.bar"
    //     },
    //     {
    //         id:21,
    //         name:"John doe",
    //         email:"john@doe.com",
    //         website:"https://foo.bar"
    //     }
    //     ]);
  });
  
app.listen(3080, () => {
    console.log('server listening on port 3000');
})