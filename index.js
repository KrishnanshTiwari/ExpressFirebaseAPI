const express = require("express");
require('dotenv').config();

const cors = require("cors");
const Joi = require("joi"); // Import the Joi validation library
const User = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
// Define a validation schema using Joi
const userSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .regex(/^\d{10}$/) // Validating 10-digit phone number
    .required(),
  email: Joi.string().email().required(),
});

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/create", async (req, res) => {
  const data = req.body;

  

  // Check if phone or email are already in use
  const snapshot = await User.get();
  const existingUsers = snapshot.docs.map(doc => doc.data());
  const isPhoneUsed = existingUsers.some(user => user.phone === data.phone);
  const isEmailUsed = existingUsers.some(user => user.email === data.email);

  if (isPhoneUsed || isEmailUsed) {
    return res.status(400).send({ error: "Phone or email is already in use." });
  }

  // Validate data against the defined schema
  const { error } = userSchema.validate(data);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  // If data is valid, proceed to add to Firestore
  try {
    await User.add(data);
    res.send({ msg: "User Added" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while adding the user." });
  }
});



app.listen(port, () => console.log(`Server is running on port ${port}`));
