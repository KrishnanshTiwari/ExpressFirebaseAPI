const admin = require("firebase-admin");

const path = require("path");

const serviceAccountKeyPath = process.env.SERVICE_ACCOUNT_KEY_PATH || "./serviceAccountKey.json";

const serviceAccount = require(serviceAccountKeyPath);
const firebaseAdminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://express2-2ac6c.firebaseio.com" 
  
};

admin.initializeApp(firebaseAdminConfig);

const db = admin.firestore();
const User = db.collection("Users");

module.exports = User;
