const express = require("express");
const app = express();
var bodyParser = require("body-parser");

var admin = require("firebase-admin");

var serviceAccount = require("./firebaseKey.json");
const { application } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://job-app-cf530-default-rtdb.firebaseio.com",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db = admin.database();

app.post("/addSavedJobs", (req, res, next) => {
  const userId = req.body.userId;
  if (!userId) {
    throw new Error("not logged in");
  }

  const savedJobs = req.body.savedJobs;
  console.log("user id " + userId);
  console.log("saved jobs in /addSavedJobs length " + savedJobs.length);
  var userRef = db.ref("users");
  const childRef = userRef.child(userId);

  childRef.update(
    {
      savedJobs: savedJobs,
    },
    (error) => {
      if (error) {
        console.log("data could not be saved " + error);
      } else {
        console.log("data was saved successfully");
      }
    }
  );

  res.json({ message: "Data was updated" });
});


app.get("/fetchSavedJobs/:userId", (req, res) => {
  console.log("fetch saved jobs user id " + req.params.userId);

  const userId = req.params.userId;

  var userRef = db.ref("users/" + userId);

  userRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.val()) {
        const jobsList = snapshot.val().savedJobs;
        console.log("snapshot val", snapshot.val().savedJobs);
        // let list = [];
        // jobsList.forEach((x) => list.push({ company: x.company, id: x.id }));
        return jobsList;
      } else {
        return null;
      }
    })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json([]);
      }
    });

  //console.log("userinfo" + userinfo);
  // let list = [];

  //  userRef.orderByChild(userId).limitToLast(1).once('value').then((querySnapshot) => {
  //   if(!querySnapshot.numChildren) {
  //     throw new Error("user not in database, no saved jobs");
  //   }
  //   let dataSnapshot;

  //   querySnapshot.forEach((snap) => {
  //     dataSnapshot = snap;
  //   })
  //   if (!dataSnapshot.exists()) { // value may be null, meaning idToFind doesn't exist
  //     throw new Error(`Entry ${userId} not found.`);
  //   }

  // const jobsList = dataSnapshot.val().savedJobs;

  // jobsList.forEach((x) => list.push({company: x.company, id: x.id}));

  // console.log("list" + list);
  // console.log(`Entry ${userId} is:`, dataSnapshot.val());
  // console.log("list size " + list.length);
  // return res.json(list);

  // })

  // console.log("code is here");
  // userRef.once('value', (snap) => {
  //   var snapList = snap.val();
  //   console.log("snapList" + snapList);
  // })
  // .catch((error) => {
  //   console.log("unexpected error: ", error);
  // })
});

app.listen(3080, () => {
  console.log("server listening on port 3000");
});
