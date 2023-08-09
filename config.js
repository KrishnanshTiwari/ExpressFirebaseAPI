const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "express2-2ac6c",
  "private_key_id": process.env.KEY_ID,
  "private_key": process.env.KEY_VAL,
  "client_email": "firebase-adminsdk-m2kao@express2-2ac6c.iam.gserviceaccount.com",
  "client_id": "115373488312307362500",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m2kao%40express2-2ac6c.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
const firebaseAdminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://express2-2ac6c.firebaseio.com" 
  
};

admin.initializeApp(firebaseAdminConfig);

const db = admin.firestore();
const User = db.collection("Users");

module.exports = User;
